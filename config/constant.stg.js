module.exports = {
  api: {
    customerLogin:
      'https://dashboard-stage.olivebodycare.healthcare/api/customers/sign_in',
    customerCreate:
      'https://dashboard-stage.olivebodycare.healthcare/api/customers',
    customerReset:
      'https://dashboard-stage.olivebodycare.healthcare/api/customers/password',
    reserveCommit:
      'https://dashboard-stage.olivebodycare.healthcare/api/reservations',
    shop: 'https://dashboard-stage.olivebodycare.healthcare/api/shops/:id',
    menu:
      'https://dashboard-stage.olivebodycare.healthcare/api/shops/:id/menus',
    date: 'https://dashboard-stage.olivebodycare.healthcare/api/shops/:id/dates'
  }
}
