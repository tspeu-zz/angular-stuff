// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   production: false,
   affiliatesApiUrl: 'https://tech-affiliates-api-dev.azurewebsites.net/api/',
   courseApi: 'https://tech-course-api.azurewebsites.net/api/',
   cdnUrl: 'https://cdn.techtitute.com/techtitute/',
   geoApiUrl : 'https://api-geoapi-test.azurewebsites.net/api/',
   jwt: {
      whiteListedDomains: ['tech-affiliates-api-dev.azurewebsites.net'],
      blackListedRoutes:  ['tech-affiliates-api-dev.azurewebsites.net/api/auth/',
                           'tech-course-api.azurewebsites.net',
                           'api-geoapi-test.azurewebsites.net']
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
