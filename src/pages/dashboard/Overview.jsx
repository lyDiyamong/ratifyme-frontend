
//Custom Import
import CardsList from "./OverviewCard"
import DashboardContainer from "../../components/styles/DashboardContainer";
import Notification from "./Notification";

// ============ Start Overview Seciton ============ 
const Overview = () => {
  
  return (
      <DashboardContainer 
          sx={{
              display: "flex",
              gap: "32px",
              pt: "8px",
              "@media (max-width:1350px)": {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                 
              },
          }}
      >
          <CardsList />
          <Notification />
      </DashboardContainer>
  );
};
  
export default Overview;
// ============ End Overview Seciton ============ 