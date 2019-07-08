module.exports = {
  api: {
    customerLogin: 'http://localhost:8080/api/customers/sign_in',
    customerCreate: 'http://localhost:8080/api/customers',
    validateToken: 'http://localhost:8080/api/customers/validate_token',
    customerReset: 'http://localhost:8080/api/customers/password',
    reserveCommit: 'http://localhost:8080/api/reservations',
    reservation: 'http://localhost:8080/api/reservations/:id',
    menu: `http://localhost:8080/api/shops/:id/menus`,
    shop: `http://localhost:8080/api/shops/:id`,
    date: `http://localhost:8080/api/shops/:id/dates`
  },
  isProd: false,
  isMaintenance: false
}
