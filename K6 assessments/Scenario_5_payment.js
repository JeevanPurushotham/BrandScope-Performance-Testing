import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://demo.owasp-juice.shop';

// Load CSV data
const payments = new SharedArray('payment data', function () {
  return open('./payments.csv').split('\n').slice(1).map(line => {
    const [cardNumber, expiry, cvv, amount] = line.split(',');
    return { cardNumber, expiry, cvv, amount };
  });
});

// Track failed transactions in memory
let failedTransactions = [];

export default function () {
  const payment = payments[__VU % payments.length]; // pick per VU

  const payload = JSON.stringify({
    card: payment.cardNumber,
    expiry: payment.expiry,
    cvv: payment.cvv,
    amount: payment.amount,
  });

  const headers = {
    headers: {
       'Content-Type': 'application/json',
       'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4',
       'cookie': 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4; continueCode=q3tpiQtacBIafmTBjukVc1qU8Vh7kIkzF3WFO8c4zcEgtqks9BcbRHa3InoTRg'
    },
  };

  const res = http.post(`${BASE_URL}/api/Cards`, payload, headers);

  const success = check(res, {
    'body is not empty': (r) => r.body && r.body.length > 0,
    'transaction successful': (r) => {
      const responseBody = JSON.parse(r.body);
      return responseBody.status === 'success' || responseBody.status === 'pending';
    },  
  });

  if (!success) {
    failedTransactions.push({
      card: payment.cardNumber,
      status: res.status,
      body: res.body,
    });
  }

  sleep(1);
}

// Write failed transactions to a file after test
export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'failed_transactions.json': JSON.stringify(failedTransactions, null, 2),
  };
}


// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { SharedArray } from 'k6/data';
// import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// const BASE_URL = 'https://demo.owasp-juice.shop';

// // ✅ Load JSON payment data
// const payments = new SharedArray('payment data', function () {
//   return JSON.parse(open('./payments.json')); // Load and parse JSON
// });

// // Track failed transactions in memory
// let failedTransactions = [];

// export default function () {
//   const payment = payments[__VU % payments.length]; // Pick one per VU

//   const payload = JSON.stringify({
//     card: payment.cardNumber,
//     expiry: payment.expiry,
//     cvv: payment.cvv,
//     amount: payment.amount,
//   });

//   const headers = {
//         headers: {
//            'Content-Type': 'application/json',
//            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4',
//            'cookie': 'language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjgsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJqZWV2YW4ucEBqb3Noc29mdHdhcmUuY29tIiwicGFzc3dvcmQiOiJjN2Q5ZWIwZDJmNTRmOGMxMTc3OTc2Y2YyZTZlZTZkNSIsInJvbGUiOiJjdXN0b21lciIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIwLjAuMC4wIiwicHJvZmlsZUltYWdlIjoiL2Fzc2V0cy9wdWJsaWMvaW1hZ2VzL3VwbG9hZHMvZGVmYXVsdC5zdmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMTEgMDU6Mzc6MzEuNjY0ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc0NDM0OTg3NX0.HOgFBzsNVoaGJpPiDfA78uSxn5I_Culgrwr2j7zCUMySOD2jdc6ygVQTfeUCvKAJ2fw1oQHfD75KXyWBZb5a96giMvLzebGWg5T17nDC6UY-Iz8VvZWmq-zlFwg4ytkpJKp4wSX3L_iVguAyRVjVlxR8zhjZA7QJtzIb0QIBvM4; continueCode=q3tpiQtacBIafmTBjukVc1qU8Vh7kIkzF3WFO8c4zcEgtqks9BcbRHa3InoTRg'
//         },
//       };

//   const res = http.post(`${BASE_URL}/api/Cards`, payload, headers);

//   const success = check(res, {
//     'body is not empty': (r) => r.body && r.body.length > 0,
//     'transaction successful': (r) => {
//       const responseBody = JSON.parse(r.body);
//       return responseBody.status === 'success' || responseBody.status === 'pending';
//     },  
//   });

//   if (!success) {
//     failedTransactions.push({
//       card: payment.cardNumber,
//       status: res.status,
//       body: res.body,
//     });
//   }

//   sleep(1);
// }

// // Summary + failed transaction report
// export function handleSummary(data) {
//   return {
//     stdout: textSummary(data, { indent: ' ', enableColors: true }),
//     'failed_transactions.json': JSON.stringify(failedTransactions, null, 2),
//   };
// }
