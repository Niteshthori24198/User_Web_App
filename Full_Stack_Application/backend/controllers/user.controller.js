require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const { UserModel } = require("../models/user.model");


const UserRegister = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).send(
                {
                    msg: 'User already exists !! Please Login using your creds.',
                    success: false
                }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        return res.send(
            {
                success: true,
                msg: 'User registered successfully !!',
                user: newUser
            }
        );
    } catch (error) {
        return res.status(500).send(
            {
                success: false,
                msg: 'Internal Server Error ' + error.message
            }
        );
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).send(
            {
                success: false,
                msg: 'Invalid credentials !! Either username or password is incorrect or User does not exist.'
            }
        );

        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) return res.status(400).send(
            {
                success: false,
                msg: 'Invalid credentials. Username or Password is incorrect.'
            }
        );

        const token = jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: '24h' });
        return res.send(
            {
                success: true,
                token,
                name: user.name,
                msg: 'Login successful !'
            }
        );
    } catch (error) {
        return res.status(500).send(
            {
                success: false,
                msg: 'Internal Server Error ' + error.message
            }
        );
    }
}


const ForgotPasswordByEmail = async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
    });

    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ success: false, msg: "User not found. Please check your email" });

    const resetToken = jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: "1h" });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Password Reset Link from Task Manager App",
        html: `
                <p>Hello,</p>
                <p>You requested to reset your password. Please use the link below to set a new password. This link will expire in 1 hour.</p>
                <p><strong>Reset your password:</strong></p>
                <p>
                    <a href="${resetLink}" style="color: #007bff; text-decoration: none;">Click here to reset your password</a>
                </p>
                <p>Or copy and paste this URL into your browser:</p>
                <p style="word-break: break-all;">${resetLink}</p>
                <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                <p>Thank you,<br/>The Support Team</p>
        `,
    });

    res.status(200).send({ msg: "Password reset link sent to your email" });
}


const ResetUserPassword = async (req, res) => {

    const { UserID, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(UserID, { password: hashedPassword });
        
        res.status(200).send({ success: true, msg: "Password updated successfully" });
    } catch (error) {
        console.log("Error updating password:", error);
        res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}


// Google Authentication
const googleAuthentication = async (req, res) => {

    // After Successful authentication, user redirected to home page.

    const user = req.user

    let token = jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: "24h" });

    const imgSrc = 'https://cdn.kibrispdr.org/data/1750/3-dot-loading-gif-35.gif'
    const imgSrcAlt = 'https://cdn.kibrispdr.org/data/1750/3-dot-loading-gif-35.gif'

    return res.send(`
                    <a href="${process.env.CLIENT_URL}?token=${token}&name=${user.name}" id="myid" style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #222222; margin: 0; padding: 0; overflow: scroll;">
                        <img style="width:100%;" src="${imgSrc}" alt="${imgSrcAlt}">
                    </a>
                    <script>
                        let a = document.getElementById('myid')
                        setTimeout(()=>{
                            a.click()
                        },4000)
                        console.log(a)
                    </script>
            `)

}


module.exports = {
    UserRegister,
    UserLogin,
    ResetUserPassword,
    ForgotPasswordByEmail,
    googleAuthentication
}