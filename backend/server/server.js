const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const createEvent = require('./routes/eventCreateEvents');
const getAllEvents = require('./routes/eventGetAllEvents')
const editEvent = require('./routes/eventEditEvents');
const deleteEvent = require('./routes/eventDeleteEvents')
const favEvent = require('./routes/favoriteEvents')
const createComment = require('./routes/commentCreateComment');
const getAllComment = require('./routes/commentGetAllComment');
const editComment = require('./routes/commentEditComment');
const uploadProfilePicture = require('./routes/uploadProfilePic');
const userGetRole = require('./routes/userGetRole');
const getEventById = require('./routes/eventById');
const userParticipateRouter = require('./routes/userParticipate');


require('dotenv').config();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const SERVER_PORT = 8083

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', userGetRole)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/event', createEvent)
app.use('/event', getAllEvents)
app.use('/event', editEvent)
app.use('/event', deleteEvent)
app.use('/event', getEventById)
app.use('/favorites', favEvent)
app.use('/comment', createComment )
app.use('/comment', getAllComment )
app.use('/comment', editComment )
app.use('/user', uploadProfilePicture)
app.use('/api/user', userParticipateRouter);
app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
