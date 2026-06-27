import { useEffect, useState } from "react";
import { getVendors, getPurchaseReport } from "../api/api";

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
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold text-center mb-8">
                Vendor Wise Purchase Report
            </h1>

            <div className="bg-white shadow rounded-lg p-6">

                <div className="grid md:grid-cols-4 gap-4">

                    <div>
                        <label className="block mb-2 font-semibold">
                            Vendor
                        </label>

                        <select
                            name="vendorName"
                            value={form.vendorName}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
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

                    <div>

                        <label className="block mb-2 font-semibold">
                            From Date
                        </label>

                        <input
                            type="date"
                            name="fromDate"
                            value={form.fromDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">
                            To Date
                        </label>

                        <input
                            type="date"
                            name="toDate"
                            value={form.toDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                    </div>

                    <div className="flex items-end">

                        <button
                            onClick={searchReport}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
                        >
                            Search
                        </button>

                    </div>

                </div>

                {loading && (
                    <div className="text-center mt-6 text-blue-600 font-semibold">
                        Loading...
                    </div>
                )}

                {!loading && report.length > 0 && (

                    <div className="overflow-x-auto mt-8">

                        <table className="min-w-full border border-gray-300">

                            <thead className="bg-gray-200">

                                <tr>

                                    <th className="border px-3 py-2">Purchase Id</th>

                                    <th className="border px-3 py-2">Transaction Id</th>

                                    <th className="border px-3 py-2">Vendor</th>

                                    <th className="border px-3 py-2">Category</th>

                                    <th className="border px-3 py-2">Material Type</th>

                                    <th className="border px-3 py-2">Brand</th>

                                    <th className="border px-3 py-2">Unit</th>

                                    <th className="border px-3 py-2">Quantity</th>
                                    <th className="border px-3 py-2">Purchase Amount</th>

                                    <th className="border px-3 py-2">Purchase Date</th>

                                    <th className="border px-3 py-2">Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {report.map((purchase, index) => (

                                    <tr
                                        key={index}
                                        className="text-center hover:bg-gray-100"
                                    >

                                        <td className="border px-3 py-2">
                                            {purchase.purchaseId}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.transactionId}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.vendorName}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.materialCategoryName}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.materialTypeName}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.brandName}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.materialUnitName}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.quantity}
                                        </td>

                                        <td className="border px-3 py-2">
                                            ₹ {purchase.purchaseAmount}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.purchaseDate}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {purchase.status}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

                {!loading && report.length === 0 && (

                    <div className="text-center mt-8 text-gray-500">

                        No Purchase Records Found

                    </div>

                )}

            </div>

        </div>

    );

};

export default VendorReport;