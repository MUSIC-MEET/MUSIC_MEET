import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./Menu.module.css";
function Menu(props) {
    const { className, onMenuClose } = props;
    return (
        <nav className={`${className} ${classes.nav}`}>
            <CloseIcon 
                className={`${classes["menu-close"]} ${classes["nav-item"]}`}
                onClick={onMenuClose}
            />
        </nav>
    );
}

export default Menu;