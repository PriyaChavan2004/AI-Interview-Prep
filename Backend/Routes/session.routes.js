
import express from 'express'
import { AuthMiddleware } from '../middleware/Auth.middleware.js'
import { createSession, deleteSession, getSession, getSessionById } from '../Controller/session.controller.js'


const sessionRouter= express.Router()


sessionRouter.route('/createSession').post(AuthMiddleware, createSession)
sessionRouter.route('/getMySession').get(AuthMiddleware, getSession)
sessionRouter.route('/getMySessionById/:id').get(AuthMiddleware, getSessionById)
sessionRouter.route('/deleteMySession/:id').delete(AuthMiddleware, deleteSession)

export default sessionRouter
