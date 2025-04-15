

import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'https://qa-erp.brandscope.com/users/sign_in';
    const payload = JSON.stringify({
        username: 'josh.brandscope1@gmail.com',
            password: 'josh$123#',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            
        },
        // timeout: '10s',
    };

    const response = http.post(url, payload, params);

    // Check if the login is successful
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is login successful': (r) => r.body.includes('success'), // Adjust based on response structure
        'is token present': (r) => r.body.includes('token'), // Adjust based on response structure
        
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);

    if (response.status === 500) {
        console.log(`Error: Internal Server Error occurred. Response: ${JSON.stringify(response.body)}`);
    }


    // http.get('https://qa-erp.brandscope.com/brands');
    let showroom = http.get('https://qa-erp.brandscope.com/products');

    console.log('Response Status:', showroom.status);
    console.log('Response Body:', showroom.body);  // Log the full response

}