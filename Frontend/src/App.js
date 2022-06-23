/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContextProvider from "./store/ThemeContextProvider";
import Content from "./components/UI/Content";
import { css } from "@emotion/react";
import "./i18n";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp/Index";
import UserFind from "./pages/Find/Index";
import Success from "./pages/SignUp/Success";
import EmailAuth from "./pages/Auth/Index";
const rootStyle = css`
    display: flex;
    flex-direction: row;
`;

function App() {
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    const navigator = useNavigate();
    return (
        <ThemeContextProvider>
            <div css={rootStyle}>
                { menu && <Menu 
                    navigator={navigator}
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
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signup/success" element={<Success />} />
                        <Route path="/auth/:value" element={<EmailAuth />} />
                        <Route path="/find/:type" element={<UserFind />} />
                    </Routes>
                    
                </Content>
            </div>
        </ThemeContextProvider>
    
    );
}

export default App;
