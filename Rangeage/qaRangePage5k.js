import { check } from 'k6';
import http from 'k6/http';

 
export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Increase to 100 users in 2 mins
        { duration: '3m', target: 500 }, // Spike to 500 users in 3 mins
        { duration: '5m', target: 800 }, // Push to 1000 users
        { duration: '1m', target: 0 },  // Recover
    ],
};

export default function () {
    const url = `${QA-baseUrl}api/releases/3566/products.json`;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=9704cc214e3656d46564cf46ec7b0987	',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQzNzUyMzk5fQ.ralzzxGm9J2qGoxhCKIG8jvgbdaMv-ipyPlQZqkZyJI',
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
            'Range 5 k data received': (r) => r.body.length > 0,
        });
    
}
