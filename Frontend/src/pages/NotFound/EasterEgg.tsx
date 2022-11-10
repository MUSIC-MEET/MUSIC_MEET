import React, { useEffect } from "react";


function getValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function EasterEgg() {
    useEffect(() => {
        const $ = document.getElementById("easter-egg");
        const screenX = window.innerWidth;
        setInterval(() => {
            const snow = document.createElement("div");
            const random = getValue(0, screenX);
            snow.style.cssText = `top: 0px; left: ${random}px;`;
            snow.classList.add("_snow");
            $?.appendChild(snow);
            console.log("build snow", random);
        }, 200);
    }, []);
    return (
        <></>
    );
}

export default EasterEgg;