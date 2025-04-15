
import http from 'k6/http';

export let options = {
    vus: 1, // Number of Virtual Users
    duration: '10s', // Test duration
};

export default function () {
    const url = 'https://test-1-erp.brandscope.com/api/releases/2297/products.json';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=fc3457c5e0a3a14caa14466e2dc65660',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQzNjcyMTgwfQ.FzVuBaNteiBSKqtabsnHd0aFtpfayYwyFeVzji-tbz8',
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

    // console.log(`Response Status: ${res.status}`);
    console.log(`Response Body: ${res.body}`);
}
