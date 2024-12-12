import { Outlet, Link } from "react-router-dom";
import '../css/styles.css';

const Layout = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand" href="#page-top">Miesto Renginiai</a>
                    <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
                        aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/adminusers">Vartotojai</Link></li>
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/events">Renginiai</Link></li>
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/login">Login</Link></li>
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/register">Register</Link></li>
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/logout">Logout</Link></li>
                    
                        </ul>
                    </div>
                </div>
            </nav>
            <header class="masthead  text-white text-center">
            </header>
            <main className="flex-grow-1">
                <Outlet />
            </main>

            <footer className="bg-dark text-white text-center py-4 mt-auto">
                <div className="container">
                    <small>Copyright &copy; Miesto renginiai</small>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
