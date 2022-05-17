/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContextProvider from "./store/ThemeContextProvider";
import Content from "./components/UI/Content";
import { css } from "@emotion/react";

const rootStyle = css`
    display: flex;
    flex-direction: row;
`;
function App() {
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    return (
        <ThemeContextProvider>
            <div css={rootStyle}>
                { menu && <Menu 
                    onMenuClose={menuVisibleHandler}
                />}
                <Content>
                    {
                        !menu && 
                        <MenuIcon
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
