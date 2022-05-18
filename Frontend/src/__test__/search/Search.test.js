import React from "react";
import { screen, render } from "@testing-library/react";
import text from "../../locales/en/menu";
import  "../../i18n";
import  Search  from "../../components/Search/Search";

describe("<Search />", () => {    
    it("SearchBox placeholder 문구 확인", () => {
        render(<Search />);
        const placeholder = screen.getByPlaceholderText(text.search.placeholder);
        expect(placeholder).toBeInTheDocument();
    });
    describe("CSS", () => {
        it("SearchBox placeholder 돋보기 아이콘 생성 확인", () => {
            render(<Search />);
            const searchIcon = screen.getByTestId("SearchIcon");
            expect(searchIcon).toBeInTheDocument();
        });

        it("SearchBox border style 테스트", () => {
            render(<Search />);
            const inputBox = screen.getByPlaceholderText(text.search.placeholder);
            expect(inputBox).toHaveStyle({ "border-radius": "5px" });
            expect(inputBox).toHaveStyle({ "border": "1px solid gray" });
        });
    });


    // it("SearchBox focus시 outline none 확인", () => {
    //     render(<Search />);
    //     const inputBox = screen.getByPlaceholderText(text.search.placeholder);
    //     fireEvent.focus(inputBox);
    //     expect(inputBox).toHaveStyle("outline: none");
    // });
});