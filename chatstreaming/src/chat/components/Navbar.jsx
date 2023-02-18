import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white mb-4 px-4">
            <span className="navbar-brand">
                <img src="../../public/logoKuepa.jpg" alt="" className="logo-kuepa"/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span>{ user.username }</span>
            </span>

            <button className="btn btn-outline-danger" onClick={ startLogout }>
                <i className="fas fa-sign-out-alt"></i>
                <span >Salir</span>
            </button>
        </div>
    )
}