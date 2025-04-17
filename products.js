
import http from 'k6/http';
import { check, sleep } from 'k6';
import { parseHTML } from 'k6/html';

export default function () {
    const Test1_baseUrl = __ENV.Test1_baseUrl; // Replace with your actual base URL

    const url = `${Test1_baseUrl}products.json?brand_id=1`;

    // Set the extracted cookies dynamically
    const headers = {
        'Cookie': `BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=c55e78fb4412bbe93c26b741263b7d27`,
    };

    let usersResponse = http.get(url, { headers });

    check(usersResponse, {
        'Users API status is 200': (r) => r.status === 200,
        'Users data received': (r) => r.body.length > 0,
    });

    console.log(`Users API Response: ${usersResponse.status}`);
    console.log(`Users API Response Body: ${usersResponse.body}`);
}

