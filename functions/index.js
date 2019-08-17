const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid');

const gcconfig = {
  projectId: 'post-n-find-dev',
  keyFilename: 'post-n-find-dev.json'
};

const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const { image } = JSON.parse(req.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', image, 'base64', error => {
      console.log(error);
      return res.status(500).json({ error });
    });
    const bucket = gcs.bucket('post-n-find-dev.appspot.com');
    const uuid = UUID();

    bucket.upload(
      '/tmp/uploaded-image.jpg',
      {
        uploadType: 'media',
        destination: `/notices/${uuid}.jpg`,
        resumable: false,
        metadata: {
          metadata: {
            contentType: 'image/jpeg',
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (error, file) => {
        if (!error) {
          return res.status(201).json({
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`
          })
        } else {
          console.log(error);
          return res.status(500).json({ error })
        }
      }
    );
  });
});
