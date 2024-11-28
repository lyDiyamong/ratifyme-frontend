// MUI import
import { Box, Typography, CardMedia, Stack } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

// Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";

// Image import
import LyhourProfile from "../../assets/images/LyhourProfile.jpeg";
import YamongProfile from "../../assets/images/YamongProfile.jpeg";
import SreyPovProfile from "../../assets/images/SreyPovProfile.jpeg";
import ChounanProfile from "../../assets/images/ChounanProfile.jpeg";
import MelenProfile from "../../assets/images/MelenProfile.jpeg";
import BunthongProfile from "../../assets/images/BunthongProfile.jpeg";
import RothanakProfile from "../../assets/images/RothanakProfile.jpeg";
import RothaProfile from "../../assets/images/RothaProfile.jpeg";
import RatifyMEFevicon from "../../assets/icons/RatifyME-Fevicon.svg";

const cardData = [
    {
        id: 1,
        title: "Prak Sreypov",
        role: "Project Manager",
        description: "Leads project planning, execution, and delivery while ensuring seamless collaboration across the team.",
        imageUrl: SreyPovProfile,
        linkGitHub: "https://github.com/PrakSreypov",
        linkLinkedIn: "https://www.linkedin.com/in/sreypov-prak-8422ab262/",
    },
    {
        id: 2,
        title: "Khun Malen",
        role: "Full Stack Developer & QA",
        description:
            "Enhances project quality through rigorous testing, creating and executing test cases, identifying issues, and verifying resolutions.",
        imageUrl: MelenProfile,
        linkGitHub: "https://github.com/Maalenn",
        linkLinkedIn: "https://www.linkedin.com/in/ma-len-a96200334/",
    },
    {
        id: 3,
        title: "Tep Chounan",
        role: "UX/UI Manager and QA",
        description: "Crafts and oversees the project’s visual design, prioritizing user engagement, appeal, and functionality.",
        imageUrl: ChounanProfile,
        linkGitHub: "https://github.com/t-chounan23125",
        linkLinkedIn: "#",
    },
    {
        id: 4,
        title: "Sreang Lyhour",
        role: "Full Stack Developer",
        description: "Oversees database design and maintenance, ensuring data integrity, security, and optimal performance.",
        imageUrl: LyhourProfile,
        linkGitHub: "https://github.com/Lyhua-tech",
        linkLinkedIn: "https://www.linkedin.com/in/sreang-lyhour-aa9355292/",
    },
    {
        id: 5,
        title: "Samon Rotha",
        role: "Full Stack Developer",
        description:
            "Focuses on crafting interactive and visually aligned components to enhance responsiveness and design adherence.",
        imageUrl: RothaProfile,
        linkGitHub: "https://github.com/RothaSAMON",
        linkLinkedIn: "https://www.linkedin.com/in/samon-rotha-034534316/",
    },
    {
        id: 6,
        title: "Ly Diyamong",
        role: "Full Stack Developer",
        description:
            "Specializing in server-side development, managing database interactions and API integrations for security and stability.",
        imageUrl: YamongProfile,
        linkGitHub: "https://github.com/lyDiyamong",
        linkLinkedIn: "https://www.linkedin.com/in/ly-diyamong",
    },
    {
        id: 7,
        title: "Phok Keomonyrothanak",
        role: "DevOps Engineer",
        description:
            "Specializing in website deployment and managing web applications using AWS, Nginx, and GitLab Runner-powered CI/CD pipelines to streamline automation and ensure efficient, secure, and consistent delivery",
        imageUrl: RothanakProfile,
        linkGitHub: "https://github.com/RatanakANB",
        linkLinkedIn: "https://www.linkedin.com/in/rattanak-phok-605905256/",
    },
    {
        id: 8,
        title: "Ron Bunthong",
        role: "DevOps Engineer",
        description:
            "Skilled in integrating AWS cloud solutions with SEO strategies, optimizing web applications for search engines, and automating workflows through GitLab Runners",
        imageUrl: BunthongProfile,
        linkGitHub: "https://github.com/BunthongDev",
        linkLinkedIn: "https://www.linkedin.com/in/bun-thong-509b10293/",
    },
];

const BookCard = ({ title, role, linkGitHub, linkLinkedIn, description, imageUrl }) => {
    const openLink = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: "10px",
                maxWidth: "300px",
                width: "100%",
                height: "350px",
                backgroundColor: "whitesmoke",
                perspective: "2000px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                "&:hover .cover": {
                    transform: "rotateY(-80deg)",
                    transition: "all 0.5s",
                },
            }}
        >
            <Box sx={{ padding: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Typography py={1} px={4}>
                    {role}
                </Typography>
                <Typography variant="body2" p={4}>
                    {description}
                </Typography>

                <Stack flexDirection="row" gap={1} justifyContent="center" alignItems="center">
                    <Box onClick={() => openLink(linkGitHub)} sx={{ cursor: "pointer" }}>
                        <GitHub sx={{ fontSize: "24px", color: "#000" }} />
                    </Box>

                    <Box onClick={() => openLink(linkLinkedIn)} sx={{ cursor: "pointer" }}>
                        <LinkedIn sx={{ fontSize: "26px" }} color="primary" />
                    </Box>
                </Stack>
            </Box>
            <Box
                className="cover"
                sx={{
                    top: 0,
                    position: "absolute",
                    backgroundColor: "lightgray",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.5s",
                    transformOrigin: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    boxShadow: theme.customShadows.default,
                }}
            >
                <CardMedia
                    component="img"
                    src={imageUrl}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                    }}
                />
                <Stack
                    sx={{
                        position: "absolute",
                        top: "91%",
                        p: 1,
                        backgroundColor: "white",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: "10px",
                        boxShadow: theme.customShadows.default,
                    }}
                >
                    <Typography variant="h5" fontWeight={theme.fontWeight.semiBold}>
                        {title}
                    </Typography>
                    <Box component="img" src={RatifyMEFevicon} sx={{ width: 24 }} alt="Icon" />
                </Stack>
            </Box>
        </Box>
    );
};

const MemberCardInfo = () => {
    return (
        <LandingContainer>
            <Stack
                sx={{
                    gap: 2,
                    justifyContent: "center",
                    my: 6,
                    alignItems: "center",
                    animation: "bounceIn 2s ease-in-out 0.5s",
                }}
            >
                <Typography textAlign="center" variant="h1" fontWeight={theme.fontWeight.bold} color="#0B3558">
                    TechA Members team
                </Typography>
                <Typography variant="h3" textAlign="center" color="#476788" maxWidth={800}>
                    Our team is customer-obsessed, mission-oriented, and believes anything is possible. 🚀
                </Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="center"
                sx={{
                    flexWrap: "wrap",
                    gap: 4,
                    "& > *": {
                        flexBasis: "calc(25% - 24px)",
                        "@media (max-width: 1450px)": {
                            flexBasis: "calc(33.33% - 24px)",
                        },
                        "@media (max-width: 900px)": {
                            flexBasis: "calc(50% - 24px)",
                        },
                        "@media (max-width: 600px)": {
                            flexBasis: "100%",
                        },
                    },
                }}
            >
                {cardData.map((card) => (
                    <BookCard
                        key={card.id}
                        title={card.title}
                        role={card.role}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        linkGitHub={card.linkGitHub}
                        linkLinkedIn={card.linkLinkedIn}
                    />
                ))}
            </Stack>

            <style>
                {`
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </LandingContainer>
    );
};

export default MemberCardInfo;
