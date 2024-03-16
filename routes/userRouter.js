import exspress from 'express'
import userfunc from '../controller/userController.js'
const router = exspress.Router()


router.post('/login',userfunc.login)
router.post('/logout',userfunc.logout)
router.post('/register',userfunc.register,userfunc.createtokenforregistar)
router.post('/exist',userfunc.exist)
router.post('/checktoken',userfunc.checktoken,userfunc.checkiftokerexist)
router.post('/addtobag',userfunc.addtobag)
router.post('/allbag',userfunc.allbag)
router.post('/removefrombag',userfunc.removefrombag)
router.post('/mypurchase',userfunc.mypurchase)
router.post('/mypurchase2',userfunc.mypurchase2)
router.post('/forgetpass',userfunc.forget)
router.post('/reset-password/:id/:token',userfunc.resetpass)
router.post('/checkM',userfunc.checkM)
export default router