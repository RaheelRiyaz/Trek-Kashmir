// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import Swal from 'sweetalert2';
export const environment = {
  production: false,
  baseUrl: 'http://localhost:5118/api/',
  getToken: () => {
    let token =
      sessionStorage.getItem('trek-kashmir-token') !== null
        ? JSON.parse(sessionStorage['trek-kashmir-token'])
        : '';
    return token;
  },
  razorPayKey: 'rzp_test_WG06EHYaAVm50y',
  Toast: Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  }),
  baseImagePath: 'http://localhost:5118/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
