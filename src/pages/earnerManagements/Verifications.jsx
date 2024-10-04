//React Library
import { useState } from "react";

//MUI Import
import { Button } from "@mui/material";

//Custom import
import VerificationModal from "../../components/VerificationModals";

//=========== Start VerifyCheckUp ===========
const VerificationCheckUp = () => {
    const [open, setOpen] = useState(false);
    const [isGray, setIsGray] = useState(false);

    //id TEST
    const verificationId = 123;

    //Handle open modal
    const handleOpen = () => {
        setOpen(true);
        setIsGray(false);
    };

    //handle Close modal
    const handleClose = () => {
        setOpen(false);
        setIsGray(true);
    };
    
    return (
        <div>
            <Button variant="contained" color={isGray ? "grey" : "primary"} onClick={handleOpen} sx={{ mb: 1 }}>
                Open Verification Modal
            </Button>

            <VerificationModal open={open} handleClose={handleClose} verificationId={verificationId} />
        </div>
    );
};

export default VerificationCheckUp;
//=========== End VerifyCheckUp ===========
