const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // se non c'è token, restituisci un errore 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // se il token non è valido, restituisci un errore 403
        req.user = user;
        next(); // passa al prossimo middleware
    });
}

module.exports = authenticateToken;