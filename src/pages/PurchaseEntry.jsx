import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getVendors,
    getCategories,
    getUnitAndTypeList,
    addPurchase,
} from "../api/api";

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
        <div className="max-w-5xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">

            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Purchase Entry
            </h2>

            <form
                onSubmit={submitPurchase}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

                {/* Vendor */}

                <div>
                    <label className="block font-semibold mb-2">
                        Vendor
                    </label>

                    <select
                        name="vendorName"
                        value={purchase.vendorName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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

                {/* Category */}

                <div>

                    <label className="block font-semibold mb-2">
                        Material Category
                    </label>

                    <select
                        value={purchase.materialCategoryId}
                        onChange={handleCategoryChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select Category
                        </option>

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

                {/* Material Type */}

                <div>

                    <label className="block font-semibold mb-2">
                        Material Type
                    </label>

                    <select
                        name="materialTypeId"
                        value={purchase.materialTypeId}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select Material Type
                        </option>

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

                {/* Unit */}

                <div>

                    <label className="block font-semibold mb-2">
                        Unit
                    </label>

                    <select
                        name="unitId"
                        value={purchase.unitId}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select Unit
                        </option>

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

                {/* Brand */}

                <div>

                    <label className="block font-semibold mb-2">
                        Brand Name
                    </label>

                    <input
                        type="text"
                        name="brandName"
                        value={purchase.brandName}
                        onChange={handleChange}
                        placeholder="Enter Brand Name"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Quantity */}

                <div>

                    <label className="block font-semibold mb-2">
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        value={purchase.quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Purchase Amount */}

                <div>

                    <label className="block font-semibold mb-2">
                        Purchase Amount
                    </label>

                    <input
                        type="number"
                        name="purchaseAmount"
                        value={purchase.purchaseAmount}
                        onChange={handleChange}
                        placeholder="Enter Purchase Amount"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Purchase Date */}

                <div>

                    <label className="block font-semibold mb-2">
                        Purchase Date
                    </label>

                    <input
                        type="date"
                        name="purchaseDate"
                        value={purchase.purchaseDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="md:col-span-2 flex justify-center mt-6">

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold"
                    >

                        {loading ? "Saving..." : "Save Purchase"}

                    </button>

                </div>

            </form>

        </div>
    );
}

export default PurchaseEntry;