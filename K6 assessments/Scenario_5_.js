import http from 'k6/http';
import { check,sleep } from 'k6';

const BASE_URL = 'https://demo.owasp-juice.shop';

export default function () {
  const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NTAsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDYyNDMyNH0.NU1nMlyGmhldD85r-Tpga1r2pM7uAhj6CpbYDLDCD5PldciJaqFNYGIceIYRDbuet6OSgBvw77NiUfLQkDQsEuuaT162el_Ln-KP4sUAR5YxI1Igs-vVnFOBX_owJlV-kfARjRNiMuCRUUrzQLn88avwtv2tOKNqzedClGJZscM';
  const cookie2 = 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; continueCode=aj4QDO4KyOqPJ7j2novp9EQ38gYVAJlGM1wWxalND5reZRLzmXk6BbmzZRb3';

  const headers3 = {
    headers: {
      Authorization: token,
      Cookie: cookie2,
    },
  };

  // GET Deliverys/3
  let deliveryRes = http.get(`${BASE_URL}/api/Deliverys/3`, headers3);
  check(deliveryRes, {
    'Deliverys/3 status is 200': (res) => res.status === 200,
  });

  // GET Addresss/7
  let addressRes = http.get(`${BASE_URL}/api/Addresss/8`, headers3);
  check(addressRes, {
    'Addresss/7 status is 200': (res) => res.status === 200,
  });

  // GET Cards/7
  let cardRes = http.get(`${BASE_URL}/api/Cards/9`, headers3);
  check(cardRes, {
    'Cards/7 status is 200': (res) => res.status === 200,
  });

  // GET Basket/12
  let basketRes = http.get(`${BASE_URL}/rest/basket/12`, headers3);
  check(basketRes, {
    'Basket/12 status is 200': (res) => res.status === 200,
  });

  sleep(1); // small wait between iterations

  const url2 = 'https://demo.owasp-juice.shop/rest/continue-code';

  const headers2 = {
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NTAsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDYyNDMyNH0.NU1nMlyGmhldD85r-Tpga1r2pM7uAhj6CpbYDLDCD5PldciJaqFNYGIceIYRDbuet6OSgBvw77NiUfLQkDQsEuuaT162el_Ln-KP4sUAR5YxI1Igs-vVnFOBX_owJlV-kfARjRNiMuCRUUrzQLn88avwtv2tOKNqzedClGJZscM",

    // 'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4',
    'cookie': 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; continueCode=aj4QDO4KyOqPJ7j2novp9EQ38gYVAJlGM1wWxalND5reZRLzmXk6BbmzZRb3'
  };

  let res2 = http.get(url2, { headers3 });

  check(res2, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });


  const url1 = 'https://demo.owasp-juice.shop/rest/basket/12/checkout';

  const payload = JSON.stringify({
    couponData: "bnVsbA==",
    orderDetails: {
      paymentId: "9",
      addressId: "8",
      deliveryMethodId: "3"
    }
  });

  const params = {
    headers: {
      'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NTAsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDYyNDMyNH0.NU1nMlyGmhldD85r-Tpga1r2pM7uAhj6CpbYDLDCD5PldciJaqFNYGIceIYRDbuet6OSgBvw77NiUfLQkDQsEuuaT162el_Ln-KP4sUAR5YxI1Igs-vVnFOBX_owJlV-kfARjRNiMuCRUUrzQLn88avwtv2tOKNqzedClGJZscM',
      'cookie': 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4; continueCode=q3tpiQtacBIafmTBjukVc1qU8Vh7kIkzF3WFO8c4zcEgtqks9BcbRHa3InoTRg',
      'Content-Type': 'application/json'
    }
  };

  const res1 = http.post(url1, payload, params);

  check(res1, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);



















  const url = 'https://demo.owasp-juice.shop/rest/track-order/4602-61ff6b93efb61b72';

  const headers = {
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4',
    'cookie': 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; continueCode=aj4QDO4KyOqPJ7j2novp9EQ38gYVAJlGM1wWxalND5reZRLzmXk6BbmzZRb3; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NTAsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTQgMDk6NTA6NDkuOTgyICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDYyNDMyNH0.NU1nMlyGmhldD85r-Tpga1r2pM7uAhj6CpbYDLDCD5PldciJaqFNYGIceIYRDbuet6OSgBvw77NiUfLQkDQsEuuaT162el_Ln-KP4sUAR5YxI1Igs-vVnFOBX_owJlV-kfARjRNiMuCRUUrzQLn88avwtv2tOKNqzedClGJZscM'
  };

  let res = http.get(url, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  console.log('Response status: ' + res.status);
  console.log('Response body: ' + res.body);
}
