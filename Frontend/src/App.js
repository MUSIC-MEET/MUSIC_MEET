import React, { useCallback, useState } from "react";
import classes from "./App.module.css";
import Menu from "./components/Menu/Menu";
function App() {
    const [menu, setMenu] = useState(true);
    const menuCloseHandler = useCallback(() => {
        setMenu(false);
    },[]);
    return (
        <div>
            <div className={classes.content}>
                { menu && <Menu 
                    className={classes.nav}
                    onMenuClose={menuCloseHandler}
                />}
                dd
            </div>
        </div>
    );
}

export default App;
