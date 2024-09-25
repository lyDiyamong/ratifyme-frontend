// // Custom Import
// import blueGraphSvg from "../../assets/images/bluegraph.svg";
// import purpleGraphSvg from "../../assets/images/purplegraph.svg";
// import yellowGraphSvg from "../../assets/images/yellowgraph.svg";
// import blueArrowSvg from "../../assets/icons/bluearrow.svg";
// import purpleArrowSvg from "../../assets/icons/purplearrow.svg";
// import yellowArrowSvg from "../../assets/icons/yellowarrow.svg";

// // This function is working as create card content based on role
// export const createCardContent = (roleId, data, userId) => {
//     switch (roleId) {
//         case 1:
//             return createAdminContent(data);
//         case 2:
//             return createInstitutionContent(data, userId)
//         case 3:
//             return createIssuerContent(data, userId);
//         case 4:
//             return createEarnerContent(data, userId);
//         default:
//             return [];
//     }
// };

// // Admin content
// const createAdminContent = (data) => {
//     const totalInstitutions = data.length;
//     const totalIssuers = data.reduce((total, institution) => total + (institution.Issuers?.length || 0), 0);
//     const totalEarners = data.reduce(
//         (total, institution) =>
//             total +
//             (institution.Issuers?.reduce((issuerTotal, issuer) => issuerTotal + (issuer.Earners?.length || 0), 0) || 0),
//         0,
//     );

//     return [
//         { image: blueGraphSvg, title: "Total Institution", icon: blueArrowSvg, value: totalInstitutions },
//         { image: purpleGraphSvg, title: "Total Issuer", icon: purpleArrowSvg, value: totalIssuers },
//         { image: yellowGraphSvg, title: "Total Earner", icon: yellowArrowSvg, value: totalEarners },
//     ];
// };
// // Institution Owner Content
// const createInstitutionContent = (data, userId) => {
//     // Find the institution that matches the userId
//     const institution = data.find(inst => inst.userId === userId);

//     if (!institution) return []; // Return empty if no institution found for the userId

//     // Count total earners for this institution
//     const totalEarners = institution.Issuers.reduce((total, issuer) => {
//         return total + (issuer.Earners?.length || 0);
//     }, 0);

//     // Count total badges for this institution (from all issuers)
//     const totalBadges = institution.Issuers.reduce((total, issuer) => {
//         return total + (issuer.BadgeClasses?.length || 0);
//     }, 0);

//     // Count total badges earned by earners in this institution
//     const totalEarnerBadges = institution.Issuers.reduce((total, issuer) => {
//         return total + issuer.Earners.reduce((earnerTotal, earner) => {
//             return earnerTotal + (earner.Achievement?.BadgeClass ? 1 : 0);
//         }, 0);
//     }, 0);

//     return [
//         { image: yellowGraphSvg, title: "Total Earners", icon: yellowArrowSvg, value: totalEarners },
//         { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
//         { image: purpleGraphSvg, title: "Total Earner Badges", icon: purpleArrowSvg, value: totalEarnerBadges },
//     ];
// };

// // Issuer content
// const createIssuerContent = (data, userId) => {
//     const institutions = data.filter((institution) => institution.Issuers.some((issuer) => issuer.userId === userId));

//     const totalInstitutions = institutions.length;
//     const totalBadges = institutions.reduce(
//         (total, institution) =>
//             total + (institution.Issuers.find((issuer) => issuer.userId === userId)?.BadgeClasses?.length || 0),
//         0,
//     );
//     const totalIssuerEarners = institutions.reduce(
//         (total, institution) =>
//             total + (institution.Issuers.find((issuer) => issuer.userId === userId)?.Earners?.length || 0),
//         0,
//     );

//     return [
//         { image: yellowGraphSvg, title: "Total Institutions", icon: yellowArrowSvg, value: totalInstitutions },
//         { image: purpleGraphSvg, title: "Total Earners", icon: purpleArrowSvg, value: totalIssuerEarners },
//         { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
//     ];
// };

// // Earner content
// const createEarnerContent = (data, userId) => {
//     const earnerData = [];

//     data.forEach((institution) => {
//         institution.Issuers.forEach((issuer) => {
//             const matchedEarners = issuer.Earners.filter((earner) => earner.userId === userId);
//             earnerData.push(...matchedEarners);
//         });
//     });

//     const totalBadges = earnerData.reduce((count, earner) => {
//         return count + (earner.Achievement?.BadgeClass ? 1 : 0);
//     }, 0);

//     const totalAchievements = earnerData.length;

//     const totalIssuers = new Set(earnerData.map((earner) => earner.issuerId)).size;

//     return [
//         { image: yellowGraphSvg, title: "Total Issuers", icon: yellowArrowSvg, value: totalIssuers },
//         { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
//         { image: purpleGraphSvg, title: "Total Achievements", icon: purpleArrowSvg, value: totalAchievements },
//     ];
// };

// Custom Import
import blueGraphSvg from "../../assets/images/bluegraph.svg";
import purpleGraphSvg from "../../assets/images/purplegraph.svg";
import yellowGraphSvg from "../../assets/images/yellowgraph.svg";
import blueArrowSvg from "../../assets/icons/bluearrow.svg";
import purpleArrowSvg from "../../assets/icons/purplearrow.svg";
import yellowArrowSvg from "../../assets/icons/yellowarrow.svg";

// This function is working as create card content based on role
export const createCardContent = (roleId, data, userId) => {
    switch (roleId) {
        case 1:
            return createAdminContent(data);
        case 2:
            return createInstitutionContent(data, userId);
        case 3:
            return createIssuerContent(data, userId);
        case 4:
            return createEarnerContent(data, userId);
        default:
            return [];
    }
};

// Admin content
const createAdminContent = (data) => {
    const totalInstitutions = data.length;
    const totalIssuers = data.reduce((total, institution) => total + (institution.Issuers?.length || 0), 0);
    const totalEarners = data.reduce(
        (total, institution) =>
            total +
            (institution.Issuers?.reduce((issuerTotal, issuer) => issuerTotal + (issuer.Earners?.length || 0), 0) || 0),
        0,
    );

    return [
        { image: blueGraphSvg, title: "Total Institution", icon: blueArrowSvg, value: totalInstitutions },
        { image: purpleGraphSvg, title: "Total Issuer", icon: purpleArrowSvg, value: totalIssuers },
        { image: yellowGraphSvg, title: "Total Earner", icon: yellowArrowSvg, value: totalEarners },
    ];
};

// Institution Owner Content
const createInstitutionContent = (data, userId) => {
    // Find the institution that matches the userId
    const institution = data.find(inst => inst.userId === userId);

    if (!institution) return []; // Return empty if no institution found for the userId

    // Count total earners for this institution
    const totalEarners = institution.Issuers.reduce((total, issuer) => {
        return total + (issuer.Earners?.length || 0);
    }, 0);

    // Count total badges for this institution (from all issuers)
    const totalBadges = institution.Issuers.reduce((total, issuer) => {
        return total + (issuer.BadgeClasses?.length || 0);
    }, 0);

    // Count total badges earned by earners in this institution
    const totalIssuers = institution.Issuers?.length

    return [
        { image: yellowGraphSvg, title: "Total Earners", icon: yellowArrowSvg, value: totalEarners },
        { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
        { image: purpleGraphSvg, title: "Total Issuers", icon: purpleArrowSvg, value: totalIssuers },
    ];
};

// Issuer content
const createIssuerContent = (data, userId) => {
    const institutions = data.filter((institution) => institution.Issuers.some((issuer) => issuer.userId === userId));

    const totalInstitutions = institutions.length;
    const totalBadges = institutions.reduce(
        (total, institution) =>
            total + (institution.Issuers.find((issuer) => issuer.userId === userId)?.BadgeClasses?.length || 0),
        0,
    );
    const totalIssuerEarners = institutions.reduce(
        (total, institution) =>
            total + (institution.Issuers.find((issuer) => issuer.userId === userId)?.Earners?.length || 0),
        0,
    );

    return [
        { image: yellowGraphSvg, title: "Total Institutions", icon: yellowArrowSvg, value: totalInstitutions },
        { image: purpleGraphSvg, title: "Total Earners", icon: purpleArrowSvg, value: totalIssuerEarners },
        { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
    ];
};

// Earner content
const createEarnerContent = (data, userId) => {
    const earnerData = [];

    data.forEach((institution) => {
        institution.Issuers.forEach((issuer) => {
            const matchedEarners = issuer.Earners.filter((earner) => earner.userId === userId);
            earnerData.push(...matchedEarners);
        });
    });

    const totalBadges = earnerData.reduce((count, earner) => {
        return count + (earner.Achievement?.BadgeClass ? 1 : 0);
    }, 0);

    const totalAchievements = earnerData.length;

    const totalIssuers = new Set(earnerData.map((earner) => earner.issuerId)).size;

    return [
        { image: yellowGraphSvg, title: "Total Issuers", icon: yellowArrowSvg, value: totalIssuers },
        { image: blueGraphSvg, title: "Total Badges", icon: blueGraphSvg, value: totalBadges },
        { image: purpleGraphSvg, title: "Total Achievements", icon: purpleArrowSvg, value: totalAchievements },
    ];
};
