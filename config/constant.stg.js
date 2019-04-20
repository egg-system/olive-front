module.exports = {
  api: {
    customerLogin:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/customers/sign_in',
    customerCreate:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/customers',
    customerReset: 'https://api.myjson.com/bins/18ieba',
    reserveCommit:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/reservations',
    shop:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/shops/:id',
    menu:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/shops/:id/menus',
    date:
      'http://olive-staging.ap-northeast-1.elasticbeanstalk.com/api/shops/:id/dates'
  }
}
