import express from 'express'
import Container from 'typedi'
import { AuthController } from '../controllers/auth.controller'

export const auth_route= express.Router()

const authController= Container.get(AuthController)
auth_route.post('/signIn',authController.singInt.bind(authController))
auth_route.post('/register',authController.register.bind(authController))