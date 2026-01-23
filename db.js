// const { MongoClient, ServerApiVersion } = require('mongodb');
// const admin = require('firebase-admin');

// const setupConfig = async () => {
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       }),
//     });
//   }

//   const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dit9xra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//   const client = new MongoClient(uri, {
//     serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
//   });

//   await client.connect();
//   const db = client.db('matrimonial');
//   console.log('✅ MongoDB and Firebase Admin Connected');
  
//   return {
//     users: db.collection('users'),
//     members: db.collection('members'),
//     payments: db.collection('payments'),
//     premiumRequests: db.collection('premiumRequests'),
//     success_counter: db.collection('success_counter'),
//     favourites: db.collection('favourites'),
//     contactRequests: db.collection('contactRequests'),
//   };
// };

// module.exports = setupConfig;