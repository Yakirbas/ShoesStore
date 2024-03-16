import express from 'express'
import userRouter from './userRouter.js'
import itemRouter from './itemRouter.js'
import paymentRouter from './paymentRouter.js'
const router = express.Router()

router.use('/user',userRouter)
router.use('/items',itemRouter)
router.use('/payment',paymentRouter)

export default router