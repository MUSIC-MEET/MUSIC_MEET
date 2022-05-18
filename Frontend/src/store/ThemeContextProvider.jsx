import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const DarkThemeInit = {
    menu: {
        background: "rgb(22,25,31)",
        fontColor:  "white",
        searchBackground: "rgb(31,31,31)",
    },
    content: {
        background: "rgb(16,18,23)",
        fontColor:  "white"
    }
};

const LightThemeInit = {
    menu: {
        background: "rgb(250,249,250)",
        fontColor:  "black",
        searchBackground: "rgb(255,255,255)",
    },
    content: {
        background: "rgb(255,255,255)",
        fontColor:  "black"
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