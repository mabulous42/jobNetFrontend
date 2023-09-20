import axios from "axios";
import { fetchFailed, fetchStart, fetchSuccess } from "../StateManagement/CurrentUserFetch";
import { router } from "../Router/Router";
import retrieveUserToken from "./RetrieveUserToken";

let userToken = JSON.parse(localStorage.getItem("token"))

// export const getEmployer = (dispatch) => {
//     dispatch(fetchStart())
//     const uri = `${router}/users/employerDashboard`
//     axios.get(uri, {
//         headers: {
//             Authorization: `Bearer ${userToken}`
//         }
//     }).then((res) => {
//         console.log(res);
//         dispatch(fetchSuccess(res.data))
//     }).catch((err) => {
//         console.log(err);
//         dispatch(fetchFailed(err))
//     })
// }

export const getEmployer = (dispatch) => {
    dispatch(fetchStart());
  
    // Asynchronously retrieve the user token
    retrieveUserToken()
      .then((userToken) => {
        if (userToken) {
          const uri = `${router}/users/employerDashboard`;
          axios
            .get(uri, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((res) => {
              console.log(res);
              dispatch(fetchSuccess(res.data));
            })
            .catch((err) => {
              console.log(err);
              dispatch(fetchFailed(err));
            });
        } else {
          const defaultData = {}; // Provide default data for unauthenticated users
          dispatch(fetchSuccess(defaultData));
        }
      })
      .catch((error) => {
        console.error("Error retrieving user token:", error);
        dispatch(fetchFailed(error));
      });
  };

  export const getUser = (dispatch) => {
    dispatch(fetchStart());
  
    // Asynchronously retrieve the user token
    retrieveUserToken()
      .then((userToken) => {
        if (userToken) {
          const uri = `${router}/users/userDashboard`;
          axios
            .get(uri, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((res) => {
              console.log(res);
              dispatch(fetchSuccess(res.data));
            })
            .catch((err) => {
              console.log(err);
              dispatch(fetchFailed(err));
            });
        } else {
          const defaultData = {}; // Provide default data for unauthenticated users
          dispatch(fetchSuccess(defaultData));
        }
      })
      .catch((error) => {
        console.error("Error retrieving user token:", error);
        dispatch(fetchFailed(error));
      });
  };
  
  

// const createRequestInstance =  ()=>{
//     const instance = axios.create({
//         baseURL: `${router}`
//     })
//     const intercept = instance.interceptors.request.use(
//         config => {
//             config.headers['Authorization'] = `Bearer ${userToken}`
//             return config
//         }, err=> Promise.reject(err)
//     )
//     return instance
// }

// export const getUser = (dispatch) => {
//     dispatch(fetchStart())
//     createRequestInstance().get("/users/userDashboard").then((res)=>{
//         console.log(res);
//         dispatch(fetchSuccess(res.data))
//     }).catch((err)=>{
//         console.log(err);
//         dispatch(fetchFailed(err))
//     })
//     // const uri = "http://localhost:5353/users/userDashboard"
//     // axios.get(uri, {
//     //     headers: {
//     //         Authorization: `Bearer ${userToken}`
//     //     }
//     // }).then((res) => {
//     //     console.log(res);
//     //     dispatch(fetchSuccess(res.data))
//     // }).catch((err) => {
//     //     console.log(err);
//     //     dispatch(fetchFailed(err))
//     // })
// }


  
  