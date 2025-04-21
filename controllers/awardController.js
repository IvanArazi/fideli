// Importar el modelo
// import Award from '../models/awardModel.js';

const getAllAwards = async (req, res) => {
    res.send('Get All Awards');
}

const getAwardById = async (req, res) => {
    const id = req.params.id;
    res.send('Get Awards By Id ' + id);
}

const getAwardsByBrand = async (req, res) => {
    const Brand = req.params.brand;
    res.send('Get Awards By Brand ' + Brand);
}

export { getAllAwards, getAwardById, getAwardsByBrand };