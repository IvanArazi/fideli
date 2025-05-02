// Importar el modelo
import Brand from '../models/brandModel.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;

const getAllBrands = async (req, res) => {
    const brands = await Brand.find();
    res.send(brands);
};

const getBrandsByCategoryId = async (req, res) => {
    const categoryId = req.params.id;
    const brands = await Brand.find({category: categoryId});
    if (brands.length === 0) {
        return res.status(404).json({msg: "No hay comercios para esta categoria"});
    }
    res.send(brands);
};

const getBrandsPending = async (req, res) => {
    const brands = await Brand.find({status: "pending"});
    if (brands.length === 0) {
        return res.status(404).json({msg: "No hay comercios pendientes"});
    }
    res.send(brands);
};

const getBrandsApproved = async (req, res) => {
    const brands = await Brand.find({status: "approved"});
    if (brands.length === 0) {
        return res.status(404).json({msg: "No hay comercios aprobados"});
    }
    res.send(brands);
}

const getBrandsRejected = async (req, res) => {
    const brands = await Brand.find({status: "rejected"});
    if (brands.length === 0) {
        return res.status(404).json({msg: "No hay comercios rechazados"});
    }
    res.send(brands);
}

const createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    if (!brand.name || !brand.email || !brand.password || !brand.phone || !brand.description || !brand.address || !brand.manager || !brand.category) {
        return res.status(403).json({msg: "Debe completar todos los campos"});
    }

        const passwordHash = await bcrypt.hash(brand.password, salt);
        brand.password = passwordHash;
    
        await brand.save();
        res.send(brand);
}

const auth = async (req, res) => {
    const {email, password} = req.body;
    const brand = await Brand.findOne({email: email});

    if (!brand) {
        return res.status(404).json({msg: "El comercio es inválido"});
    }

    const passwordValid = await bcrypt.compare(password, brand.password);
    if (!passwordValid) {
        return res.status(404).json({msg: "La constraseña es inválida"});
    }

    //Crear Token
    const data = {
        id: brand._id,
        email: brand.email,
        role: brand.role,
    }

    const jwt = jsonwebtoken.sign(data, secret_key, {expiresIn: '1h'});

    res.json({msg: "Credenciales correctas", token: jwt});
}

export { getAllBrands, getBrandsByCategoryId, createBrand, auth, getBrandsPending, getBrandsApproved, getBrandsRejected };