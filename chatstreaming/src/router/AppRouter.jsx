import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { SignUpPage } from "../auth/pages/SignUpPage";
import { ChatPage } from "../chat";
import { useAuthStore } from "../hooks";



export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    
    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return(
            <h4>Cargando...</h4>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                ? (
                    <>
                      <Route path="/auth/*" element={ <LoginPage/> }/> 
                      <Route path="/*" element={ <Navigate to={"/auth/login"}/> }/>
                    </>
                )
                : (
                    <>
                        <Route path="/" element={ <ChatPage/> }/> 
                        <Route path="/*" element={ <Navigate to="/"/> }/>
                    </>
                )
            }
            
        </Routes>
    )
}