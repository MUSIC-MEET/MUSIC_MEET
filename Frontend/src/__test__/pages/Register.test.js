import React from "react";
import text from "../../locales/en/registerPage";
import  "../../i18n";
import  Register from "pages/Register/Index";
import { render, screen } from "@testing-library/react";

describe("<Register />", () => {
    it("Title 생성 확인",() => {
        render(<Register />);
        expect(screen.getByText(text.title)).toBeInTheDocument();
    });
    it("placeholder 생성 확인", () => {
        render(<Register />);
        expect(screen.getByPlaceholderText(text.placeholder.id)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(text.placeholder.pw1)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(text.placeholder.pw2)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(text.placeholder.email)).toBeInTheDocument();
        
    });
});