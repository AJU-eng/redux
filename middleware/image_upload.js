// const multer=require('multer')
// const path=require('path')


// // const storage=multer.diskStorage({
// //     destination:function (req,file,cb) {
// //         cb(null,'/uploads/')
// //     },
// //     filename:function (req,file,cb) {
// //         let ext = path.extname(file.originalname)
// //         cb(null,Date.now()+".png")
// //     }
// // })

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'uploads')); // Use an absolute path
//     },
//     filename: function (req, file, cb) {
//     //   let ext = path.extname(file.originalname);
//       cb(null, Date.now() + ".png");
//     },
//   });
  

// const upload=multer({
//     storage:storage
// })

// module.exports=upload


const multer = require('multer');
const path = require('path');

// handling file uploads
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null,'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = path.extname(file.originalname)
    cb(null, Date.now() + uniqueSuffix); 
  },
});

const upload = multer({ storage });

module.exports = upload