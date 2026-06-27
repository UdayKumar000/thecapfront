import { useEffect, useState } from "react";
import { getVendors, getPurchaseReport } from "../api/api";
import "../styles/VendorReport.css";

const VendorReport = () => {
    const [vendors, setVendors] = useState([]);
    const [report, setReport] = useState([]);

    const [form, setForm] = useState({
        vendorName: "",
        fromDate: "",
        toDate: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadVendors();
    }, []);

    const loadVendors = async () => {
        try {
            const response = await getVendors();
            setVendors(response.data || []);
        } catch (error) {
            console.error(error);
            alert("Unable to load vendors");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const searchReport = async () => {

        if (!form.vendorName) {
            alert("Please select Vendor");
            return;
        }

        if (!form.fromDate) {
            alert("Please select From Date");
            return;
        }

        if (!form.toDate) {
            alert("Please select To Date");
            return;
        }

        try {

            setLoading(true);

            const response = await getPurchaseReport(form);

            setReport(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to fetch report");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="report-container">

            <h1 className="report-title">
                Vendor Wise Purchase Report
            </h1>

            <div className="report-card">

                <div className="report-form">

                    <div className="form-group">

                        <label>Vendor</label>

                        <select
                            name="vendorName"
                            value={form.vendorName}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Vendor
                            </option>

                            {vendors.map((vendor) => (
                                <option
                                    key={vendor.vendorId}
                                    value={vendor.vendorName}
                                >
                                    {vendor.vendorName}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>From Date</label>

                        <input
                            type="date"
                            name="fromDate"
                            value={form.fromDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>To Date</label>

                        <input
                            type="date"
                            name="toDate"
                            value={form.toDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="button-group">

                        <button
                            onClick={searchReport}
                            className="search-button"
                        >
                            Search
                        </button>

                    </div>

                </div>

                {loading && (
                    <div className="loading">
                        Loading...
                    </div>
                )}

                {!loading && report.length > 0 && (

                    <div className="table-wrapper">

                        <table className="report-table">

                            <thead>

                                <tr>

                                    <th>Purchase Id</th>
                                    <th>Transaction Id</th>
                                    <th>Vendor</th>
                                    <th>Category</th>
                                    <th>Material Type</th>
                                    <th>Brand</th>
                                    <th>Unit</th>
                                    <th>Quantity</th>
                                    <th>Purchase Amount</th>
                                    <th>Purchase Date</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {report.map((purchase, index) => (

                                    <tr key={index}>

                                        <td>{purchase.purchaseId}</td>
                                        <td>{purchase.transactionId}</td>
                                        <td>{purchase.vendorName}</td>
                                        <td>{purchase.materialCategoryName}</td>
                                        <td>{purchase.materialTypeName}</td>
                                        <td>{purchase.brandName}</td>
                                        <td>{purchase.materialUnitName}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>₹ {purchase.purchaseAmount}</td>
                                        <td>{purchase.purchaseDate}</td>
                                        <td>{purchase.status}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

                {!loading && report.length === 0 && (

                    <div className="no-records">
                        No Purchase Records Found
                    </div>

                )}

            </div>

        </div>

    );

};

export default VendorReport;