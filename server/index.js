const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected.'))
.catch(err => console.log(error));

app.get('/', (req, res) => {
    res.send('OWO');
})

app.get('/api/get-maps-api', (req, res) => {
    res.status(200).json({apiKey: process.env.MAPS_API});
});

app.use('/api/auth', authRoutes);

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