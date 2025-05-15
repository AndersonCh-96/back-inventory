import express from 'express'
import {  UserController } from '../controllers/user.controller'
import Container from 'typedi'
import { user_validator } from '../validators/user.validator'
export const user_router= express.Router()

const userController= Container.get(UserController)
user_router.get('/',userController.getAllUser.bind(userController))
user_router.get('/:id',userController.getOneUser.bind(userController))
user_router.post('/',user_validator(),userController.createUser.bind(userController))
user_router.put('/:id',user_validator(),userController.updateUser.bind(userController))
user_router.delete('/:id', userController.deleteUser.bind(userController))
