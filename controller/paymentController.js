import {con} from '../db/db.js'
import * as dotenv from 'dotenv'
dotenv.config()


const paymentController = {

    submitorder:(req,res)=>{

let q = process.env.INSERT_ORDER

let arr =  [req.body.user.id,req.body.order.id,req.body.order.payer.email_address,req.body.order.payer.name.given_name,req.body.order.payer.name.surname,req.body.order.purchase_units[0].amount.value*1,req.body.order.purchase_units[0].amount.currency_code,req.body.data.payerID,req.body.data.facilitatorAccessToken,req.body.order.purchase_units[0].shipping.address.admin_area_2,req.body.order.purchase_units[0].shipping.address.address_line_1,req.body.order.purchase_units[0].shipping.address.postal_code,req.body.order.purchase_units[0].shipping.address.country_code]

con.query(q,arr,(err,data)=>{
    if(err) return res.json(err)
   
q = process.env.INSERT_ITEMS_PER_ORDER

for (let index = 0; index < req.body.bag.length; index++) {
    
    arr = [data.insertId,req.body.bag[index].colorandqun[0].pProductID,req.body.bag[index].colorandqun[0].idcolorforsize,req.body.bag[index].colorandqun[0].sSize,req.body.bag[index].shoeDet[0].price,req.body.bag[index].shoeDet[0].pModel,req.body.bag[index].shoeDet[0].scColorID]
    con.query(q,arr,(err,data)=>{
        if(err) res.json(err)
    })

}

q = process.env.DELETE_FROM_BAG
arr = [req.body.user.id]
con.query(q,arr,(err,data)=>{
    if(err) res.json(err)
})

return res.json({mass:"order add to database",status:true})

})


    }


}

export default paymentController