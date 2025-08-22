import { axiosInstance } from "./axios";

export async function signUp(signupData) {
    const response = await axiosInstance.post("/auth/signup", signupData)
    return response.data;
}

export async function  Login(loginData) {
    const response = await axiosInstance.post("/auth/login",loginData)
    return response.data;
}


export async function Logout() {
  const response = await axiosInstance.post("/auth/logout")
  return response.data;
}