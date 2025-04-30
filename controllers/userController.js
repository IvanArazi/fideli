// Importar el modelo
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;

const getAllUsers = async(req, res) =>{
    const users = await User.find();
    res.send(users);
}

const getUserById = async(req, res) =>{
    const id = req.params.id;
    res.send('Get User By Id ' + id);
}

const createUser = async(req, res) =>{
    const user = new User(req.body);
    if (!user.name || !user.email || !user.password){
        return res.status(403).json({msg: "Falta parametro"});
    }

    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    await user.save();
    res.send('Create User ' + user);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted){
        return res.status(404).json({msg:"User not found"});
    }

    res.status(200).json({msg:"User deleted"});
}

const auth = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    
    if(!user){
        return res.status(404).json({msg: "El usuario es inválido"});
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid){
        return res.status(404).json({msg: "La constraseña es inválida"});
    }

    //Crear Token
    const data = {
        id: user._id,
        email: user.email,
    }
    const jwt = jsonwebtoken.sign(data, secret_key, {expiresIn: '1h'});

    res.json({msg: "Credenciales correctas", token: jwt});

}

export {getAllUsers, getUserById, createUser, deleteUser, auth};