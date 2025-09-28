import express from 'express'
import { AuthMiddleware } from '../middleware/Auth.middleware.js'
import { generateInterviewQuestion, togglePinQuestion } from '../Controller/question.controller.js'

const questionRoute = express.Router()

questionRoute.route('/addQuestion').post(AuthMiddleware, generateInterviewQuestion)
questionRoute.route('/toggleQuestion/:id').post(AuthMiddleware, togglePinQuestion)


export default questionRoute