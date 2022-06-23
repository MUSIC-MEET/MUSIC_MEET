import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: { login:{} },
        content: {},
        modal: {},
        input: {},
    },
    setDarkTheme: () => {},
    setLightTheme: () => {},

});
export default ThemeContext;