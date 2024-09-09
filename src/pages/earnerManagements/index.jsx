// React Library import
import React from "react";

// Custom import
import DataTable from "../../components/DataTable";

// <!-- ============ Start Config Data for DataTable ============ -->
// Define data and columns as part of a lisdDB object
const listDB = {
    data: [
        {   Id:         1,
            Name:       "Srey Pov",
            img:        "",
            Email:      "sreypov@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         2,
            Name:       "Rotha",
            img:        "",
            Email:      "rotha@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete"
        },
        {   Id:         3,
            Name:       "Phok KeomonnyRatanak",
            img:        "",
            Email:      "ratanak@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         4,
            Name:       "Ya Mong",
            img:        "",
            Email:      "yamong@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         5,
            Name:       "Malen",
            img:        "",
            Email:      "malen@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         6,
            Name:       "lyhour",
            img:        "",
            Email:      "lyhour@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         7,
            Name:       "bongthong",
            img:        "",
            Email:      "bongthong@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
        {   Id:         8,
            Name:       "chhunan",
            img:        "",
            Email:      "chhunan@mail.com",
            Badge:      "Fullstack",
            DOB:        "01/01/01",
            Position:   "Student",
            Action:     "View/Delete",
        },
    ],
    columns: [
        {   name:       "ID"},
        {   name:       "Name" },
        {   name:        "Image"},
        {   name:       "Email" },
        {   name:       "Badge" },
        {   name:       "Date of Birth" },
        {   name:       "Position" },
        {   name:       "Action" },
    ]
};
// <!-- ============ End Config Data for DataTable ============ -->

const EarnerManagement = () => {

    return (
        <div>
            <DataTable title={"Earner List"} config={listDB} />
        </div>
    );
};

export default EarnerManagement;
