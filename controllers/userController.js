// Importar el modelo
import User from '../models/userModel.js';

const getAllUsers = async(req, res) =>{
    const users = await User.find();
    res.send('Get All Users ' + users);
}

const getUserById = async(req, res) =>{
    const id = req.params.id;
    res.send('Get User By Id ' + id);
}

const createUser = async(req, res) =>{
    const user = new User(req.body);
    await user.save();
    res.send('Create User ' + user);
}

export {getAllUsers, getUserById, createUser};