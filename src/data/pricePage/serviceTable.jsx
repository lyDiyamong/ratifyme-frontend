// Custom import
// serviceTable
import PriceCard from "../../components/PriceCard";
import { priceTemplate } from "./priceData";

// function that render each price card for each plan
const renderPriceCard = priceTemplate.map((item, index) => {
    return <PriceCard key={index} item={item} />;
});

// datas that store service plan as static
// when some data have value of 1 , it is a placeholder for
// logo and null for none.
export const serviceRows = [
    {
        name: "",
        three_monthPlan: renderPriceCard[0],
        six_monthPlan: renderPriceCard[1],
        twelve_monthPlan: renderPriceCard[2],
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
