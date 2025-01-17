const fs = require("fs");
const {
    validateUser
} = require("../userHelpers");
const express = require("express");
const router = express.Router();
const {
    v4: uuidv4
} = require("uuid");

const user = require('../models/user')

router.post("/", validateUser, async (req, res, next) => {
    try {
        const {
            username,
            age,
            password
        } = req.body;
        const data = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(data));
        const id = uuidv4();
        data.push({
            id,
            username,
            age,
            password
        });
        const User = new user({ id, username, password, age })
        await User.save()
        await fs.promises.writeFile("./user.json", JSON.stringify(data), {
            encoding: "utf8",
        });
        res.send({
            id,
            message: "sucess"
        });
    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }
});

router.patch("/users/:userId", validateUser, async (req, res, next) => {
    try {
        const {
            username,
            age,
            password,
            id
        } = req.body;
        const users = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(users));
        const newusers = users.map((user) => {
            if (user.id != req.params.userId) {
                return user
            } else {
                return {
                    username,
                    password,
                    age,
                    id: req.params.userId
                }
            }
        })
        await fs.promises.writeFile("./user.json", JSON.stringify(newusers), {
            encoding: "utf8",
        });
        res.status(200).send({

            message: "user edited"
        });
    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }

});


router.get('/', async (req, res, next) => {
    try {
        const age = Number(req.query.age)
        const users = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(data));
        const filteredUsers = users.filter(user => user.age === age)
        res.send(filteredUsers)
    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }

})

router.get('/', async (req, res, next) => {
    try {
        const id = req.query.id
        const users = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(data));
        const filteredUsers = users.filter(user => user.id === id)
        res.send(filteredUsers)
    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }

})

router.post('/users/login', async (req, res, next) => {
    try {
        const users = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(data));
        const loguser = users.find(user => user.password == req.body.password && user.username === req.body.username)
        if (!loguser) return res.status(400).send('incorrect user')
    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }
})

router.delete("/:userId", async (req, res) => {

    try {
        const {
            username,
            age,
            password
        } = req.query
        const users = await fs.promises
            .readFile("./user.json", {
                encoding: "utf8"
            })
            .then((data) => JSON.parse(data));

        users.map((user) => {
            if (user.id == req.params.userId) {

                data.pop({
                    id,
                    username,
                    age,
                    password
                });
            }
        })
    

    } catch (error) {
        next({
            status: 500,
            internalMessage: error.message
        });
    }
});

module.exports = {
    router
}






module.exports = {
    router
}