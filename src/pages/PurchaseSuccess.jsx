import { Link, useLocation } from "react-router-dom";
import "../styles/PurchaseSuccess.css";

function PurchaseSuccess() {

    const { state } = useLocation();

    return (

        <div className="success-container">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h2 className="success-title">
                    Purchase Saved Successfully
                </h2>

                {state && (

                    <div className="success-details">

                        <div className="detail-row">
                            <span>Purchase Id</span>
                            <strong>{state.purchaseId}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Vendor</span>
                            <strong>{state.vendorName}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Amount</span>
                            <strong>₹ {state.purchaseAmount}</strong>
                        </div>

                    </div>

                )}

                <Link
                    to="/purchase-entry"
                    className="new-entry-button"
                >
                    Add Another Purchase
                </Link>

            </div>

        </div>

    );

}

export default PurchaseSuccess;