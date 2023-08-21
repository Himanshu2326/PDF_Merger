
// Main Code:-

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { MergePDF } = require('./Merger');
const Port = process.env.PORT || 1000;

const UploadFiles = "uploads";
const PdfFiles = "Public";




app.use('/static', express.static('Public'))
app.use('/static', express.static('Css'))
app.use(express.static('Public'))
app.use(express.static('Css'))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, "Src/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
   // console.log(req.files);
   // res.send({data:req.files})
   let d = await MergePDF(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));

   // res.send('Merge Sucessfull')
   res.redirect(`https://pdflare.onrender.com/${d}.pdf`);
   console.log('Succesfully Merged ');


   setTimeout(() => {

      //? Delete Upload Files:---
      fs.readdir(UploadFiles, (err, files) => {

         let AllFiles = files;
         AllFiles.forEach((e) => {
            fs.unlink(`${UploadFiles}/${e}`, () => {
            })

         })

      })

      //? Delete Pdf Files:--
      fs.readdir(PdfFiles, (err, files) => {

         files.forEach((e) => {
            fs.unlink(`${PdfFiles}/${e}`,()=>{

            })
         })

      })


   }, 1000 * 180);


})


//? Live The Website:-

app.listen(Port, () => {
   console.log(`YOU ARE LIVE AT http://localhost:${Port}`)
})



