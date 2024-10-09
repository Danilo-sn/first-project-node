const express = require('express');
const uuid = require('uuid')

const app = express();
app.use(express.json());


const users = [];

const checkUserId = (req, res, next) => {
    const { id } = req.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({ message: 'user not found' })
    };

    req.userIndex = index

    next()

};

app.get('/users', (req, res) => {
    const { name, age } = req.query

    return res.status(200).json(users)

});

app.post('/users', (req, res) => {
    const { name, age } = req.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return res.status(201).json(user)

});

app.put('/users/:id', checkUserId, (req, res) => {
    const { id } = req.params
    const { name, age } = req.body

    const updatedUser = { id, name, age }

    users[req.userIndex] = updatedUser

    return res.status(200).json(updatedUser)

});

app.delete('/users/:id', checkUserId, (req, res) => {

    users.splice(req.userIndex, 1)

    return res.status(204).json()

})



app.listen(3000, () => {
    console.log("Server started on port 3000");

});