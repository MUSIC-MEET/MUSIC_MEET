import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Menu from "../../components/Menu/Menu";
import text from "../../locales/en/menu";
import  "../../i18n";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

describe("<Menu />", () => {    
    it("closeIcon 생성 체크", () => {
        render(
            <RecoilRoot> 
                <BrowserRouter>
                    <Menu />
                </BrowserRouter>
            </RecoilRoot> 
        );
        const closeIcon = screen.getByTestId("CloseIcon");
        expect(closeIcon).toBeInTheDocument();
    });

    it("closeIcon onClick 호출 확인 ", () => {
        const onMenuClose = jest.fn();
        render(
            <RecoilRoot> 
                <BrowserRouter>
                    <Menu onMenuClose={onMenuClose} />
                </BrowserRouter>
            </RecoilRoot>
        );
        const closeIcon = screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(onMenuClose).toHaveBeenCalled();
    });

    it("<Menu /> 컴포넌트에 <Login /> 컴포넌트가 생성 되었나 확인", () => {
        render(
            <RecoilRoot> 
                <BrowserRouter>
                    <Menu />
                </BrowserRouter>
            </RecoilRoot> 
        );
        expect(screen.getByText(text.login)).toBeInTheDocument();
    });
});