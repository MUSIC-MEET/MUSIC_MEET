import React, { useCallback, useState } from "react";
import classes from "./App.module.css";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
function App() {
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    return (
        <div>
            <div className={classes.content}>
                { menu && <Menu 
                    className={classes.nav}
                    onMenuClose={menuVisibleHandler}
                />}
                {
                    !menu && <MenuIcon
                        className={classes["menu-open"]}
                        onClick={menuVisibleHandler}
                    />
                }
            </div>
        </div>
    );
}

export default App;
