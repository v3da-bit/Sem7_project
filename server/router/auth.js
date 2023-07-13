const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../model/userSchema')
const Party = require('../model/partySchema')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const { plugin } = require('mongoose')

// const messagebird=require('')
router.get('/', (req, res) => {
    res.send('Hello from router 22')
})
router.post('/regi', async (req, res) => {
    console.log(req.body)
    const { name, email, phone, age, state, password, cpassword } = req.body
    if (!name || !email || !phone || !age || !state || !password || !cpassword) {
        return res.status(422).json({ error: "please fill it" })
    }
    try {
        const userExist = await User.findOne({ email: email })
        const userphone = await User.findOne({ phone: phone })
        console.log(userExist)
        if (userExist || userphone) {

            return res.status(422).json({ error: "user exists" })


        } else if (password != cpassword) {
            return res.status(422).json({ error: "password and confirm password must be same" })
        } else {
            if (age < 18) {
                return res.status(402).json({ error: "age must be greater than or equal to 18" })
            }
            const user = new User({ name, email, phone, age, state, password, cpassword })
            await user.save().then(() => {
                res.status(201).json({ message: "user registered" })
            })
        }

    } catch (err) {
        console.log(err)
    }


})

router.post("/login", async (req, res) => {
    try {
        const { phone, password } = req.body
        console.log(req.headers.name)
        if (!phone || !password) {
            return res.status(422).json({ error: "please fill it" })
        }

        const userSignIn = await User.findOne({ phone: phone })
        if (userSignIn) {
            const isMatch = await bcrypt.compare(password, userSignIn.password)
            const token = await userSignIn.generateToken()
            console.log('usersignincalled')
            res.cookie("userData", token, {
                expires: new Date(Date.now() + 999999999),
                httpOnly: true
            })
            console.log(req.cookies)
            // console.log(token)
            if (!isMatch) {
                return res.status(404).json({ error: "Invalid Credentials pass" })
            } else {
                bcrypt.compare(password, userSignIn.password).then(() => {

                    console.log("promise completed")
                }).catch(err => {
                    console.log(err)
                })
                return res.status(200).json({ message: "user SignedIn Succesfully", token: token })

            }


        } else {
            return res.status(404).json({ error: "Invalid Credentials" })
        }

    } catch (err) {
        console.log(err)

    }



})
router.get('/about', authenticate, (req, res) => {
    // console.log(req.headers)
    console.log('about us called')
    console.log(req)
    const data = req.rootUser
    res.send(req.rootUser)
})
router.put('/about', authenticate, async (req, res) => {
    // console.log(req.headers)
    const { name, email, phone, age } = req.body
    if (!name || !email || !phone || !age) {
        return res.status(422).json({ error: "please fill it" })
    }
    try {
        const userSignIn = await User.findOne({ email: email })
        if (userSignIn) {
            userSignIn.name = name
            userSignIn.email = email
            userSignIn.phone = phone
            userSignIn.age = age
            await userSignIn.save().then(() => {
                return res.status(201).json({ message: "user edited succesfully" })
            })
        } else {
            return res.status(404).json({ error: "Invalid Credentials" })
        }
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: "Invalid Credentials" })
    }
})
router.post('/verify', async (req, res) => {
    try {
        const { phone } = req.body
        console.log(phone)
        const userSignIn = await User.findOne({ phone: phone })
        if (userSignIn) {
            return res.status(201).json({ message: "User is present" })
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ error: "Invalid Credentials" })
    }
})
router.get('/logout', (req, res) => {
    // console.log(req.headers)
    console.log('logout')
    console.log(req.headers.token)
    const token = req.headers.token
    res.clearCookie(token, { path: '/' })
    res.status(200).send('user logged out')
})
router.put('/reset', async (req, res) => {
    // console.log(req.headers)
    const { phone, password, cpassword } = req.body

    try {
        if (!password || !cpassword) {
            return res.status(422).json({ error: "please fill it" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password and confirm password must be same" })
        } else {
            const userSignIn = await User.findOne({ phone: phone })
            console.log(userSignIn)
            if (userSignIn) {
                userSignIn.password = password
                userSignIn.cpassword = cpassword
                await userSignIn.save().then(() => {
                    return res.status(201).json({ message: "password updated" })
                })
            } else {
                return res.status(404).json({ error: "Invalid Credentials" })
            }
        }
    } catch (err) {
        console.log(err)
        // return res.status(404).json({ error: "Invalid Credentials" })
    }
})
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body
        console.log(req.body)
        if (!name || !email || !phone || !subject || !message) {
            return res.status(422).json({ error: "please fill it" })
        }
        const userQuery = await User.findOne({ email: email })
        if (userQuery) {
            const contact = await userQuery.contactUs(name, email, phone, subject, message)

            res.status(200).json({ message: "your query has been submitted" })

        } else {
            res.status(404).json({ error: "user not found" })
        }
    } catch (err) {
        console.log(err)
    }
})
router.post('/voter', authenticate, async (req, res) => {
    const { voter } = req.body
    try {
        const voterRegi = await User.findOne({ voterId: voter })
        if (voterRegi) {
            return res.status(422).json({ error: 'VoterId Already Exist' })
        } else {
            const token = req.headers.token
            const userSignIn = await User.findOne({ 'tokens.token': token })
            if (userSignIn) {
                userSignIn.voterId = voter
                await userSignIn.save().then(() => {
                    return res.status(201).json({ message: "Voter Id Registered" })
                })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Some Error occured" })

    }
})
router.get('/voter', authenticate, async (req, res) => {
    const token = req.headers.token
    const userSignIn = await User.findOne({ 'tokens.token': token })
    console.log(userSignIn.voterId);
    if (userSignIn.voterId) {
        return res.status(201).json({ message: 'Voter Id is Checked' })
    } else {
        return res.status(401).json({ message: 'Voter Id missing' })

    }
})
router.get('/state', authenticate, async (req, res) => {
    const token = req.headers.token
    const userSignIn = await User.findOne({ 'tokens.token': token })
    console.log(userSignIn);
    if (userSignIn) {
        const state = userSignIn.state
        const isVoted = userSignIn.isVoted
        console.log(isVoted)
        return res.send({ state, isVoted })
    } else {
        return res.status(401).json({ message: 'Invalid Token' })

    }
})
router.post('/voted', authenticate, async (req, res) => {

    const token = req.headers.token

    const { partyName, Id } = req.body
    console.log(partyName, Id)
    const count = 1
    const userSignIn = await User.findOne({ 'tokens.token': token })
    if (userSignIn.isVoted) {
        return res.status(401).json({ error: "Voter Already Voted" })
    } else {
        const voted = await Party.findOne({ partyName: partyName })
        if (voted) {
            voted.vote = voted.vote + count
            await voted.save().then(() => {
                userSignIn.isVoted = true
                userSignIn.save()
                return res.status(201).json({ message: "Vote Successfully Added" })
            })

        } else {
            const newParty = new Party({ partyName, Id })
            await newParty.save().then(() => {
                console.log('party Added')
            })
            // await newParty.save().then(() => {
            //     res.status(201).json({ message: "Party Registered" })

            // })
            if (newParty) {
                const voted = await Party.findOne({ partyName: partyName })
                if (voted) {
                    try {
                        voted.vote = 0 + count
                        console.log(voted.vote)
                        voted.save().then(() => {
                            userSignIn.isVoted = true
                            userSignIn.save()
                            return res.status(201).json({ message: "Vote Successfully Added" })
                        })
                    } catch (err) {
                        console.log(err)
                        
                    }
                }


            }
        }

    }

})


router.get('/parties',authenticate,async(req,res)=>{
    let parties
    await Party.find({}).then(data=>{
        parties=data
        console.log(parties);
        return res.send(parties)
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({ message: 'Invalid Token' })
    })

    })


module.exports = router