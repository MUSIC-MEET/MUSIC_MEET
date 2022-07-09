import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const DarkThemeInit = {
    menu: {
        background: "rgb(22,22,22)",
        fontColor:  "#CCCCCC",
        searchBackground: "rgb(31,31,31)",
        login: {
            fontColor: "white"
        },
        subMenu: {
            borderColor: "rgb(88,88,88)",
            background: "#222222"
        },
        clicked: "rgb(255, 210, 0)",
        hover: "rgb(255,255,255)"
    },
    content: {
        background: "rgb(22,22,22)",
        fontColor:  "white"
    },
    modal: {
        background: "rgb(22,22,22)",
        fontColor: "white"
    },
    input: {
        borderColor: "rgb(88,88,88)",
    }
};

const LightThemeInit = {
    menu: {
        background: "rgb(250,249,250)",
        fontColor:  "#222222",
        searchBackground: "rgb(255,255,255)",
        login: {
            fontColor: "black"
        },
        subMenu: {
            borderColor: "#222222",
            background: "rgb(250,249,250)"
        },
        clicked: "rgb(93, 191, 185)",
        hover: "rgb(88, 88, 88)"
    },
    content: {
        background: "rgb(255,255,255)",
        fontColor:  "black"
    },
    modal: {
        background: "rgb(255,255,255)",
        fontColor:  "black"
    },
    input: {
        background: "rgb(255,255,255)",
    }
};

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState("dark");
    const [themeStyle, setThemeStyle] = useState(DarkThemeInit);

    const setDarkTheme = () => {
        setTheme("dark");
        setThemeStyle(DarkThemeInit);
    };

    const setLightTheme = () => {
        setTheme("light");
        setThemeStyle(LightThemeInit);
    };

    const themeObj = {
        theme: theme,
        themeStyle: themeStyle,
        setDarkTheme: setDarkTheme,
        setLightTheme: setLightTheme
    };
    return (
        <ThemeContext.Provider value={themeObj}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;