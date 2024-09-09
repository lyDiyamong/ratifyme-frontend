// React Library import
import React from "react";

// Custom import
import DataTable from "../../components/DataTable";
import {listDB} from "./../../data/earnerData.js"
import DashboardConatiner from "./../../components/styles/DashboardContainer.jsx"

const EarnerManagement = () => {

    return (
        <DashboardConatiner>
            <DataTable title="Earner List" config={listDB} />
        </DashboardConatiner>
    );
};

export default EarnerManagement;