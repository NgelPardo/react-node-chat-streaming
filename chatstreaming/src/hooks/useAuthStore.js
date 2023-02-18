import { useDispatch, useSelector } from 'react-redux'
import { chatApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch(); 

    const startLogin = async ({ email, password}) => {
        dispatch( onChecking()); 
        try {
            const { data } = await chatApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({username: data.username, uid: data.uid}) );
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10)
        }
    }


    const checkAuthToken = async( ) => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await chatApi.get('http://localhost:4000/api/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({username: data.username, uid: data.uid}) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        errorMessage,
        status,
        user,
        checkAuthToken,
        startLogin,
        startLogout,

    }

}