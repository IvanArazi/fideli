// Importar el modelo
// import Redemption from '../models/redemptionModel.js';

const getAllRedemptions = async (req, res) => {
    res.send('Get All Redemptions');
}

const getRedemptionById = async (req, res) => {
    const id = req.params.id;
    res.send('Get Redemption By Id ' + id);
}

const getRedemptionByUserAndAward = async (req, res) => {
    const {user, award} = req.params;
    res.send(`Get Redemption By Award ${award} and User ${user}`);
}

export { getAllRedemptions, getRedemptionById, getRedemptionByUserAndAward };