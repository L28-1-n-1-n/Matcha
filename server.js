const express = require('express');
const connectDB = require('./config/db');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const items = require('./routes/api/items');

const app = express();

const PORT = process.env.PORT || 5000;
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
// DB Config
// const db = require('./config/keys').mongoURI;

// Work around deprecated Server settings
// mongoose.set('useUnifiedTopology', true);
// Connect to Mongo (promise based)
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected ...'))
//   .catch(err => console.log(err));

// Use Routes
// app.use('/api/items', items);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// () => is the callback part
