const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

//BodyParser Middleware

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
// DB Config
const db = require('./config/keys').mongoURI;

// Work around deprecated Server settings
mongoose.set('useUnifiedTopology', true);
// Connect to Mongo (promise based)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
// () => is the callback part
