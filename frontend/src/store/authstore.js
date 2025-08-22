import {create} from "zustand"

const useAuthStore=create((set)=>({
    user:null,
    token:null,

    login:(userdata,token)=> {
        sessionStorage.setItem("auth",JSON.stringify({userdata,token}));
        set({userdata,token});
    }
}))