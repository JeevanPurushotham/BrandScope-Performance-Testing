import http from 'k6/http';
import { check, sleep } from 'k6';



export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Increase to 100 users in 2 mins
        { duration: '5m', target:  500}, // Spike to 500 users in 3 mins
        { duration: '1m', target: 0 },  // Recover
    ],
    thresholds: {
        'http_req_duration{name:GET_Orders}': ['p(95)<500'],
        'http_req_duration{name:GET_Products}': ['p(95)<400'],
        'http_req_duration{name:GET_Users}': ['p(95)<300'],
        'http_req_duration{name:GET_Retailers}': ['p(95)<300'],
        'http_req_duration{name:GET_Suppliers}': ['p(95)<300'],
        'http_req_duration{name:POST_Products}': ['p(95)<600'],
        'http_req_failed{name:POST_Products}': ['rate<0.01'],
    },
};

export default function () {
    const commonHeaders = {
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=43052c879b185d7ac49390f0d844970f',
    };

    const batchRequests = [
        {
            method: 'GET',
            url: `${Test1-baseUrl}orders.json?start_date=2025-03-03T04:26:25Z&end_date=2025-04-01T18:29:59Z`,
            params: {
                headers: commonHeaders,
                tags: { name: 'GET_Orders' }
            },
        },
        {
            method: 'GET',
            url: `${Test1-baseUrl}products.json?brand_id=1`,
            params: {
                headers: commonHeaders
                , tags: { name: 'GET_Products' }
            },
        },
        {
            method: 'GET',
            url: `${Test1-baseUrl}admin/users.json`,
            params: {
                headers: commonHeaders,
                tags: { name: 'GET_Users' }
            },
        },
        {
            method: 'GET',
            url: `${Test1-baseUrl}retailers`,
            params: {
                headers: commonHeaders,
                tags: { name: 'GET_Retailers' }
            },
        },
        {
            method: 'GET',
            url: `${Test1-baseUrl}suppliers`,
            params: {
                headers: commonHeaders
                ,
                tags: { name: 'GET_Suppliers' }
            },
        }
    ];

    // Fire all GET requests in parallel
    const responses = http.batch(batchRequests);

    check(responses[0], {
        'Orders API status is 200': (r) => r.status === 200,
        'Orders data received': (r) => r.body.length > 0,
    });

    check(responses[1], {
        'Products API status is 200': (r) => r.status === 200,
        'Products data received': (r) => r.body.length > 0,
    });

    check(responses[2], {
        'Users API status is 200': (r) => r.status === 200,
        'Users data received': (r) => r.body.length > 0,
    });

    check(responses[3], {
        'Retailers API status is 200': (r) => r.status === 200,
        'Retailers data received': (r) => r.body.length > 0,
    });

    check(responses[4], {
        'Suppliers API status is 200': (r) => r.status === 200,
        'Suppliers data received': (r) => r.body.length > 0,
    });

    // POST request separately (can't go in batch because payload differs)
    const postUrl = `${Test1-baseUrl}api/releases/2795/products.json`;
    const postHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...commonHeaders,
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQ0Mjg1NDk5fQ.oQqwsDeTDea-X1VLuXrXhJ38OH6eFZHw0toBsWO6930',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQ0NjIzNTkxfQ.YZebdgcjDiz9QBivOGingz-r_tJlCfDNwDaQhc0-iXM',
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

    const postResponse = http.post(postUrl, payload, {
        headers: postHeaders,
        tags: { name: 'POST_Products' }
    });

    check(postResponse, {
        'POST Range status 200': (r) => r.status === 200 || r.status === 201,
        'POST response body is not empty': (r) => r.body.length > 0,
    });

    sleep(1);
}
