const LivreModel = require('../models/livreModel');

const getLivres = async (req, res) => {
    try {
        const livres = await LivreModel.getLivres();
        res.json(livres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLivreById = async (req, res) => {
    const numlivre = Number(req.params.numlivre);
    try {
        const livre = await LivreModel.getLivreById(numlivre);
        if (!livre) {
            return res.status(404).json({ message: "Ce livre n'existe pas" });
        }
        res.json(livre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPagesDuLivre = async (req, res) => {
    const numlivre = Number(req.params.numlivre);
    try {
        const pages = await LivreModel.getPagesDuLivre(numlivre);
        if (!pages) {
            return res.status(404).json({ message: "Ce livre n'existe pas" });
        }
        res.json({ pages: pages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPageDuLivre = async (req, res) => {
    const numlivre = Number(req.params.numlivre);
    const numpage = Number(req.params.numpage);
    try {
        const page = await LivreModel.getPageDuLivre(numlivre, numpage);
        if (page === null) {
            return res.status(404).json({ message: "Cette page n'existe pas pour ce livre" });
        }
        res.json({ Page: numpage, Content: page });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addLivre = async (req, res) => {
    try {
        const livre = req.body;
        const response = await LivreModel.addLivre(livre);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLivre = async (req, res) => {
    const numlivre = Number(req.params.numlivre);
    try {
        const response = await LivreModel.deleteLivre(numlivre);
        if (!response) {
            return res.status(404).json({ message: "Ce livre n'existe pas" });
        }
        res.json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateLivre = async (req, res) => {
    const numlivre = Number(req.params.numlivre);
    try {
        const updatedData = req.body;
        const response = await LivreModel.updateLivre(numlivre, updatedData);
        if (!response) {
            return res.status(404).json({ message: "Ce livre n'existe pas" });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getLivres,
    getLivreById,
    getPagesDuLivre,
    getPageDuLivre,
    addLivre,
    deleteLivre,
    updateLivre
};
