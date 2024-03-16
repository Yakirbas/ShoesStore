import {con} from '../db/db.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()

 const userfunc = {

login: (req,res) =>{

   
    const q = process.env.GET_USER_BY_MAIL

    con.query(q,[req.body.email],(err,data)=>{

        if(err) return res.json(err)
        if(data.length != 1) return res.status(404).json("User Not Found")

        const isPasswordCorrect= bcrypt.compareSync(req.body.password, data[0].password);
        
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
        const token = jwt.sign({email:data[0].email},process.env.JWT_KEY);

        const {password, ...other} = data[0];
      
    /*     return res.cookie(process.env.TOKEN_FOR_USER,token ,{
            httpOnly:false
        }).status(200).json(other); */
        return res.json({other,token})
       

    })

 
}
,
register: (req,res,next)=>{
    const q = process.env.GET_USER_BY_MAIL
    con.query(q,[req.body.email],(err,data)=>{
        if(err) return res.json(err)
        if(data.length > 0) return res.status(401).json("User Already Exist")


        //הצפנה של הסיסמא
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const q =  process.env.INSERT_USERS
        const values=[
            req.body.name,
            req.body.email,
            hash,
        ]
        
        con.query(q,[values], (err,data)=>{
            if(err) return res.json(err)
            
        req.userid=data.insertId
           next()
        })

    })
},

createtokenforregistar: (req,res)=>{
const q = process.env.GET_USER_BY_MAIL
console.log(req.body)
con.query(q,[req.body.email],(err,data)=>{
  
    if (err) return res.json(err)
    if(data.length!=1) return res.status(404).json('token not created')
    
    const token = jwt.sign({email:data[0].email},process.env.JWT_KEY);

        const {password, ...other} = data[0];
        return res.cookie(process.env.TOKEN_FOR_USER,token ,{
            httpOnly:false
        }).status(200).json(other);
})

}
,

 logout: (req,res)=>{
    
    res.clearCookie(process.env.TOKEN_FOR_USER,{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}
,
exist:(req,res)=>{
    const q = process.env.GET_USER_ID
    let arr =[req.body.email]
    con.query(q,arr,(err,data)=>{
        if(err) return res.json(err)
        if(data!=1) return res.status(404).json('Not Found')
        if(data[0].id=req.body.id){
            return res.json(data)
        }
        else{
            return res.status(404).json('Not Found')
        }
    })
}

,

checktoken:(req,res,next)=>{
    console.log(req.body.token)
    jwt.verify(req.body.token,process.env.JWT_KEY,(err, authData) => {
    
        if(err) return res.status(404).json(err)
      req.info=authData
     next()
    })

    
}
,

checkiftokerexist:(req,res)=>{
    const q = process.env.GET_USER_BY_MAIL
    con.query(q,[req.info.email],(err,data)=>{
     if(err)return res.status(404).json(err)
     if(data.length != 1)return res.status(404).json(err)
     const {password,email, ...other} = data[0] 
     return res.json(other)
    })
}

,

addtobag:(req,res)=>{
    console.log(req.body)
 let q = ""
    jwt.verify(req.body.obj.checktok,process.env.JWT_KEY,(err, authData) => {
        if(err){ return res.status(404).json(err)}
        
    q = process.env.GET_EMAIL_BY_USER_ID
    con.query(q,[req.body.obj.pack.userid],(err,data)=>{
        if(err) {return res.status(404).json(err)}
        if(data[0].email==authData.email){
            q=process.env.ADD_TO_BAG
            const arr =[req.body.obj.pack.userid, req.body.obj.pack.productid, req.body.obj.pack.idcolorforsize, req.body.obj.pack.size]
            con.query(q,[arr],(err,data)=>{
                if(err)return res.json(err)
                return res.json(true)
            }) 
        }
        else{
            return res.json(false)
        }
    })


    })
}

,

allbag:(req,res)=>{
   const q = process.env.USER_BAG
   const arr = [req.body.id]
   con.query(q,arr,(err,data)=>{
    if(err)return res.json(err)
    return res.json(data)
   })
}

,

removefrombag:(req,res)=>{
let q= process.env.GET_SHOE_FORM_BAG
let userid=req.body.user.id
let shoeid=req.body.item.colorandqun[0].pProductID
let shoecolorid = req.body.item.colorandqun[0].idcolorforsize
let size = req.body.item.colorandqun[0].sSize
let arr=[userid,shoeid,shoecolorid,size]
con.query(q,arr,(err,data)=>{
    if(err) return res.json(err)
q = process.env.DELETE_SHOE_FROM_BAG
con.query(q,arr,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
})

})
}

,
/* קבלת הידי של כל העסקאות לפי יוזר */
mypurchase:(req,res)=>{
    let temparr =[]
    let q = process.env.GET_ID_OF_ALL_PURCHASE
    let arr = [req.body.id]
    con.query(q,arr,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)

    })
}

,
/* קבלת כל המוצרים הכלולים בכל עסקה בנפרד */
mypurchase2:(req,res)=>{
let q = process.env.GET_ALL_ITEM_PER_PURCHASE
let arr = [req.body.id]
con.query(q,arr,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
})
}

,

forget:(req,res)=>{
    const {email} = req.body
    let q = process.env.GET_USER_BY_MAIL
    con.query(q,[email],(err,data)=>{
        if(err) return res.json(err)
        if(data.length!=1){
            return res.json("Not Found")
        }
const token = jwt.sign({email:data[0].email},process.env.JWT_KEY)

var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user:process.env.EMAIL_OF_THE_WEB,
      pass: process.env.EMAIL_PASS
    }
  });
  
  var mailOptions = {
    from: process.env.EMAIL_OF_THE_WEB,
    to: `${data[0].email}`,
    subject: 'Reset your password',
    text: `http://${process.env.VITE_SERVER}/reset-password/${data[0].id}/${token}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      return res.json("Success")
    }
  });

    })
}


,

resetpass:(req,res)=>{
    const {id,token} = req.params
    console.log(req.body)
    const {password} = req.body

    jwt.verify(token, process.env.JWT_KEY,(err,authData)=>{
        if(err)return res.json(err)
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            let q = process.env.GET_USER_BY_ID

        con.query(q,[id],(err,data)=>{
            if(err)return res.json(err)
            if(data.length!=1)return res.json("Not Found")
            q =process.env.UPDATE_PASS
        let arr = [hash, id]
        con.query(q,arr,(err,data)=>{
            if(err)return res.json(err)
            console.log(data)
            return res.json("Success")
        })
        })
   

        }
    })


}

,

checkM:(req,res)=>{
    console.log(req.body)
    jwt.verify(req.body.cookies.access_token,process.env.JWT_KEY,(err, authData) => {
        if(err) return res.status(404).json(err)
     
     const q = process.env.GET_USER_BY_MAIL
    con.query(q,[authData.email],(err,data)=>{
     if(err)return res.status(404).json(err)
     if(data.length != 1)return res.status(404).json(err)
     console.log(data[0])
     if(data[0].email==process.env.EMAIL_OF_THE_WEB_MANAGER&&data[0].id==req.body.user.id){
        return res.json("ok_to_process")
     }
     return res.json("access_denied")
    }) 
    
})

}
 }

export default userfunc