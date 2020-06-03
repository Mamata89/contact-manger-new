const express = require('express')
const router = express.Router()
const {authenticateUser}=require('../app/middleware/authenticate')

const UsersController =require('../app/controller/userController')
const contactController  = require('../app/controller/contactController')

router.post('/users/register',UsersController.register)
router.post('/users/login',UsersController.login)
router.get('/users/account',authenticateUser,UsersController.account)
router.delete('/users/logout',authenticateUser,UsersController.logout)

router.post('/contacts/create',authenticateUser,contactController.create)
router.get('/contacts',authenticateUser,contactController.list)
router.get('/contacts/:id',authenticateUser,contactController.show)
router.put('/contacts/:id',authenticateUser,contactController.update)
router.delete('/contacts/:id', authenticateUser,contactController.destroy)





module.exports = router