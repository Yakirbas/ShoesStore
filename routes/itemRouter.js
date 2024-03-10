import exspress from 'express'
import itemfunc from '../controller/itemController.js'
const router = exspress.Router()

router.get('/allgroupby',itemfunc.getShoeByProduct)
router.get('/allshoescolors',itemfunc.getShoesWithColors)
router.get('/allshoescolorssize',itemfunc.getAllShoesSizes)
router.get('/allsize',itemfunc.allSizesExistOnStore)
router.get('/colors',itemfunc.colors)
router.get('/sizes',itemfunc.sizes)
router.get('/styles',itemfunc.styles)
router.get('/companies',itemfunc.companies)
router.post('/addshoes',itemfunc.addShoes)
export default router