// Importar el modelo
import User from '../models/userModel.js';
import Counter from '../models/counterModel.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;

// Función para obtener el siguiente número único
const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
        { name },
        { $inc: { seq: 1 } }, // Incrementar el contador
        { new: true, upsert: true } // Crear el contador si no existe
    );
    return counter.seq;
};

const getAllUsers = async(req, res) =>{
    const users = await User.find();
    res.send(users);
}

const createUser = async(req, res) =>{
    const {name, lastName, email, password} = req.body;
    if (!name || !lastName || !email || !password){
        return res.status(403).json({msg: "Debe completar todos los campos"});
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const uniqueNumber = await getNextSequence('uniqueNumber');

    const newUser = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: passwordHash,
        uniqueNumber: uniqueNumber
    });

    await newUser.save();
    res.status(201).json(newUser);
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
        role : user.role,
    }
    const jwt = jsonwebtoken.sign(data, secret_key, {expiresIn: '1h'});

    res.json({msg: "Credenciales correctas", token: jwt});

}

export {getAllUsers, createUser, auth};