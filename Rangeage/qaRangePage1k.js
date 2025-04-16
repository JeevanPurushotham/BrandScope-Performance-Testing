import { check } from 'k6';
import http from 'k6/http';

    export const options = {
        stages: [
            { duration: '2m', target: 50 }, 
             { duration: '8m', target: 400 },
            { duration: '15m', target: 800 },  
            { duration: '1m', target: 0 },   // Ramp down
        ],
    };


export default function () {
    const url = `${QA-baseUrl}api/releases/3565/products.json`;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=b547671fc45befd11bf30c00e4066396	',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQzNzAzMTkwfQ.n1RFlsqlEaSVE21UU37tGMxIjugc6i7BURYdr0qToHE',
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
            'Range 1 k data received': (r) => r.body.length > 0,
        });

    
}
