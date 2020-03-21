const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static('uploads'));
app.use(express.static('files'));

//Project Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/rooms', require('./routes/api/rooms'));
app.use('/api/notes', require('./routes/api/notes'));

//Local server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
