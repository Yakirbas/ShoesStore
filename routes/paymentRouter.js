import exspress from 'express'
import bodyParser from 'body-parser';
import axios from 'axios';
import paypal from 'paypal-rest-sdk';
import paymentController from '../controller/paymentController.js'
const router = exspress.Router()

router.post('/api/payments/orderpaid',paymentController.submitorder)


// Configure PayPal SDK
/* paypal.configure({
    mode: 'sandbox', // Change to 'live' for production
    client_id: 'AWeRe_NmUbRntIlHgBE94xDkw037v0HW-KkUXlbTSNa4sHqa896q2uttsXgHaStyEOA8I82pLL9SmTfP',
    client_secret: 'EK6TAOUp65ro9bkU5KQXnnHvOqHegktuyl4sZxT_RlUiigsBsI1RxWbkHO2_e40vMhxckSE3j8ilKhM9',
  });

  const PAYPAL_API_URL = 'https://api.sandbox.paypal.com'; // For sandbox environment
const CREATE_ORDER_URL = `${PAYPAL_API_URL}/v2/checkout/orders`;
const CAPTURE_ORDER_URL = `${PAYPAL_API_URL}/v2/checkout/orders/{{orderID}}/capture`;



  router.post('/api/payments/paymentId', async(req,res)=>{
    try {
      let response = await axios.post('https://api.paypal.com/v1/auth2/token', null, {
        params: {
          grant_type: 'client_credentials',
        },
        auth: {
          username: 'AWeRe_NmUbRntIlHgBE94xDkw037v0HW-KkUXlbTSNa4sHqa896q2uttsXgHaStyEOA8I82pLL9SmTfP',
          password: 'EK6TAOUp65ro9bkU5KQXnnHvOqHegktuyl4sZxT_RlUiigsBsI1RxWbkHO2_e40vMhxckSE3j8ilKhM9',
        },
      });

      const accessToken = response.data.access_token;

      try {
         response = await axios.post(`https://api.paypal.com/v2/checkout/orders/${req.body.data.paymentID}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `https://api.${accessToken}.paypal.com/v1/oauth2/token`,
          },
        });
    
        return response.data;
      }catch (error) {
        throw error;
      } 

    }catch(err){
      console.log(err)
    }
  
     
  

  }); */
export default router