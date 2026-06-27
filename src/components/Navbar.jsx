import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <h1 className="navbar-title">
                    Purchase Management System
                </h1>

                <div className="navbar-links">

                    <Link
                        to="/"
                        className="navbar-link"
                    >
                        Home
                    </Link>

                    <Link
                        to="/purchase-entry"
                        className="navbar-link"
                    >
                        Purchase Entry
                    </Link>

                    <Link
                        to="/vendor-report"
                        className="navbar-link"
                    >
                        Vendor Report
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;