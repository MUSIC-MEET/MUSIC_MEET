import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: {},
        contet: {},
        modal: {}
    },
    setDarkTheme: () => {},
    setLightTheme: () => {},

});
export default ThemeContext;