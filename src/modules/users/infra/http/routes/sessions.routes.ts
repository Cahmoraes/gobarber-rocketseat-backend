import { Router } from 'express'
import SessionsContoller from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionController = new SessionsContoller()

sessionsRouter.post('/', sessionController.create)

export default sessionsRouter