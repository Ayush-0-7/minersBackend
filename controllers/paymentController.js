const express = require('express');
const createorder = async(req,response) => {
    const topup = parseInt(req.body.topup);
    console.log(topup);
    await fetch("https://sandbox.cashfree.com/pg/orders",{
        method:"POST",
        headers:{
          "Content-Type":'application/json',
          "x-client-id":process.env.ID,
          "x-client-secret":process.env.SECRET,
          "x-api-version":"2023-08-01",
          "Accept":"application/json"
        },
        body:JSON.stringify({
          
            "order_amount":topup,
            "order_currency":"INR",
            "customer_details": {
                  "customer_email": "test@cashfree.com",
                  "customer_id": "LD09755CSCON10092021",
                  "customer_name": "Rohit",
                  "customer_phone": "9999911111"       
              },
              "order_meta":{
                "notify_url":"https://webhook.site/346dfdcc-e2d2-4620-89c7-05a136b3f556"
              }
          
        })
      }).then(async(res)=>{
        const data = await res.json();
        console.log("Order id is created");
        console.log(data);
        response.json({order_id:data.order_id,psi:data.payment_session_id});
      }).
      catch((err)=>{
        console.log("Order id is not created.");
    });
}


module.exports = createorder;
