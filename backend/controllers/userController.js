// controllers/userController.js
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async(req,res) => {
    const {name,email,password,role} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hashedPassword,role});
        await user.save();
        res.status(201).json({message:"Registration Successful"});
    } catch (error) {
        res.status(400).json({error: "Email already exists"});
    }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
