export const environment = {
  production: true,
  api: 'https://sdate-api.herokuapp.com',
  localStorage: {
    prefix: 'sdate',
    accessToken: 'access_token',
    customerSignupWizard: 'customer_signup_wizard',
  },
  socket: {
    url: 'https://sdate-api.herokuapp.com/',
    join: 'join',
    events: 'events',
    messages: 'messages',
  },
};
