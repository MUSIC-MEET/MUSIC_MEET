import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    themeStyle: {
        menu: { fontColor: "" ,login:{ fontColor: "" }, searchBackground: "", background: "" },
        content: { fontColor: "" },
        modal: {},
        input: { borderColor : "" },
        secondFont: { fontColor : "" },
        sectionWrapper: { backgroundColor: "", borderColor: "" },
        fontStyle1: { color: "" },
        fontStyle2: { color : "" },
        musicPlayer: { background: "", gray: "" }
    },
    setDarkTheme: () => {
        //
    },
    setLightTheme: () => {
        //
    },

});
export default ThemeContext;