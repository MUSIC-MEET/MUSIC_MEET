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
import EmailAuth from "./pages/Auth/Index";
import User from "./pages/User/Index";
import LiveChart from "./pages/LiveChart/Index";
import GuestRoute from "./components/common/GuestRoute";
import { QueryClientProvider, QueryClient }  from "react-query";
const rootStyle = css`
    display: flex;
    flex-direction: row;
`;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});

function App() {
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    const navigator = useNavigate();

    return (
        <QueryClientProvider client={queryClient}>
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
                            <Route 
                                path="/signup/*"
                                element={
                                    <GuestRoute RouteComponent={SignUp}
                                    />
                                } 
                            />
                            <Route path="/auth/:type/:value" element={<EmailAuth />} />
                            <Route path="/find/*" element={<UserFind />} />
                            <Route path="/user/*" element={<User />} />
                            <Route path="/livechart/*" element={<LiveChart />} />
                            <Route path="/unauthorization" element={<h2>unauthorization</h2>} />
                        </Routes>
                
                    </Content>
                </div>
            </ThemeContextProvider>
        </QueryClientProvider>
    );
}

export default App;
