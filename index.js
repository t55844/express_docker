const express = require('express');
const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./confg/confg');


const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRouters');

const app = express();

const port = process.env.PORT || 8007

const connectWithRetry = () => (
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
        .then(() => console.log('conected mongoose ...'))
        .catch((e) => {
            console.log('mongoose conect failed ' + e)
            setTimeout(connectWithRetry, 5000)
        })

)

connectWithRetry()

app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(port, () => console.log("run in port: ", port));
