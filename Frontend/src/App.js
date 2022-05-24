/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContextProvider from "./store/ThemeContextProvider";
import Content from "./components/UI/Content";
import { css } from "@emotion/react";
import "i18n";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "pages/Register/Index";


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
        <BrowserRouter>
            <ThemeContextProvider>
                <div css={rootStyle}>
                    { menu && <Menu 
                        onMenuClose={menuVisibleHandler}
                    />}
                    <Content>
                        {
                            !menu && 
                        <MenuIcon
                            style={{ alignSelf : "flex-start" }}
                            onClick={menuVisibleHandler}
                        />
                        }
                        <Routes>
                            <Route path="/" element={<h2>hello</h2>} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Content>
                </div>
            </ThemeContextProvider>
        </BrowserRouter>
    );
}

export default App;
