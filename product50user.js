import http from 'k6/http';
import { check, sleep } from 'k6';



export let options = {
    stages: [
      { duration: "1m", target: 100 }, // Ramp up to 100 users in 1 min
      { duration: "3m", target: 500 }, // Increase to 500 users over 3 min
      { duration: "5m", target: 1000 }, // Peak at 1000 users
      { duration: "2m", target: 0 }, // Ramp down
    ],
  };
  

export default function () {
    const url = 'https://qa-erp.brandscope.com/products.json?brand_id=1431';

    // Set the extracted cookies dynamically (Ensure they're up to date)
    const headers = {
        'Cookie': `BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=87a3dd18c0c192c33b8d833db38b78e2`,
    };

    let usersResponse = http.get(url, { headers });

    check(usersResponse, {
        'products API status is 200': (r) => r.status === 200,
        'products data received': (r) => r.body.length > 0,
    });

    sleep(1); 
}
