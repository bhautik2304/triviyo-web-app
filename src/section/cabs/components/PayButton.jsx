import React from 'react'
import Razorpay from "razorpay"

function PayButton() {



    const Payment = ({ amount }) => {
        const [amount, setAmount] = useState('');

        const handlePayment = async () => {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: data.amount,
                currency: "INR",
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id: data.order_id,
                handler: async (response) => {
                    const result = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(response),
                    });
                    const resultData = await result.json();
                    alert(resultData.status);
                },
                prefill: {
                    name: 'Your Name',
                    email: 'your-email@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        };

        return (
            <></>
        )
    }

    export default PayButton