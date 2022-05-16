import React, { useCallback, useState } from "react";
import classes from "./App.module.css";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContextProvider from "./store/ThemeContextProvider";
import Content from "./components/UI/Content";
function App() {
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    return (
        <ThemeContextProvider>
            <div className={classes.content}>
                { menu && <Menu 
                    className={classes.nav}
                    onMenuClose={menuVisibleHandler}
                />}
                <Content>
                    {
                        !menu && <MenuIcon
                            className={classes["menu-open"]}
                            onClick={menuVisibleHandler}
                        />
                    }
                    dd
                </Content>
            </div>
        </ThemeContextProvider>
    );
}

export default App;
