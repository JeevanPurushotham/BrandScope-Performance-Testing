import http from 'k6/http';
import { check, sleep } from 'k6';
import { parseHTML } from 'k6/html';



export const options = {
    vus: 100, // Simulate 50 virtual users
    duration: '30s', // Run the test for 30 seconds
};

export default function () {

    const url = 'https://test-1-erp.brandscope.com/admin/users.json';

    // Set the extracted cookies dynamically
    const headers = {
        'Cookie': `BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=da979f421b7fedac8462e645c2edbc04`,
    };

    let usersResponse = http.get(url, { headers });

    check(usersResponse, {
        'Users API status is 200': (r) => r.status === 200,
        'Users data received': (r) => r.body.length > 0,
    });

}



// https://docs.google.com/forms/d/e/1FAIpQLSfWobvKTjgTBMRX_1JDiTAGhOi2gdSd3y89M2gbW8BM8ySSJQ/formResponse