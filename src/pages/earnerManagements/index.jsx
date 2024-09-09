import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const EarnerManagement = () => {
    return <div>
        <Link to="/management/eaners/add-recipient">
            <Button>
            Add Recipient
            </Button>
        </Link>
    </div>;
};

export default EarnerManagement;
