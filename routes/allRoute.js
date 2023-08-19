const express = require('express');
const { loginStudent, registerStudent } = require('../controller/studentCtrl.js');
const { getAvailableSessions, createSession, deanRegister, deanLogin, getDeanPendingSessions, markSessionCompleted } = require('../controller/deanCtrl.js');
const { bookSession } = require('../controller/studentCtrl.js');
const { userMiddleware } = require('../middlewares/userMiddleware.js');
const { deanMiddleware } = require('../middlewares/deanMiddleware.js');
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);

router.post('/dean-register', deanRegister);
router.post('/dean-login', deanLogin);

router.get('/sessions', userMiddleware, getAvailableSessions);
router.post('/sessions', deanMiddleware, createSession);
router.post('/book', userMiddleware, bookSession);

router.get('/pending-sessions', deanMiddleware, getDeanPendingSessions);
router.post('/mark-completed', deanMiddleware, markSessionCompleted);



module.exports = router;