import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1, // Number of virtual users
  duration: '1m', // Test duration
};

export default function () {
  // Step 1: Perform Login Request

  const loginPageResponse = http.get('https://qa-erp.brandscope.com/users/sign_in');
    const doc = parseHTML(loginPageResponse.body);
      const csrfToken = doc.find("meta[name='csrf-token']").attr('content');
  
      if (!csrfToken) {
          console.error("CSRF Token not found!");
          return;
      }


  let loginRes = http.post(
    'https://qa-erp.brandscope.com/users/sign_in',
    JSON.stringify({
      "user[username]": "josh.brandscope1@gmail.com",
      "user[password]": "josh$123#"
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': csrfToken,
      },
    }
  );

  // Extract the session cookie
  let sessionCookie = loginRes.cookies['_brandscope_session'] 
    ? loginRes.cookies['_brandscope_session'][0].value 
    : null;

  check(loginRes, {
    'Login was successful': (res) => res.status === 200,
  });

  if (!sessionCookie) {
    console.error('Session cookie not found!');
    return;
  }

  console.log(`Extracted Session Cookie: ${sessionCookie}`);

  // Step 2: Use the Cookie for Subsequent Requests
  let productRes = http.get('https://qa-erp.brandscope.com/products', {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': csrfToken,
      'Cookie': `_brandscope_session=${sessionCookie}`,
    },
  });

  check(productRes, {
    'Fetched products successfully': (res) => res.status === 200,
    // 'Products page loaded': (r) => r.body.includes('products'),
  });

  console.log(`Products Response: ${productRes.status}`);
  console.log(`product body: ${productRes.body}`);
}
