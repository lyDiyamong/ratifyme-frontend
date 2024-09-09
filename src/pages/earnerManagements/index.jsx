// React Library import
import React from "react";

// Custom import
import DataTable from "../../components/DataTable";
import {listDB} from "./../../data/earnerData.js"

console.log(listDB);

const EarnerManagement = () => {

    return (
        <div>
            <DataTable title={"Earner List"} config={listDB} />
        </div>
    );
};

export default EarnerManagement;