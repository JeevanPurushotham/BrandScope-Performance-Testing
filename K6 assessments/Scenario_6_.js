import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
    const url = 'https://test-1-erp.brandscope.com/api/buyplans/438961/info.json';
                 

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=13a410ac8aca956b31f81c9269dc986a',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQ0NjM3NjY5fQ.SpPA9nWMDH0u4mOObyBWoIsXdikIGrJE1czn8sZolb4',
  };


    let res = http.get(url, { headers });
    check(res, {
      'ordersList API status is 200': (r) => r.status === 200,
      'orders data received': (r) => r.body.length > 0,
  });
    console.log(`Response Status: ${res.status}`);


    const url1 = 'https://test-1-erp.brandscope.com/api/buyplans/438961/items.json';
    const headers1 = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=411d17150cc81206c39651829266eca0',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzIzMDc5LDY4MV0sImV4cCI6MTc0NDM2Mjk3Nn0.cXkXH-C21Wio2WGrzvBTU8kdcgdS7GvQfayBqWFRcxk',
  };
    const payload = JSON.stringify({
      product_release_id: 237452, warehouse_id: 262
    } )
    let cart = http.options(url1, { headers });
  console.log(`Response Status: ${cart.status}`);
  console.log(`Response Body: ${cart.body}`);
    check(cart, {

      // 'cart API status is 200': (r) => r.status === 200,
      'cart data received': (r) => r.body.length > 0,
  });



  const quantity = 'https://test-1-erp.brandscope.com/api/buyplans/438965/size_breaks/66614516/update_quantity.json';
  const quantityheader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=411d17150cc81206c39651829266eca0',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzIzMDc5LDY4MV0sImV4cCI6MTc0NDM2NjgzN30.0TEkHbEAFfNiU4XaHjGs2mDS30XooJgvYOpsYO1aWt0',
};
  const quantitypayload = JSON.stringify({
    product_release_id: 237452, warehouse_id: 262
  } )
  let quantitycart = http.put(quantity, quantitypayload,{ headers });
console.log(`Response Status: ${cart.status}`);
console.log(`Response Body: ${cart.body}`);
  check(quantitycart, {

    // 'quantitycart API status is 200': (r) => r.status === 200,
    'quantitycart data received': (r) => r.body.length > 0,
});

  const url2 = 'https://test-1-erp.brandscope.com/api/buyplans/438961/submit_order_info.json';
                 

  const headers2 = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=411d17150cc81206c39651829266eca0',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQ0NjM3NjY5fQ.SpPA9nWMDH0u4mOObyBWoIsXdikIGrJE1czn8sZolb4',
    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzIzMDc5LDY4MV0sImV4cCI6MTc0NDM2Mjk3Nn0.cXkXH-C21Wio2WGrzvBTU8kdcgdS7GvQfayBqWFRcxk',
};


  let res1 = http.get(url2, { headers });
  check(res1, {
    // 'sumbit order API status is 200': (r) => r.status === 200,
    'sumbit orders data received': (r) => r.body.length > 0,
});


const url3 = 'https://test-1-erp.brandscope.com/orders.json?start_date=2025-03-16T08:26:02Z&end_date=2025-04-14T18:29:59Z';
                 

const headers3 = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Cookie': 'BetterErrors-2.9.1-CSRF-Token=0b62a9f0-6208-4c7c-b454-93b6231a7665; BetterErrors-has-used-console=true; _brandscope_session=8dd0ce550f17085821c3a72889afb1ec',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkcyI6WzY4MSxudWxsXSwiZXhwIjoxNzQ0NjIzNTkxfQ.YZebdgcjDiz9QBivOGingz-r_tJlCfDNwDaQhc0-iXM',
};


let res3 = http.get(url3, { headers3 });
check(res3, {
  ' order sucessAPI status is 200': (r) => r.status === 200,
  'sumbit orders data received': (r) => r.body.length > 0,
});


}
