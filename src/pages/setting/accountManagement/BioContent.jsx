//React Import 
import  { useState } from 'react';
//Mui Import 
import { TextField, Box, Typography } from "@mui/material";
//Custom Import
import theme from "../../../assets/themes";


//============ Start Bio input Editable Field Component ============
const BioContent = () => {
    
    const [value, setValue] = useState("Share more about yourself");
    const [isEditing, setIsEditing] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    const handleTextClick = () => {
        setIsEditing(true);
    };

    return (
        <Box>
            <Box
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "20px", sm: "24px" },
                    bgcolor: theme.palette.customColors.white,
                }}>

                {/* Title */}
                <Typography
                    sx={{
                        mb: { xss: "20px", sm: "24px" },
                        fontSize: theme.typography.h5,
                        fontWeight: theme.fontWeight.semiBold,
                    }}
                >
                    Bio Summary
                </Typography>
                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        p: { xss: "12px", sm: "24px" },
                        borderRadius: 1,
                        border: "1px solid #ccc",
                    }}
                >
                    {isEditing ? (
                        <TextField
                            onClick={handleTextClick}
                            style={{ cursor: "pointer" }}
                            width={"100%"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            variant="outlined"
                            autoFocus
                            sx={{ color: theme.palette.text.disabled }}
                        />
                    ) : (
                        <span
                            onClick={handleTextClick}
                            style={{
                                cursor: "pointer",
                                color:
                                    value === "Share more about yourself"
                                        ? theme.palette.text.disabled
                                        : theme.palette.text.primary,
                            }}
                        >
                            {value}
                        </span>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
//============ End Bio input Editable Field Component ============
export default BioContent;