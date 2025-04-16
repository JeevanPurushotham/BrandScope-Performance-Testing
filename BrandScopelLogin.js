
import http from 'k6/http';
import { check, sleep } from 'k6';
import { parseHTML } from 'k6/html';

export default function () {
    const loginPageResponse = http.get(`${Test1-baseUrl}users/sign_in`);

    // Extract CSRF token
    const doc = parseHTML(loginPageResponse.body);
    const csrfToken = doc.find("meta[name='csrf-token']").attr('content');

    if (!csrfToken) {
        console.error("CSRF Token not found!");
        return;
    }

    const loginUrl = `${Test1-baseUrl}users/sign_in`;
    const payload = JSON.stringify({
        user: {
                username: __ENV.USERNAME,
                password: __ENV.PASSWORD,
        }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken, 
        },
    };

    let response = http.post(loginUrl, payload, params);

    check(response, {
        'Login successful': (r) => r.status === 200,
    });

    //   Extract Bearer Token from response (Assuming it's in JSON)
      let authToken = null;
      try {
          let responseBody = JSON.parse(response.body);
          authToken = responseBody.token || responseBody.access_token; // Adjust based on actual response
      } catch (e) {
          console.error("Failed to parse authentication token:", e);
      }
  
      if (!authToken) {
          console.error("Bearer Token not found in response!");
          return;
      }
  
      console.log("Extracted Bearer Token: " + authToken);


    // Extract session cookie
    const authCookies = response.headers['Set-Cookie'];
    const sessionCookie = authCookies
        ? authCookies.split(';')[0]  // Extract only session-related cookie
        : null;

    if (!sessionCookie) {
        console.error("Session Cookie not found!");
        return;
    }

    console.log("Extracted Session Cookie: " + sessionCookie);
    console.log("csrfToken: " + csrfToken);

}
