/*
ng serve -- > dev env
ng build --> prod env
The serve target is set up to use the development configuration by default,
 while the build target uses the production configuration by default.
*/


export const environment = {
    production: true,
    baseURL: 'http://3.7.86.87/api',     //apiUrl: 'https://api.example.com', // Production API URL
    socketURL: 'http://3.7.86.87'    
  };
