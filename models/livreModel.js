const nano = require('nano')('http://bwb4254a:674E9bgf@127.0.0.1:5984');
const dbLivres = nano.db.use('livres');

const getLivres = async () => {
    try {
        const livres = await dbLivres.list({ include_docs: true });
        return livres.rows.map(row => row.doc);
    } catch (error) {
        throw error;
    }
};

const getLivreById = async (numlivre) => {
    try {
        const livres = await dbLivres.list({ include_docs: true });
        return livres.rows.find(row => row.doc.numero === numlivre)?.doc;
    } catch (error) {
        throw error;
    }
};

const getPagesDuLivre = async (numlivre) => {
    try {
        const livres = await dbLivres.list({ include_docs: true });
        const livre = livres.rows.find(row => row.doc.numero === numlivre)?.doc;

        if (!livre) {
            return null;
        }

        return livre.pages || [];
    } catch (error) {
        throw error;
    }
};

const getPageDuLivre = async (numlivre, numpage) => {
    try {
        const pages = await getPagesDuLivre(numlivre);
        if (pages.length === 0 || numpage < 1 || numpage > pages.length) {
            return null;
        }

        return pages[numpage - 1];
    } catch (error) {
        throw error;
    }
};

const addLivre = async (livre) => {
    try {
        return await dbLivres.insert(livre);
    } catch (error) {
        throw error;
    }
};

const deleteLivre = async (numlivre) => {
    try {
        const livres = await dbLivres.list({ include_docs: true });
        const livre = livres.rows.find(row => row.doc.numero === numlivre)?.doc;

        if (!livre) {
            return null;
        }

        return await dbLivres.destroy(livre._id, livre._rev);
    } catch (error) {
        throw error;
    }
};

const updateLivre = async (numlivre, updatedData) => {
    try {
        const livres = await dbLivres.list({ include_docs: true });
        const livreToUpdate = livres.rows.find(row => row.doc.numero === numlivre)?.doc;

        if (!livreToUpdate) {
            return null;
        }

        const updatedLivre = {
            ...livreToUpdate,
            ...updatedData,
            _id: livreToUpdate._id,
            _rev: livreToUpdate._rev
        };

        return await dbLivres.insert(updatedLivre);
    } catch (error) {
        throw error;
    }
};



module.exports = {
    getLivres,
    getLivreById,
    getPagesDuLivre,
    getPageDuLivre,
    addLivre,
    updateLivre,
    deleteLivre
};
