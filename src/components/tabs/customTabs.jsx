import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

const CustomTabs = ({ tabs, tabContent, searchQuery }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="custom management tabs"
                    sx={{
                        "& .MuiTab-root": {
                            minHeight: "48px",
                            padding: "12px 16px",
                            transition: "color 0.3s ease",
                        },
                        "& .Mui-selected": {
                            color: "primary.main",
                        },
                        "& .MuiTab-root:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "8px",
                        },
                        "& .MuiTabs-indicator": {
                            height: "3px",
                            borderRadius: "2px",
                        },
                    }}
                >
                    {tabs.map((tabLabel, index) => (
                        <Tab key={index} label={tabLabel} sx={{ textTransform: "none", fontSize: "16px" }} />
                    ))}
                </Tabs>
            </Box>

            <Box mt={3}>
                {tabContent.map((ContentComponent, index) => (
                    <Box key={index} sx={{ display: tabIndex === index ? "block" : "none" }}>
                        <ContentComponent searchQuery={searchQuery} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CustomTabs;
