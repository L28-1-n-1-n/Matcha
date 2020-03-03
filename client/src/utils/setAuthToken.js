// import axios from 'axios';

// // add global header
// const setAuthToken = token => {
//   if (token) {
//     // if token present in local storage, then set global header 'x-auth-token' to the token that is passed in
//     axios.defaults.headers.common['x-auth-token'] = token;
//   } else {
//     // if not token, delete it
//     delete axios.defaults.headers.common['x-auth-token'];
//   }
// };

// // Instead of chossing which request to send the token, the token is sent with every request
// export default setAuthToken;
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
