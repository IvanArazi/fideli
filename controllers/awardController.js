// Importar el modelo
import Award from '../models/awardModel.js';

const getAllAwards = async (req, res) => {
    const awards = await Award.find();
    if (awards.length === 0) {
        return res.status(404).send('No se encontraron premios');
    }
    res.send(awards);
}

const getAwardsById = async (req, res) => {
    try {
        const id = req.params.id;
        const award = await Award.findById(id);
        if (!award) {
            return res.status(404).send('No se encontró el premio');
        }
        res.send(award);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }

}

const getAwardsByBrand = async (req, res) => {
    const brandId = req.params.brand;
    const award = await Award.find({ brand: brandId });

    if (award.length === 0) {
        return res.status(404).send('No se encontraron premios para este comercio');
    }
    res.send(award);
}

const createAward = async (req, res) => {
    const { name, description, requiredPoints } = req.body;
    const brandId = req.brandId;

    if (!name || !description || !requiredPoints) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const newAward = new Award({
        name,
        brand: brandId,
        description,
        requiredPoints
    });
    await newAward.save();
    res.status(201).send(newAward);
}

export { getAllAwards, getAwardsByBrand, createAward, getAwardsById };