// Importar el modelo
// import Point from '../models/pointModel.js';

const getAllPoints = async (req, res) => {
    res.send('Get All Points');
}

const getPointsById = async (req, res) => {
    const id = req.params.id;
    res.send('Get Points By Id ' + id);
}

const getPointsByUserAndBrand = async (req, res) => {
    const {user, brand} = req.params;
    res.send(`Get Awards By Brand ${brand} and User ${user}`);
}

export { getAllPoints, getPointsById, getPointsByUserAndBrand };