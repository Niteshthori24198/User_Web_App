require('dotenv').config()
const express = require('express');
const cors = require('cors');

const { connection } = require("./database/db");
const { AuthMiddleware } = require('./middleware/user.authMiddleware');
const { userRouter } = require('./routes/user.route');
const { taskRouter } = require("./routes/task.route");
const { postRouter } = require('./routes/feed.post.route');

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    return res.send(
        {
            msg: "Welcome To Web App 💖"
        }
    )
})


// User Routes : [Auth and Feed Post]
app.use("/api/user", userRouter);
app.use("/api/user/feed/post", postRouter);

// Task Routes
app.use(AuthMiddleware);
app.use("/api/user/task", taskRouter);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Connected to DB. Server running on port ${process.env.port}!`);
    } catch (error) {
        console.log("Error in connecting to DB.", error);
        process.exit(1);
    }
})



