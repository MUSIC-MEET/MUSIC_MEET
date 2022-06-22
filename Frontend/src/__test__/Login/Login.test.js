import React from "react";
import { screen, render } from "@testing-library/react";
import Login from "components/Login/Login";
import text from "../../locales/en/menu";
import  "../../i18n";
import { RecoilRoot } from "recoil";

describe("<Login />", () => {
    it("문구 생성 확인",()=> {
        render(
            <RecoilRoot>
                <Login />
            </RecoilRoot>
        );
        expect(screen.getByText(text.login)).toBeDefined();
    });

    it("로그인 border top, bottom 생성 확인",()=> {
        render(
            <RecoilRoot> 
                <Login />
            </RecoilRoot>
        );
        const parent = screen.getByText(text.login).closest("div");
        expect(parent).toHaveStyle({ "border-top" : "3px solid #555555" });
        expect(parent).toHaveStyle({ "border-bottom" : "3px solid #555555" });
    });

    it("로그인 글자에 cursor값 생성 확인",()=> {
        render(
            <RecoilRoot> 
                <Login />
            </RecoilRoot> );
        expect(screen.getByText(text.login)).toHaveStyle({ "cursor" : "pointer" });
    });
});
