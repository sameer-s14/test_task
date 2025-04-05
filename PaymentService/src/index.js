const express = require('express');
const app = express();
const path = require('path');
const axios = require("axios");
const orderServiceURL = "http://127.0.0.1:4001"; 

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., stylesheets, images)
app.use(express.static(path.join(__dirname, 'public')));

// Root route to show payment page
app.get('/:orderId', (req, res) => {
    res.render('payment',{orderId: req?.params?.orderId });
});

// Payment endpoint
app.post('/pay/:orderId', async (req, res) => {
    // Simulate a delay to mimic payment processing
    const orderId = req?.params?.orderId;

    setTimeout(() => {
        // Random success/failure logic
        const isSuccess = Math.random() > 0.5;  // 50% chance for success or failure
         axios.put(
            `${orderServiceURL}/order/${orderId}`,
            {status: isSuccess ? 'accepted' : 'cancelled' },
          ).catch((err)=>{console.log("Error occured")})
        
        if (isSuccess) {
            res.render('payment-result', { status: 'success',orderId });
        } else {
            res.render('payment-result', { status: 'fail' ,orderId});
        }
    }, 3000); // 3 seconds delay to simulate payment processing
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
