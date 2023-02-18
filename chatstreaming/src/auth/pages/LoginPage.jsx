import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({email:loginEmail, password:loginPassword});
    }

    return (
        <div className="container login-container">
            <div className="d-flex justify-content-center flex-column login-form-1">
                <img src="../../public/logoKet.jpg" alt=""/>
                <h3>Ingreso</h3>
                <form onSubmit={ loginSubmit }>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="loginEmail"
                            value={ loginEmail }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="loginPassword"
                            value={ loginPassword }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
                <span>¿No te encuentras registrado? <a href="">Registrarse</a></span>
            </div>
        </div>
    )
}