// Importar el modelo
import Point from '../models/pointModel.js';
import User from '../models/userModel.js';

const getAllPoints = async (req, res) => {
    const points = await Point.find();
    res.send(points);
}

const getPointsByUser = async (req, res) => {
    const id = req.params.id;
    const points = await Point.find({userId: id});
    if (points.length === 0) {
        return res.status(404).send('No se encontraron puntos para este usuario');
    }
    res.send(points);
}

const getPointsByBrand = async (req, res) => {
    const id = req.params.id;
    const points = await Point.find({brandId: id});
    if (points.length === 0) {
        return res.status(404).send('No se encontraron puntos para esta marca');
    }
    res.send(points);
}

const getPointsByUserAndBrand = async (req, res) => {
    const {user, brand} = req.params;
    const points = await Point.find({userId: user, brandId: brand});
    if (points.length === 0) {
        return res.status(404).send('No se encontraron puntos para este usuario y marca');
    }
    res.send(points);
}

const acumulatePoints = async (req, res) => {
    const { uniqueNumber, points } = req.body;
    const brandId = req.brandId;

    if (!uniqueNumber || !brandId || typeof points !== 'number') {
        return res.status(400).json({ msg: 'Datos inválidos' });
    }

    try {
        // Buscar al usuario por su código único
        const user = await User.findOne({ uniqueNumber });

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado con ese código único' });
        }

        // Actualizar o crear registro de puntos
        const updatedPoints = await Point.findOneAndUpdate(
            { userId: user._id, brandId },
            { $inc: { points } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            msg: 'Puntos acumulados correctamente',
            data: updatedPoints
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error del servidor' });
    }
};



export { getAllPoints, getPointsByUser, getPointsByUserAndBrand, getPointsByBrand, acumulatePoints };