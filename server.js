// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

//   inquirer
//   .prompt([{
//     message:"Enter your URL",
//     name: "URL"
//   }
//   ])
//   .then((answers) => {
//     var url = answers.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream('qr_img.png'));

//     fs.writeFile("urls.txt",url,(err)=>{
//         if(err) throw err;
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });


import express from 'express';
import bodyParser from 'body-parser';
import qr from 'qr-image';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate', (req, res) => {
    const url = req.body.URL;

    const qr_svg = qr.image(url, { type: 'png' });
    const imagePath = 'public/qr_img.png';
    
    qr_svg.pipe(fs.createWriteStream(imagePath));

    fs.writeFile('urls.txt', url, (err) => {
        if (err) throw err;
    });

    qr_svg.on('end', () => {
        res.json({ success: true, imagePath: `/qr_img.png` });
    });

    qr_svg.on('error', (err) => {
        res.json({ success: false, error: err.message });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





