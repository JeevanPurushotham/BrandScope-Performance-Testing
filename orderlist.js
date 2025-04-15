import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 },  // Ramp up to 50 users in 1 minute
        { duration: '2m', target: 100 }, // Increase to 100 users over 2 minutes
        { duration: '2m', target: 1200 }, // Peak load at 200 users for 2 minutes
        { duration: '1m', target: 50 },  // Gradual decrease back to 50 users
        { duration: '30s', target: 0 },  // Cool down
    ],
};

    export default function () {
        const url = 'https://test-1-erp.brandscope.com/orders.json?start_date=2025-03-03T04:26:25Z&end_date=2025-04-01T18:29:59Z';

        // Set the extracted cookies dynamically (Ensure they're up to date)
        const headers = {
            'Cookie': `BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=dd0cce25d7f610210f9c6dd6eb629068`,
        };

        let orders = http.get(url, { headers });

        check(orders, {
            'orders API status is 200': (r) => r.status === 200,
            'orders data received': (r) => r.body.length > 0,
        });

        console.log(`orders API Response: ${orders.body}`);

        sleep(1); // Simulating user behavior with a 1-second delay
    }
