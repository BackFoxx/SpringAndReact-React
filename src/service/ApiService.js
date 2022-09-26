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
        return response.data;
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
      if (response.token) {
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        localStorage.setItem("ACCESS_TOKEN", response.token);
        window.location.href = "/";
      }
    });
  }

  export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
  }

  export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
  }