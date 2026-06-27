import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <h1 className="text-xl font-bold">
                    Purchase Management System
                </h1>

                <div className="flex gap-6">

                    <Link
                        to="/"
                        className="hover:text-yellow-300"
                    >
                        Home
                    </Link>

                    <Link
                        to="/purchase-entry"
                        className="hover:text-yellow-300"
                    >
                        Purchase Entry
                    </Link>

                    <Link
                        to="/vendor-report"
                        className="hover:text-yellow-300"
                    >
                        Vendor Report
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;