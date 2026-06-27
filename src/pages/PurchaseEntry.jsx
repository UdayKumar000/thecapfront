import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getVendors,
    getCategories,
    getUnitAndTypeList,
    addPurchase,
} from "../api/api";

import "../styles/PurchaseEntry.css";

function PurchaseEntry() {

    const navigate = useNavigate();

    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [materialTypes, setMaterialTypes] = useState([]);

    const [loading, setLoading] = useState(false);

    const [purchase, setPurchase] = useState({
        vendorName: "",
        materialCategoryId: "",
        materialTypeId: "",
        brandName: "",
        unitId: "",
        quantity: "",
        purchaseAmount: "",
        purchaseDate: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const vendorResponse = await getVendors();
            const categoryResponse = await getCategories();

            setVendors(vendorResponse.data);
            setCategories(categoryResponse.data);
        } catch (error) {
            console.log(error);
            alert("Unable to load initial data");
        }
    };

    const handleChange = (e) => {
        setPurchase({
            ...purchase,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = async (e) => {

        const categoryId = e.target.value;

        setPurchase({
            ...purchase,
            materialCategoryId: categoryId,
            materialTypeId: "",
            unitId: "",
        });

        try {

            const response = await getUnitAndTypeList(categoryId);

            setUnits(response.data.unitList);
            setMaterialTypes(response.data.materialTypeList);

        } catch (error) {

            console.log(error);
            alert("Unable to load Units and Material Types");

        }

    };

    const validate = () => {

        if (purchase.vendorName === "") {
            alert("Please select Vendor");
            return false;
        }

        if (purchase.materialCategoryId === "") {
            alert("Please select Material Category");
            return false;
        }

        if (purchase.materialTypeId === "") {
            alert("Please select Material Type");
            return false;
        }

        if (purchase.brandName.trim() === "") {
            alert("Please enter Brand Name");
            return false;
        }

        if (purchase.unitId === "") {
            alert("Please select Unit");
            return false;
        }

        if (purchase.quantity === "") {
            alert("Please enter Quantity");
            return false;
        }

        if (purchase.purchaseAmount === "") {
            alert("Please enter Purchase Amount");
            return false;
        }

        if (purchase.purchaseDate === "") {
            alert("Please select Purchase Date");
            return false;
        }

        return true;
    };

    const submitPurchase = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            const response = await addPurchase(purchase);

            alert(response.data.message);

            navigate("/purchase-success", {
                state: response.data,
            });

        } catch (error) {

            console.log(error);
            alert("Purchase Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="purchase-container">

            <h2 className="purchase-title">
                Purchase Entry
            </h2>

            <form
                onSubmit={submitPurchase}
                className="purchase-form"
            >

                <div className="form-group">
                    <label>Vendor</label>

                    <select
                        name="vendorName"
                        value={purchase.vendorName}
                        onChange={handleChange}
                    >
                        <option value="">Select Vendor</option>

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
                    <label>Material Category</label>

                    <select
                        value={purchase.materialCategoryId}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                            <option
                                key={category.materialCategoryId}
                                value={category.materialCategoryId}
                            >
                                {category.materialCategoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Material Type</label>

                    <select
                        name="materialTypeId"
                        value={purchase.materialTypeId}
                        onChange={handleChange}
                    >
                        <option value="">Select Material Type</option>

                        {materialTypes.map((type) => (
                            <option
                                key={type.materialTypeId}
                                value={type.materialTypeId}
                            >
                                {type.materialTypeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Unit</label>

                    <select
                        name="unitId"
                        value={purchase.unitId}
                        onChange={handleChange}
                    >
                        <option value="">Select Unit</option>

                        {units.map((unit) => (
                            <option
                                key={unit.unitId}
                                value={unit.unitId}
                            >
                                {unit.unitName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Brand Name</label>

                    <input
                        type="text"
                        name="brandName"
                        value={purchase.brandName}
                        onChange={handleChange}
                        placeholder="Enter Brand Name"
                    />
                </div>

                <div className="form-group">
                    <label>Quantity</label>

                    <input
                        type="number"
                        name="quantity"
                        value={purchase.quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                    />
                </div>

                <div className="form-group">
                    <label>Purchase Amount</label>

                    <input
                        type="number"
                        name="purchaseAmount"
                        value={purchase.purchaseAmount}
                        onChange={handleChange}
                        placeholder="Enter Purchase Amount"
                    />
                </div>

                <div className="form-group">
                    <label>Purchase Date</label>

                    <input
                        type="date"
                        name="purchaseDate"
                        value={purchase.purchaseDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="submit-section">

                    <button
                        type="submit"
                        disabled={loading}
                        className="save-button"
                    >
                        {loading ? "Saving..." : "Save Purchase"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default PurchaseEntry;