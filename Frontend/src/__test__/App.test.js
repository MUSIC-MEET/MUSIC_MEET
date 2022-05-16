import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
    it("closeIcon 클릭시 메뉴 닫힘 확인 ", () => {
        render(<App />);
        const closeIcon =  screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(closeIcon).not.toBeInTheDocument();
    });
});