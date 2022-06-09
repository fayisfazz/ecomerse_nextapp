// import nextConnect from 'next-connect';
// import multer from 'multer';
// import { cloudinaryConfig } from '../../../config/cloudinaryConfig';
// //const cloudinary = require('cloudinary').v2
// //import { uploader } from 'cloudinary'; 
// import {v2 as cloudinary} from 'cloudinary'

// cloudinary.config({
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,
// })

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	region: process.env.AWS_REGION,
});






 import nextConnect from 'next-connect';
 import aws, { S3 } from 'aws-sdk';
 import multer from 'multer';
 import multerS3 from 'multer-s3';



 const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

 const s3 = new aws.S3();



const uploadS3=multer({
  storage: multerS3({
    s3: s3,
    bucket: "fazzbucket",
    acl: "public-read",
    // metadata: function (req, file, cb) {
    //   cb(null, { fieldName: file.fieldname });
    // },
    key: function (req, file,cb) {
    cb(null,file.originalname);
       console.log(file.originalname);
       console.log(cb);
      
    },
  }),
});
console.log('ggg',uploadS3);




console.log('jiiii');

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });



apiRoute.use('/api/upload_file/image-upload',uploadS3.array("image"),);
console.log('hiii');

apiRoute.post('/api/upload_file/image-upload',async (req, res) => {
    //console.log('fihghgfi',req.files);

   try {
      
    //const result= cloudinary.uploader.upload(req.files.path);
    //console.log(result);
    res.json({message:'successfull'})
       
   } catch (error) {
       res.json('error message',error)
       
   }

  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};