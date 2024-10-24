// MUI import
import { Box, Skeleton } from "@mui/material";

/**
 *
 *
 * @param {Number}  num : number of skeleton
 * @return {JSX.Element} The rendered SkeletonLoading component.
 */

// =========== Start SkeletonLoading ===========
const SkeletonLoading = ({ num = 3 }) => {
    return (
        <>
            {Array(num)
                .fill(1)
                .map((val, index) => (
                    <Skeleton key={index} height={50} />
                ))}
        </>
    );
};

export default SkeletonLoading;
// =========== End SkeletonLoading ===========