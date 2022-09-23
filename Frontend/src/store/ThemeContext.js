import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: { fontColor: "" ,login:{ fontColor: "" }, searchBackground: "" },
        content: { fontColor: "" },
        modal: {},
        input: { borderColor : "" },
        secondFont: { fontColor : "" },
        sectionWrapper: { backgroundColor: "", borderColor: "" }
    },
    setDarkTheme: () => {
        //
    },
    setLightTheme: () => {
        //
    },

});
export default ThemeContext;