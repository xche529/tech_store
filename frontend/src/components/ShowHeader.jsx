import React, { useEffect, useState }from "react";
import { useLocation } from "react-router-dom";

const ShowHeader = ({ children }) => {

    const location = useLocation();

    const [showHeader, setShowHeader] = useState(false);

    // Using useEffect to achieve the header is not shown in the admin page.
    useEffect(() => {
        if (location.pathname === "/items") {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }
    , [location]);
    return (
        <div>{showHeader && children } </div>
    )
}

export default ShowHeader