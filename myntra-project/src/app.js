const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const measurementsRoutes = require('./routes/measurementsRoutes'); // Ensure this file exists

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myntra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Serve the body measurements form
app.get('/body-measurements', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bodyMeasurementsForm.html'));
});

// Serve the recycle program signup form
app.get('/recycle-signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recycleProgramSignup.html'));
});

// Routes
app.use('/users', userRoutes);
app.use('/api', measurementsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
