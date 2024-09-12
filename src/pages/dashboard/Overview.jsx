
//Custom Import
import CardsList from "./OverviewCard"
import DashboardContainer from "../../components/styles/DashboardContainer";
import Notification from "./Notification";

// ============ Start Overview Seciton ============ 
const Overview = () => {
  
  return (
      <DashboardContainer gap={3}
          sx={{
              display: "flex",
              gap:"24px",
              "@media (max-width:1350px)": {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px"
                
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