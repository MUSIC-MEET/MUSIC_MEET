import React, { Suspense, useCallback, useState } from "react";
import Menu from "./components/Menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContextProvider from "./store/ThemeContextProvider";
import Content from "./components/UI/Content";
import { css } from "@emotion/react";
import "./i18n";
import { Route, Routes, useNavigate } from "react-router-dom";
import LiveChart from "./pages/LiveChart/Index";
import GuestRoute from "./components/common/GuestRoute";
import { QueryClientProvider, QueryClient }  from "react-query";

import Main from "./pages/Main/Index";
import SignUp from "./pages/SignUp/Index";
import UserFind from "./pages/Find/Index";
import EmailAuth from "./pages/Auth/Index";
import GenreBoard from "pages/GenreBoard/Index";
import User from "./pages/User/Index";
import Music from "./pages/Music/Index.tsx";
import NotFoundPage from "./pages/NotFound/Index";
import Cover from "./pages/Cover/Index";
import MusicPlayer from "./pages/MusicPlayer/MusicPlayer";
import Loading from "./components/common/Loading";
import { useRecoilValue } from "recoil";
import  LoginState  from "store/LoginState";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: true,
            retry: 0,
            refetchOnWindowFocus: false,
            
        },
    },
});

function App() {
    const { isLogIn } = useRecoilValue(LoginState);
    const [menu, setMenu] = useState(true);
    const menuVisibleHandler = useCallback(() => {
        setMenu((prevState) => !prevState);
    },[]);
    const navigator = useNavigate();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <Content css={[rootStyle,rootMusicPlayerStyle]}>
                    { menu ? <Menu 
                        className="menu"
                        navigator={navigator}
                        onMenuClose={menuVisibleHandler}
                    />:
                        <MenuIcon
                            className="menu-icon"
                            style={{ alignSelf : "flex-start" }}
                            onClick={menuVisibleHandler}
                        />
                    }
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Main />} />
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
                            <Route path="/board/*" element={<GenreBoard />} />
                            <Route path="/music/*" element={<Music />} /> 
                            <Route path="/cover/*" element={<Cover />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                    {
                        isLogIn &&
                        <Suspense fallback={<Loading />}> 
                            <MusicPlayer 
                                className="music-player"
                            />
                        </Suspense>
                    }
                </Content>
            </ThemeContextProvider>
        </QueryClientProvider>
    );
}

const rootStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 100vh;
    padding: 0rem;
    transition: all 0.5s;

    .menu {
        width: 12%;
        min-height: 100vh;
        z-index: 2;
    }

    .menu-icon {
        width: 2%;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100vw;
        min-height: 100vh;
        z-index: 1;
        border-left: 2px solid #555555;
        padding-bottom: 5rem;
    }

    .section-wrapper, .main-wrapper {
        width: 80vw;
    }

    .main-wrapper {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 1023px) {
        flex-direction: column; 
        .container { border-left: none; }
    }
`;

const rootMusicPlayerStyle = css`
    .music-player {
        min-height: 100vh;
        position: absolute;
    }

`;



export default App;

