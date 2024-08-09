const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');
// const routes = require('./routes/index');
const User = require('./models/user.model.js')

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(uri)
.then(() => console.log('Connected.'))
.catch(err => console.log(error));

app.get('/', (req, res) => {
    res.send('OWO');
})



app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});