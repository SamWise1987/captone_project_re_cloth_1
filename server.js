const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authenticateToken = require('./OAuth/jwt');

const app = express();
const port = process.env.PORT;

// Middleware per parsare il corpo delle richieste JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione:'));
db.once('open', () => {
    console.log('Connesso a MongoDB');
});

// Importare le rotte
const userRoutes = require('./Routers/user');
const clothingItemRoutes = require('./Routers/clothingItems');
const repairRoutes = require('./Routers/repair');
const repairerRoutes = require('./Routers/repairers');
const transactionRoutes = require('./Routers/transaction');
const upcyclingRoutes = require('./Routers/upcycling');




// Usare le rotte
app.use('/user', userRoutes);
app.use('/repair', repairRoutes);

app.use(authenticateToken);

app.use('/clothingItems', clothingItemRoutes);
app.use('/repairers', repairerRoutes);
app.use('/transactions', transactionRoutes);
app.use('/upcycling', upcyclingRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});