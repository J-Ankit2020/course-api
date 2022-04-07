const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const courseRouter = require('./routers/course');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(courseRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
})