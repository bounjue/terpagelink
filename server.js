const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://ter:1234@terart.nvazrev.mongodb.net/termongo2?retryWrites=true&w=majority&appName=terart')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const ImageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalname: String
});

const Image = mongoose.model('Image', ImageSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads folder
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve frontend folder

app.post('/upload', upload.single('image'), async (req, res) => {
    const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname
    });
    await newImage.save();
    res.json(newImage);
});

app.get('/images', async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

