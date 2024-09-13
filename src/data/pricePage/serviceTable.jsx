// Custom import
// serviceTable
import PriceCard from "../../components/PriceCard";
import { priceTemplate } from "./priceData";
// // Fetching data from Api


// datas that store service plan as static
// when some data have value of 1 , it is a placeholder for
// logo and null for none.
export const serviceRows = [
    {
        name: "",
        three_monthPlan: null,
        six_monthPlan: null,
        twelve_monthPlan: null,
    },
    {
        name: "Create Badge",
        three_monthPlan: 200,
        six_monthPlan: 1000,
        twelve_monthPlan: 2000,
    },
    {
        name: "People",
        three_monthPlan: 100,
        six_monthPlan: 500,
        twelve_monthPlan: 1000,
    },
    {
        name: "Badge Verification",
        three_monthPlan: 1,
        six_monthPlan: 1,
        twelve_monthPlan: 1,
    },
    {
        name: "Authorized issuing roles (admin)",
        three_monthPlan: null,
        six_monthPlan: 1,
        twelve_monthPlan: 1,
    },
    {
        name: "Badge wallet app for earners",
        three_monthPlan: 1,
        six_monthPlan: 1,
        twelve_monthPlan: 1,
    },
    {
        name: "Badge reports",
        three_monthPlan: null,
        six_monthPlan: 1,
        twelve_monthPlan: 1,
    },
    {
        name: "Badge certificates",
        three_monthPlan: 1,
        six_monthPlan: 1,
        twelve_monthPlan: 1,
    },
];
