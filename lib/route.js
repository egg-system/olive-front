import _ from 'lodash'

export function route(baseRoute, routeParameters = null, getParameters = null) {
  let route = baseRoute
  if (process.env.NODE_ENV === 'dev') {
    return route
  }

  if (routeParameters) {
    Object.keys(routeParameters)
      .filter(key => route.indexOf(`:${key}`) !== -1)
      .forEach(key => {
        route = route.replace(`:${key}`, routeParameters[key])
      })
  }

  if (getParameters) {
    route = `${route}?${toGetParameters(getParameters)}`
  }

  return route
}

function toGetParameters(getParameters) {
  return _.flatten(
    Object.keys(getParameters).map(key => {
      return toKeyValues(key, getParameters[key])
    })
  ).reduce((parameters, current) => {
    return `${parameters}&${current}`
  }, '')
}

function toKeyValues(key, parameter) {
  if (parameter instanceof Array) {
    return parameter.map(value => `${key}[]=${value}`)
  }

  if (parameter instanceof Object) {
    return Object.keys(parameter).map(indexKey => {
      const eachValue = parameter[indexKey]
      return `${key}[${indexKey}]=${eachValue}`
    })
  }

  return [`${key}=${parameter}`]
}
