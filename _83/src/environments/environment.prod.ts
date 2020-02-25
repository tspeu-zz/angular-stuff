export const environment = {
  production: true,
  affiliatesApiUrl: 'https://tech-affiliates-api-dev.azurewebsites.net/api/',
  courseApi: 'https://tech-course-api.azurewebsites.net/api/',
  cdnUrl: 'https://cdn.techtitute.com/techtitute/',
  geoApiUrl : 'https://api-geoapi-test.azurewebsites.net/api/',
  jwt: {
    whiteListedDomains: ['tech-affiliates-api-dev.azurewebsites.net'],
    blackListedRoutes: ['tech-affiliates-api-dev.azurewebsites.net/api/auth/',
      'tech-course-api.azurewebsites.net',
      'api-geoapi-test.azurewebsites.net']
  }
};
