const functions   = require('firebase-functions');
const admin       = require('firebase-admin');
const cloudinary  = require('cloudinary').v2;

admin.initializeApp();

// Use process.env to access the Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  exports.getUploadSignature = functions.https.onRequest((req, res) => {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: Date.now() / 1000 },
      process.env.CLOUDINARY_API_SECRET
    );
    res.json({ signature });
  });

{/**
    
    exports.getUploadSignature = functions
  .runWith({ timeoutSeconds: 540, memory: '1GB' })  // Increase timeout if needed
  .https.onCall(() => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinary.config().api_secret
    );
    return { timestamp, signature };
  });
    */}