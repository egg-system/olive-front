module.exports = {
  api: {
    customerLogin: 'https://dashboard.olivebodycare.healthcare/api/customers/sign_in',
    customerCreate: 'https://dashboard.olivebodycare.healthcare/api/customers',
    customerReset: 'https://dashboard.olivebodycare.healthcare/api/customers/password',
    validateToken: 'https://dashboard.olivebodycare.healthcare/api/customers/validate_token',
    reserveCommit: 'https://dashboard.olivebodycare.healthcare/api/reservations',
    reservation: 'https://dashboard.olivebodycare.healthcare/api/reservations/:id',
    shop: 'https://dashboard.olivebodycare.healthcare/api/shops/:id',
    menu: 'https://dashboard.olivebodycare.healthcare/api/shops/:id/menus',
    date: 'https://dashboard.olivebodycare.healthcare/api/shops/:id/dates'
  },
  isProd: true,
  isMaintenance: false
}
