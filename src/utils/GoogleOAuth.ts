const { OAuth2Client } = require('google-auth-library');
import axios, { AxiosResponse } from 'axios';

// const client = new OAuth2Client(
// "654526343199-bfph84dau6diaibff3k0cb3i6u3flvpv.apps.googleusercontent.com",
// "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",
//   /**
//    * To get access_token and refresh_token in server side,
//    * the data for redirect_uri should be postmessage.
//    * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
//    */
//   'postmessage'
// );
// export default class GoogleOAuth {
//   async getProfileInfo (code) {
//     const USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/userinfo';
  
//     const headers = {
//       Authorization: `Bearer ${code}`,
//     };
  
//     try {
//       const response = await axios.get(USER_INFO_ENDPOINT, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error:', error.response?.status, error.response?.data);
//       throw new Error('Failed to fetch user information');
//     }
//   };
// }