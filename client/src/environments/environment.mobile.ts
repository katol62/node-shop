// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://192.168.1.51:3010/api',
  verification: {
    email: 'ktolochko@gmail.com',
    password: '228ec98cc723515a082697d9ce6f8740',
    apiId: 'FA032C9A-5221-F4D2-F2EA-F77ED6FF5D57'
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
