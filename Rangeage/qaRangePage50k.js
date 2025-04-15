import { check } from 'k6';
import http from 'k6/http';


export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Increase to 100 users in 2 mins
        { duration: '8m', target: 400 }, // Spike to 400 users in 8 mins
        { duration: '10m', target: 600 }, // Push to 600 users
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
    const url = 'https://qa-erp.brandscope.com/api/releases/3507/products.json';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=93045ae1157d083d1e5162f584394c0f	',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQzNzY4MjY2fQ.7FwgMiGFDbsxhj7SMY8p83wC136HlRm4NIkMSjb2Lvo',
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
            'Range 50 k data received': (r) => r.body.length > 0,
        });
    
}
