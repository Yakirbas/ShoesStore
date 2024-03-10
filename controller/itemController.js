import {con} from '../db/db.js'
import * as dotenv from 'dotenv'
dotenv.config()


const itemfunc = {

    colors: (req,res) =>{
        
const q = process.env.Colors

con.query(q,(err,data)=>{
    if(err) return res.json(err)
    if(data.length == 0) return res.status(404).json("colors Not Found")
    return res.status(200).json(data)
})

    }
,

    sizes: (req,res) =>{
        
        const q =  process.env.sizes
        
        con.query(q,(err,data)=>{
            if(err) return res.json(err)
            if(data.length == 0) return res.status(404).json("sizes Not Found")
            return res.status(200).json(data)
        })
        
            }

            ,

            
            styles: (req,res) =>{
                const q =  process.env.Styles
                
                con.query(q,(err,data)=>{
                    if(err) return res.json(err)
                    if(data.length == 0) return res.status(404).json("styles Not Found")
                    return res.status(200).json(data)
                })
                
                    }

                    ,

                    companies: (req,res) =>{
                        const q = process.env.Companies
                        
                        con.query(q,(err,data)=>{
                            if(err) return res.json(err)
                            if(data.length == 0) return res.status(404).json("companies Not Found")
                            return res.status(200).json(data)
                        })
                        
                            }



                            ,

                            addShoes: (req,res)=>{

                               const obj = req.body
                               let tempdata={}
                                let q = process.env.INSERT_SHOE
                                let arr = [obj.modle,obj.company,obj.gender,obj.style,obj.description]

                                con.query(q,arr,(err,data)=>{
                                    if(err) return res.json(err)
                                    const shoeid=data.insertId
                                    q = process.env.INSERT_COLORS
                                    for (let i = 0; i < obj.colorSize.length; i++) {
                                        arr = [shoeid,obj.colorSize[i].colorid,obj.colorSize[i].url,obj.colorSize[i].imagefirebasid,obj.colorSize[i].price]

                                        con.query(q,arr,(err,data)=>{
                                            if(err) return res.json(err)
const tblshocolorid=data.insertId
q = process.env.INSERT_SIZES
for (let j = 0; j < obj.colorSize[i].sizearray.length; j++) {
   arr = [tblshocolorid,obj.colorSize[i].sizearray[j][0],obj.colorSize[i].sizearray[j][1]] 

   con.query(q,arr,(err,data)=>{
    if(err) return res.json(err)
    tempdata=data
   })
    
    
}

                                        })

                                        
                                    } 
                                })
                                return tempdata
                            }
                            ,

            getShoeByProduct: (req, res)=>{
               
let q = process.env.SHOES_MODEL
con.query(q,(err,data)=>{
    if(err)return res.json(err)
    if(data.length<1) return res.status(404).json("Shoes Not Found")
    return res.json(data)
})
                
            }

            ,
            getShoesWithColors: (req, res)=>{
                
let q = process.env.SHOES_COLORS
con.query(q,(err,data)=>{
    if(err)return res.json(err)
    if(data.length<1) return res.status(404).json("Shoes Not Found")
    return res.json(data)
})
                
            }
            
            ,
            getAllShoesSizes: (req, res)=>{
              
let q = process.env.SIZES_PER_SHOE
con.query(q,(err,data)=>{
    if(err)return res.json(err)
    if(data.length<1) return res.status(404).json("Shoes Not Found")
    return res.json(data)
})
                
            }
            ,
            allSizesExistOnStore: (req,res)=>{
let q = process.env.ALL_SIZES
con.query(q,(err,data)=>{
    if(err)return res.json(err)
    if(data.length<1) return res.status(404).json("Sizes Not Found")
    return res.json(data)
})
            }



}


export default itemfunc