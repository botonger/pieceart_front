import axios from 'axios';

//redux, recoil, firebase
const axiosCommon = axios.create({
    baseURL: 'https://54.164.147.51:8090/api/',
    // baseURL: process.env.REACT_APP_URL + '/api/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        // Authorization: 'Bearer ' + AuthService.getHeader(),
    },
});

// axiosCommon.interceptors.request.use(config => {
//     config.headers['Authorization'] = JSON.parse(localStorage.getItem('t'));
// });

axiosCommon.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            alert('로그인 페이지로 이동합니다');
            return window.location.assign('/login');
        }
        return Promise.reject(error);
    },
);
export default axiosCommon;
