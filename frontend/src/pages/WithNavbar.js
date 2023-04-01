import { Navbar } from "../components/Navbar";

export const WithNavbar = ({ children }) => {
    return (
        <>
        <Navbar />
        {children}
        </>
    );
    };
