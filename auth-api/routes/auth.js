const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const nodemailer = require('../config/nodemailerSystem')
const { jwtOptions } = require('../config/jwtOptions');

//function to add a user
const createUser = async ({ company, email, password }) => {
    return await User.create({ company, email, password });
};

// find user
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

// Update password 
const UpdatePassword = async (email, password) => {
    return await User.update(
        {
            password: password,
        },
        {
            where: {email: email},
        }
    );

}

// login
router.post('/login', async function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        let user = await getUser({ email: email });
        if (!user) {
            return res.json({ message: 'Email incorrect!Please check it',succes:false });
        }

        return bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
               return res.json({ message: 'Incorrect password', succes:false });
            }
            if (result) {
                let payload = { user };
                console.log(jwtOptions.secretOrKey);
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.json({ message: `You are logged with account email: ${email}`, token });
            }
            else {
                return res.json({ message: 'Password incorrect!Forget it?',succes:false });
            }

        })

    }

    return res.json({ message: 'Enter Email & Password please!' });

});

//register a new user
router.post('/register', async function (req, res, next) {

    const company = req.body.company;
    const email = req.body.email;
    const password = req.body.password;
    if (email && password && company) {
        const user = await getUser({ email: email });
        if (user) {
            return res.status(401).json({ message: 'Email already exists' });
        }

        return bcrypt.hash(password, null, null, (err, hash) => {


            createUser({
                company: company,
                email: email,
                password: hash,
            }).then(user =>
                res.status(200).json({ user, message: 'Account created successfully' }));
        })

    }

    return res.json({ message: 'Enter Email, Password & Company name please!' });

});

//forget password 
router.post('/forgot-password', async function (req, res, next) {

    const email = req.body.email;
    if (email) {
        const user = await getUser({ email: email });
        if (!user) {
            return res.json({ message: 'Email Incorrect!', succes:false });
        }
        else {
            const subject = "Reset Password"
            const id = jwt.sign({ userId: email }, process.env.SECRET_KEY)
            const html = `<h1>This email help you to reset password</h1>
        <p>You have started the password change process, click on the link below to finalize the process! Thank you</p></br>
        <a href=${process.env.CLIENT_URL}${id}> Click here</a>
        </div>`
            nodemailer.sendMsg(
                user.email,
                subject,
                html
            )

            return res.json({ message: 'You have received an email to change your password!', status: 201, succes: true })
        }

    }

    return res.json({ message: 'Enter  your email please!', succes:false });

})

//Update password
router.put('/reset-password/:id', async function (req, res, next) {

    const userId = req.params.id;
    const verifyUserId = jwt.verify(userId, process.env.SECRET_KEY);
    const verifiedUserId = verifyUserId.userId

    if (req.body.password !== req.body.confirmPassword) {
        return res.json({ message: 'Bad confirmation password!', succes: false })
    } else {
        return bcrypt.hash(req.body.password, null, null, (err, hash) => {


            UpdatePassword(verifiedUserId, hash).then(
                res.status(200).json({ message: 'Password update succefuly', succes:true }));
        })
    }

})
module.exports = router;
