import React from "react";
import { screen, render } from "@testing-library/react";
import Login from "components/Login/Login";

describe("<Login />", () => {
    it("문구 생성 확인",()=> {
        render(<Login />);
        expect(screen.getByText("로그인")).toBeInTheDocument();
    });

    it("로그인 border top, bottom 생성 확인",()=> {
        render(<Login />);
        const parent = screen.getByText("로그인").closest("div");
        expect(parent).toHaveStyle({ "border-top" : "3px solid gray" });
        expect(parent).toHaveStyle({ "border-bottom" : "3px solid gray" });
    });

    it("로그인 글자에 cursor값 생성 확인",()=> {
        render(<Login />);
        expect(screen.getByText("로그인")).toHaveStyle({ "cursor" : "pointer" });
    });
});
