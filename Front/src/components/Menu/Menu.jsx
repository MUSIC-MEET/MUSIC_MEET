import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function Menu(props) {
    const { className, onMenuClose } = props;
    return (
        <nav className={`${className}`}>
            <CloseIcon onClick={onMenuClose}/>
        </nav>
    );
}

export default Menu;