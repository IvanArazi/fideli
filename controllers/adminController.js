// Importar el modelo
import Brand from '../models/brandModel.js';
import User from '../models/userModel.js';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted){
        return res.status(404).json({msg:"User not found"});
    }

    res.status(200).json({msg:"User deleted"});
}

const deleteBrand = async (req, res) => {
    const id = req.params.id;
    const brandDeleted = await Brand.findByIdAndDelete(id);

    if (!brandDeleted){
        return res.status(404).json({msg:"Comercio no encontrado"});
    }

    res.status(200).json({msg:"Comercio eliminado"});
}

const approvedBrand = async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findByIdAndUpdate(id, {status: "approved"}, {new: true});

    if (!brand){
        return res.status(404).json({msg:"Comercio no encontrado"});
    }

    res.status(200).json({msg:"Comercio aprobado"});
}

const rejectedBrand = async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findByIdAndUpdate(id, {status: "rejected"}, {new: true});

    if (!brand){
        return res.status(404).json({msg:"Comercio no encontrado"});
    }

    res.status(200).json({msg:"Comercio rechazado"});
}

export {deleteUser, approvedBrand, rejectedBrand, deleteBrand};