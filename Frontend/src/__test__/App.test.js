import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
    it("closeIcon 클릭시 메뉴 닫힘 확인 및 MenuIcon 생성 확인", () => {
        render(<App />);
        const closeIcon =  screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(closeIcon).not.toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
    });

    it("menuIcon 클릭시 메뉴 열림 및 CloseIcon 생성 확인",() => {
        render(<App />);
        const closeIcon =  screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(closeIcon).not.toBeInTheDocument();
        const menuIcon = screen.getByTestId("MenuIcon");
        expect(menuIcon).toBeInTheDocument();
        fireEvent.click(menuIcon);
        expect(menuIcon).not.toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        
    });
});