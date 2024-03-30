import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Profile = () => {
    return (
        <Layout title={"Your Profile"}>
            <div class="container-fluid m-3 p-3">
                <div className="row">
                    <div class="col-md-3">
                        <UserMenu />
                    </div>
                    <div class="col-md-9">
                        <h1>Your Profile</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Profile;
