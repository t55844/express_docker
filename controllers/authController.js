const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


exports.signUp = async (req, res, next) => {
    const { username, password } = req.body


    try {
        const newUser = await User.create({ username, password: hashpassword })

        const hashpassword = await bcrypt.hash(password, 12)
        res.status(201).json({
            status: 'success',
            data: {
                newUser
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'fail' })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body

    try {

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'user not found' })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            //req.session.user = user
            return res.status(201).json({ status: 'success', })

        } else {

            res.status(404).json({ status: 'fail', message: 'password incorrect' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'fail' })
    }
}