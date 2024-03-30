import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard - Ecommerce App"}>
            <div class="container-fluid m-3 p-3">
                <div className="row">
                    <div class="col-md-3">
                        <UserMenu />
                    </div>
                    <div class="col-md-9">
                        <div class="card w-75 p-3">
                            <h3>{auth?.user?.name}</h3>
                            <h3>{auth?.user?.email}</h3>
                            <h3>{auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Dashboard;
