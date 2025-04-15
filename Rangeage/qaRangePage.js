import http from 'k6/http';

// export const options = {
//     stages: [
//         { duration: '1m', target: 50 },  // Ramp up to 50 users in 1 min
//         { duration: '3m', target: 300 },  // Stay at 50 users for 3 min
//         { duration: '1m', target: 0 },   // Ramp down
//     ],
// };

export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Increase to 100 users in 2 mins
        { duration: '1m', target: 500 }, // Spike to 500 users in 3 mins
        { duration: '1m', target: 1000 }, // Push to 1000 users
        { duration: '1m', target: 0 },  // Recover
    ],
};


// export const options = {
//     stages: [
//         { duration: '10s', target: 10 },  // Start with 10 users
//         { duration: '10s', target: 200 }, // Spike to 200 users
//         { duration: '10s', target: 10 },  // Drop back to 10
//     ],
// };

export default function () {
    const url = 'https://qa-erp.brandscope.com/api/releases/3571/products.json';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=8413eb36b198a214340233eade1e9c79',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQzNjc2MDEwfQ.8CZoPZ1X3Nu4v1G3_W8h3Lj7K28DH_2cJMwO2dyGopU',
    };

    const payload = JSON.stringify({
        limit: 30,
        offset: 0,
        filters: {
            common_filters: {
                exclude_sold_out_items: null,
                only_pre_order_products: null,
                min_price: null,
                max_price: null,
                currency: null,
                currency_symbol: null
            },
            dynamic_filters: {
                filter_tags: [],
                segments: [],
                divisions: [],
                colours: [],
                sizes: [],
                genders: [],
                age_groups: [],
                collections: [],
                delivery_months: []
            },
            tell_story_by: null,
            open_filter_groups: {}
        },
        override: true,
        type: null,
        buyplan_id: null,
        warehouse_id: '',
        category: null,
        subcategory: null
    });

    let res = http.post(url, payload, { headers });


     check(res, {
            'Range API status is 200': (r) => r.status === 200,
            'Range data received': (r) => r.body.length > 0,
        });
    
}
