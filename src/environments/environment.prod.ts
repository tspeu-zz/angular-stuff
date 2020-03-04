export const environment = {
  production: true,
  affiliatesApiUrl: 'https://api-affiliates-program-test.azurewebsites.net/api/',
  courseApi: 'https://tech-course-api.azurewebsites.net/api/',
  cdnUrl: 'https://cdn.techtitute.com/techtitute/',
  geoApiUrl : 'https://api-geoapi-test.azurewebsites.net/api/',
  hostTech: 'http://desarrollo2.techtitute.com',
  jwt: {
    whiteListedDomains: ['api-affiliates-program-test.azurewebsites.net'],
    blackListedRoutes:  ['api-affiliates-program-test.azurewebsites.net/api/auth/',
      'tech-course-api.azurewebsites.net',
      'api-geoapi-test.azurewebsites.net']
  }
};
