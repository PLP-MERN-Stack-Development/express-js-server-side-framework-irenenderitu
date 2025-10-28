const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get('/', (req, res) => res.send('Hello World 🌍'));
app.use('/api/products', productsRouter);

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
