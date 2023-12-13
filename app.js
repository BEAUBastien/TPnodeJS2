const express = require("express");
const livreRoutes = require("./routes/livreRoutes");

const app = express();
app.use(express.json());

// Utiliser les routes de livres avec le préfixe '/livres'
app.use('/livres', livreRoutes);

app.listen(8082, () => {
    console.log("Server started on port 8082");
});
