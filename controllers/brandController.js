// Importar el modelo
// import Brand from '../models/brandModel.js';

const getAllBrands = async (req, res) => {
    res.send('Get All Brands');
}

const getBrandById = async (req, res) => {
    const id = req.params.id;
    res.send('Get Brand By Id ' + id);
}

const getBrandsByCategoryId = async (req, res) => {
    const id = req.params.id;
    res.send('Get Brands By Category Id ' + id);
}

export { getAllBrands, getBrandById, getBrandsByCategoryId };