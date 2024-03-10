import express from 'express'
import cors from 'cors'
import router from './routes/routes.js';
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*",true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin ,X-Requestad-With,Content-Type,Access,Authorization,Accept"
    );
    
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
    }
    next();
  });
  app.use(cors({ credentials: true, origin: true }))
  
app.use('/',router)
 

app.listen(process.env.PORT,()=>{
console.log("lisent to port "+ process.env.PORT)
})




