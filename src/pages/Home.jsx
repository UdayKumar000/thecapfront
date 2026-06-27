import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home">

            <div className="home-card">

                <h1 className="home-title">
                    Purchase Management System
                </h1>

                <p className="home-description">
                    Welcome to the Purchase Management System.
                    Use the options below to create purchase entries
                    or view vendor reports.
                </p>

                <div className="home-buttons">

                    <Link
                        to="/purchase-entry"
                        className="primary-button"
                    >
                        Purchase Entry
                    </Link>

                    <Link
                        to="/vendor-report"
                        className="secondary-button"
                    >
                        Vendor Report
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Home;