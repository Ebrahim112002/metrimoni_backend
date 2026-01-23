const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const sharp = require('sharp');
const axios = require('axios');
const FormData = require('form-data');
const { authenticate, authorizeAdmin } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

module.exports = (col, stripe) => {
  // --- Helper: ImgBB ---
  async function uploadImageToImgBB(imageBuffer) {
    const compressedBuffer = await sharp(imageBuffer).resize({ width: 1024 }).jpeg({ quality: 80 }).toBuffer();
    const formData = new FormData();
    formData.append('key', process.env.IMGBB_KEY);
    formData.append('image', compressedBuffer, { filename: 'image.jpg', contentType: 'image/jpeg' });
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, { headers: formData.getHeaders() });
    return response.data.data.url;
  }

  // --- 1. User & Admin Routes ---
  router.post('/users', authenticate, async (req, res) => {
    try {
      const { name, photoURL, role, isPremium = false, targetEmail } = req.body;
      let email = targetEmail ? targetEmail.toLowerCase() : req.user.email;
      let uid = req.user.uid;
      const existingUser = await col.users.findOne({ email: email.toLowerCase() });
      if (existingUser) return res.status(409).json({ error: 'User already exists' });
      const user = { name: name || 'Unnamed User', email: email.toLowerCase(), photoURL: photoURL || '', role: role || 'user', isPremium, uid, createdAt: new Date(), updatedAt: new Date() };
      const result = await col.users.insertOne(user);
      res.status(201).json({ message: 'User created successfully', result });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  router.get('/users', authenticate, authorizeAdmin(col.users), async (req, res) => {
    const users = await col.users.find().toArray();
    res.json(users);
  });

  // --- 2. Biodata Routes ---
  router.get('/biodatas', async (req, res) => {
    const email = req.query.email?.toLowerCase();
    const query = email ? { email } : {};
    const members = await col.members.find(query).toArray();
    res.json(members);
  });

  router.get('/biodatas/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
    const member = await col.members.findOne({ _id: new ObjectId(req.params.id) });
    member ? res.json(member) : res.status(404).json({ error: 'Not found' });
  });

  router.post('/biodatas', authenticate, upload.single('profileImage'), async (req, res) => {
    try {
      const profileImageURL = await uploadImageToImgBB(req.file.buffer);
      const newBiodata = { ...req.body, profileImage: profileImageURL, email: req.user.email, createdAt: new Date() };
      const result = await col.members.insertOne(newBiodata);
      res.status(201).json({ message: 'Created', result });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // --- 3. Payment Routes ---
  router.post('/create-payment-intent', authenticate, async (req, res) => {
    const { name, phone } = req.body;
    const customer = await stripe.customers.create({ email: req.user.email, name, phone });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, currency: 'usd', customer: customer.id,
      metadata: { userId: req.user.uid, email: req.user.email }
    });
    res.json({ client_secret: paymentIntent.client_secret });
  });

  // --- 4. Favourites ---
  router.post('/favourites', authenticate, async (req, res) => {
    const { biodata_id } = req.body;
    await col.favourites.insertOne({ userEmail: req.user.email, biodata_id, addedAt: new Date() });
    res.status(201).json({ message: 'Added to favourites' });
  });

  return router;
};