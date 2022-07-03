import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: { login:{ fontColor: "" } },
        content: { fontColor: "" },
        modal: {},
        input: { borderColor : "" },
    },
    setDarkTheme: () => {
        //
    },
    setLightTheme: () => {
        //
    },

});
export default ThemeContext;