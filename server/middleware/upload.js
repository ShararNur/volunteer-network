require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banners',
    allowed_formats: ['jpg', 'jpeg', 'png']
  },
});

module.exports = multer({ storage });

// const url = cloudinary.url('childSupport_ynveso', {
//   transformation: [{ fetch_format: 'auto' }, { quality: "auto" }, { width: 1200 }],
// });

// (async function () {
//   const results = await cloudinary.uploader.upload('./public/images/cleanWater.png')
//   console.log(results);
//   const url = cloudinary.url(results.public_id, {
//     transformation: {
//       fetch_format: 'auto',
//       quality: 'auto',
//     }
//   })
//   console.log(url)
// })();
