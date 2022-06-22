import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

describe("<App />", () => {
    it("closeIcon 클릭시 메뉴 닫힘 확인 및 MenuIcon 생성 확인", () => {
        render(<RecoilRoot><BrowserRouter><App /></BrowserRouter></RecoilRoot>);
        const closeIcon =  screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(closeIcon).not.toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
    });

    it("menuIcon 클릭시 메뉴 열림 및 CloseIcon 생성 확인",() => {
        render(<RecoilRoot><BrowserRouter><App /></BrowserRouter></RecoilRoot>);
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