import { API_BASE_URL } from "../app-config";
import axios from "axios"

export function call(api, method, request) {
    const option = {
        headers: {
            "Content-Type": "application/json",
        },
        url: API_BASE_URL + api,
        method: method,
        data: request
    }

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        option.headers["Authorization"] = "Bearer " + accessToken;
    }

    return axios(option)
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 403) {
            window.location.href = "/login"
        }
        return Promise.reject(error);
    })
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO).then((response) => {
      if (response.data.token) {
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
        window.location.href = "/";
      }
    });
  }