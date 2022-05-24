import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: {},
        content: {},
        modal: {},
        input: {},
    },
    setDarkTheme: () => {},
    setLightTheme: () => {},

});
export default ThemeContext;