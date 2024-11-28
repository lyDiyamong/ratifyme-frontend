import { useLocation, useNavigate } from "react-router-dom";

function useRefresh() {
    const navigate = useNavigate();
    const location = useLocation();

    const refresh = (options = {}) => {
        console.log("Refreshing to path:", location.pathname);
        // Default to replace: true, but allow customization
        navigate(location.pathname, { replace: true, ...options });
    };

    return refresh;
};

export default useRefresh;
