// Importar el modelo
// import Category from '../models/categoryModel.js';

const getAllCategories = async (req, res) => {
    res.send('Get All Categories');
}

const getCategoryById = async (req, res) => {
    const id = req.params.id;
    res.send('Get Category By Id ' + id);
}

export { getAllCategories, getCategoryById };