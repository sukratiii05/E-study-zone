const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/User')
const routes = express.Router();
const sendEmail = require('../utils/Email');
const verifyToken = require('../middleware/verifyToken');
routes.post('/register', async (req, res) => {
    try {
        const { name, email, password, qualifications, role } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.json({ msg: "User already registered" })
        }
        const data = await new User({
            name: name,
            email: email,
            password: password,
            qualifications: qualifications,
            role: role
        })
        data.save();
        res.json({ msg: "User registered." })
        //send email
        let a=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to E-Study-Zone</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center">

            
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; margin-top:30px; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(90deg,#4facfe,#00f2fe); padding:20px; text-align:center; color:#ffffff;">
                            <h1 style="margin:0;">E-Study-Zone</h1>
                            <p style="margin:5px 0 0;">Learn • Grow • Succeed</p>
                        </td>
                    </tr>

           
                    <tr>
                        <td style="padding:30px;">
                            <h2 style="color:#333;">Welcome, {{ username }} 👋</h2>

                            <p style="color:#555; line-height:1.6;">
                                Thank you for registering on <strong>E-Study-Zone</strong>! We're excited to have you on board.
                            </p>

                            <p style="color:#555; line-height:1.6;">
                                Start exploring courses, track your progress, and upgrade your skills.
                            </p>

                          
                            <table align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" bgcolor="#4facfe" style="border-radius:5px;">
                                        <a href="{{login_link}}" target="_blank"
                                            style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; text-decoration:none;">
                                            Go to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color:#555; margin-top:30px;">
                                If you have any questions, feel free to contact us anytime.
                            </p>

                            <p style="color:#555;">
                                Cheers,<br />
                                <strong>E-Study-Zone Team</strong>
                            </p>
                        </td>
                    </tr>

                    
                    <tr>
                        <td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
                            © 2026 E-Study-Zone. All rights reserved.
                        </td>
                    </tr>

                </table>

  </td >
</tr >
            

  </table >

</body >
</html >
            `
        setTimeout(() => {
            sendEmail("Registration on E-study-zone portal.", email, a)
        }, 100)

    }
    catch (er) {
        console.log(er);
        res.json({ msg: "User not registered." })
    }
})
// get user by user ID
routes.get('/getuser/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        return res.json({ msg: "Data fetched", data: data })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "User not fetched." })
    }
})
// get all users
routes.get('/getuser', verifyToken,async (req, res) => {
    try {
        const data = await User.find({ status: "active" }).lean()
        res.json({ msg: "User fetched.", data: data })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "User not found." })
    }

})
// get all inactive users
routes.get('/getuser/all/inacitve', async (req, res) => {
    try {
        const data = await User.find({ status: "inactive" })
        res.json({ msg: "User fetched", data: data })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "User not found" })
    }
})
// routes for block users
routes.get('/block/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, { status: 'inactive' })
        res.json({ msg: "User Blocked successfully." })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "Sorry try again." })
    }
})
// routes for unblock users
routes.get('/unblock/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, { status: 'active' })
        res.json({ msg: "User unblocked successfully." })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "Sorry try again." })
    }
})
// login api
routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await User.findOne({ email: email })
        if (!data) {
            return req.json({ msg: "Email is incorrect." })
        }
        if (data.password == password) {
            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            res.json({
                msg: "Login Successfully", data: {
                    token,
                    id: data._id,
                    role: data.role,
                    email: data.email,
                    name: data.name
                }
            });
        }
        else {
            return res.json({ msg: "Incorrect password" })
        }
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "Sorry try again" })
    }
})
//change password
routes.patch('/changepassword/:id', async (req, res) => {
    const { op, np, cnp } = req.body
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.json({ msg: "Id not matched" })
        }
        if (op == np) {
            return res.json({ msg: "old password and new password are same " })
        } else {
            if (op == user.password) {
                if (np == cnp) {
                    const data = User.findByIdAndUpdate(req.params.id, { password: cnp }, { new: true })
                    res.json({ msg: "Password Changed Successfully" })
                }
            } else {
                return res.json({ msg: "Your old password are not matched" })
            }
        }
    } catch (er) {
        console.log(er);
        res.json({ msg: "Server error" })

    }
});
module.exports = routes