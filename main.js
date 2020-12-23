const express = require('express');
const multer = require('multer');
const dirTree = require('directory-tree');
const cors = require('cors');
const app = express();
const port = 7777;

app.use(express.static(__dirname + '/public'));
app.use(cors());

// Storage assignment
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});
// Upload function
const upload = multer({ storage : storage}).single('file');

app.get('/directory', (req, res) => {
    console.log(req.query.path);
    res.send(dirTree('./public' + req.query.path));
});

app.get('/file', (req, res) => {
    const fileName = './public' + req.query.path.replace('public', '');
    console.log(fileName);
    res.sendFile(fileName, { root: __dirname });
});

app.post('/upload', (req, res) => {
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);