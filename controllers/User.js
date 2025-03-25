const userModel = require("../models/Users");   // Import the schema
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
              try {
                            const { name, email, password, role } = req.body;

                            // Check if the email already exists
                            const existingUser = await userModel.findOne({ email });
                            if (existingUser) {
                                          return res.status(400).json({ message: "Email already exists" });
                            }

                            // Hash the password before saving
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(password, salt);


                            const newUser = new userModel({
                                          name,
                                          email,
                                          password: hashedPassword,
                                          role,

                            });


                            await newUser.save();

                            res.json({ message: "User registered successfully", user: newUser });

              } catch (err) {
                            console.error("Error:", err);
                            res.json({ message: "Internal server error" });
              }
};

module.exports = register;



const login = async (req, res) => {
              try {
                            const { email, password } = req.body;

                            const user = await userModel.findOne({ email });
                            if (!user) return res.status(400).json({ message: "Invalid email or password" });

                            const isMatch = await bcrypt.compare(password, user.password);
                            if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

                            const token = jwt.sign(
                                          { id: user._id, role: user.role },
                                          process.env.JWT_SECRET || "MyNAME",
                                          { expiresIn: '24h' }
                            );

                            res.json({
                                          message: "Login successful",
                                          user: user,
                                          token: token
                            });


              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }

}


const getMe = async (req, res) => {
              try {

              }
              catch (err) {

              }
}
const editProfile = async (req, res) => {
              try {

              }
              catch (err) {

              }
}

const deleteProfile = async (req, res) => {
              try {

              }
              catch (err) {

              }
}




module.exports = { register, login, deleteProfile, getMe }