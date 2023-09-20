import axios from "axios";
import { fetchFailed, fetchStart, fetchSuccess } from "../StateManagement/CurrentUserFetch";
import { router } from "../Router/Router";

let userToken = JSON.parse(localStorage.getItem("token"))

export const getEmployer = (dispatch) => {
    dispatch(fetchStart())
    const uri = `${router}/users/employerDashboard`
    axios.get(uri, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).then((res) => {
        console.log(res);
        dispatch(fetchSuccess(res.data))
    }).catch((err) => {
        console.log(err);
        dispatch(fetchFailed(err))
    })
}

const createRequestInstance =  ()=>{
    const instance = axios.create({
        baseURL: `${router}`
    })
    const intercept = instance.interceptors.request.use(
        config => {
            config.headers['Authorization'] = `Bearer ${userToken}`
            return config
        }, err=> Promise.reject(err)
    )
    return instance
}
export const getUser = (dispatch) => {
    dispatch(fetchStart())
    createRequestInstance().get("/users/userDashboard").then((res)=>{
        console.log(res);
        dispatch(fetchSuccess(res.data))
    }).catch((err)=>{
        console.log(err);
        dispatch(fetchFailed(err))
    })
    // const uri = "http://localhost:5353/users/userDashboard"
    // axios.get(uri, {
    //     headers: {
    //         Authorization: `Bearer ${userToken}`
    //     }
    // }).then((res) => {
    //     console.log(res);
    //     dispatch(fetchSuccess(res.data))
    // }).catch((err) => {
    //     console.log(err);
    //     dispatch(fetchFailed(err))
    // })
}


  
  