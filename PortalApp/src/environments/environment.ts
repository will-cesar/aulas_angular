// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceUrl: 'https://wprcihml.azurewebsites.net/',
  mediasUrl: 'https://wprcihml.azurewebsites.net/',
  apiUrl: 'https://localhost:44391/', simulationSession: 'simulation.session',
  userRegisterSession: 'user.register.session',
  loggedUserSession: 'logged.user.session',
  simulationPriceSession: 'simulation.price.session',
  kmLimitMin: 1000,
  timemin: 18,
  token: 'looopster.token',
  tokenExpires: 'looopster.token.expires',
  talkWithUsUrl: 'https://prod-20.brazilsouth.logic.azure.com:443/workflows/798937830dc84340937b0fbacc639df3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uJfe4ggkGS_UJzYS83BulFQ30RcgfxKge7PfI2PVFM0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
