import {create} from "zustand";
import { toast } from "react-toastify";
import  axiosInstance from "../lib/axios"
import "react-toastify/dist/ReactToastify.css";


const userAuthStore = create((set)=> ({
    authUser:null,
    isSigningUp :false,
    isLoggingIn :false,
    isCheckingAuth :true,


    checkAuth : async ()=>{
        try{
        const res = await axiosInstance.get("/auth/check",{ withCredentials: true });
        set({ authUser: res.data});
        }catch(error){
            console.log("Error in checkAuth: ",error.message);
            set({ authUser:null });
        }finally{
            set({ isCheckingAuth:false});

        }
    },
    signup : async(data)=>{
        set({ isSigningUp:true })
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account Created Successfuly");

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({ isSigningUp : false});
        }

    },
    login : async(data)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({ authUser:res.data})
            toast.success("Login successfull")

        }catch(error){
            toast.error(error.response.data.message);

        }finally{
            set({isLoggingIn:false});
        }
    },
    logout : async()=>{
        try{
        await axiosInstance.post("/auth/logout");
        set({ authUser:null});
        toast.success("Logged Out successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }

    },
    
    
    
    
    }));
    
    export default userAuthStore;



