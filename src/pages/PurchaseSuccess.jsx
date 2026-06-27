import { useLocation, Link } from "react-router-dom";

function PurchaseSuccess() {

    const { state } = useLocation();

    return (

        <div className="max-w-4xl mx-auto mt-10">

            <div className="bg-green-100 border border-green-500 rounded-lg p-8">

                <h1 className="text-3xl font-bold text-green-700 mb-4">

                    {state?.status}

                </h1>

                <p className="text-lg mb-6">

                    {state?.message}

                </p>

                <div className="bg-white rounded-lg shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">

                        Purchase Details

                    </h2>

                    <table className="table-auto w-full">

                        <tbody>

                            <tr>
                                <td className="font-semibold py-2">Vendor</td>
                                <td>{state?.purchase?.vendorName}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-2">Brand</td>
                                <td>{state?.purchase?.brandName}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-2">Quantity</td>
                                <td>{state?.purchase?.quantity}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-2">Purchase Amount</td>
                                <td>{state?.purchase?.purchaseAmount}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-2">Purchase Date</td>
                                <td>{state?.purchase?.purchaseDate}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-2">Status</td>
                                <td>{state?.purchase?.status}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

                <div className="mt-8">

                    <Link
                        to="/purchase-entry"
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Add Another Purchase
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default PurchaseSuccess;