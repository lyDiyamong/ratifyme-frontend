// Custom import
import blueGraphSvg from "../../assets/images/bluegraph.svg";
import purpleGraphSvg from "../../assets/images/purplegraph.svg";
import yellowGraphSvg from "../../assets/images/yellowgraph.svg";
import blueArrowSvg from "../../assets/icons/bluearrow.svg";
import purpleArrowSvg from "../../assets/icons/purplearrow.svg";
import yellowArrowSvg from "../../assets/icons/yellowarrow.svg";

// This function is working as create card content based on role
export const createCardContent = (roleId, data, userId, badge) => {
    switch (roleId) {
        case 1:
            return createAdminContent(data);
        case 2:
            return createInstitutionContent(data, userId);
        case 3:
            return createIssuerContent(data, userId);
        case 4:
            return createEarnerContent(data, userId, badge);
        default:
            return [];
    }
};

// Admin content
const createAdminContent = (data) => {
    const totalInstitutions = data?.length || 0;
    const totalIssuers = data?.reduce((total, institution) => total + (institution.Issuers?.length || 0), 0);
    const totalEarners = data?.reduce(
        (total, institution) =>
            total + (institution.Issuers?.reduce((issuerTotal, issuer) => issuerTotal + (issuer.Earners?.length || 0), 0) || 0),
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
    const institution = data?.find((inst) => inst.userId === userId);
    if (!institution) return []; // No institution found for the userId

    const totalEarners = institution.Issuers?.reduce((total, issuer) => total + (issuer.Earners?.length || 0), 0) || 0;
    const totalBadges = institution.Issuers?.reduce((total, issuer) => total + (issuer.BadgeClasses?.length || 0), 0) || 0;
    const totalIssuers = institution.Issuers?.length || 0;

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
        (total, institution) => total + (institution.Issuers.find((issuer) => issuer.userId === userId)?.Earners?.length || 0),
        0,
    );

    return [
        { image: yellowGraphSvg, title: "Total Institutions", icon: yellowArrowSvg, value: totalInstitutions },
        { image: purpleGraphSvg, title: "Total Earners", icon: purpleArrowSvg, value: totalIssuerEarners },
        { image: blueGraphSvg, title: "Total Badges", icon: blueArrowSvg, value: totalBadges },
    ];
};

// Earner content
const createEarnerContent = (data, userId, badge) => {
    const earnerData = [];

    data.forEach((institution) => {
        institution.Issuers?.forEach((issuer) => {
            const matchedEarners = issuer.Earners?.filter((earner) => earner.userId === userId);
            earnerData.push(...(matchedEarners || []));
        });
    });

    const totalBadges = badge?.totalRecords || 0;

    const uniqueAchievementsMap = new Map();
    const allAchievements = earnerData.flatMap(({ Achievements }) => Achievements || []);

    allAchievements.forEach((achievement) => {
        if (!uniqueAchievementsMap.has(achievement.badgeClassId)) {
            uniqueAchievementsMap.set(achievement.badgeClassId, achievement);
        }
    });

    const totalAchievements = uniqueAchievementsMap.size;
    const totalIssuers = new Set(earnerData.map((earner) => earner.issuerId)).size;

    return [
        { image: yellowGraphSvg, title: "Total Issuers", icon: yellowArrowSvg, value: totalIssuers },
        { image: blueGraphSvg, title: "Total Badges", icon: purpleArrowSvg, value: totalBadges },
        { image: purpleGraphSvg, title: "Total Achievements", icon: purpleArrowSvg, value: totalAchievements },
    ];
};
