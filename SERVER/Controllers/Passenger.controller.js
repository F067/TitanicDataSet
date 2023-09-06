import passengerModel from '../Models/PassengerModel.js';

export async function getAllData(req, res) {
    try {
        // Utiliser le modèle de données pour accéder à la collection
        let data = await passengerModel.find({});
        // Envoyer les données en réponse
        res.json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
}
