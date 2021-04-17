export const environment = {
  production: true,
  api: 'http://kinkflirt.com:3000',
  localStorage: {
    prefix: 'sdate',
    accessToken: 'access_token',
    customerSignupWizard: 'customer_signup_wizard',
  },
  socket: {
    url: 'http://kinkflirt.com:3000',
    join: 'join',
    disconnect: 'endjoin',
    events: 'events',
    messages: 'messages',
  },
};
