import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Orders = () => {
    return (
        <Layout title={"Your Orders"}>
            <div class="container-fluid m-3 p-3">
                <div className="row">
                    <div class="col-md-3">
                        <UserMenu />
                    </div>
                    <div class="col-md-9">
                        <h1>All Orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Orders;
