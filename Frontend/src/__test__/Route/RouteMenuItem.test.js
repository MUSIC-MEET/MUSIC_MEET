import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import RouteMenuItem from "../../components/common/RouteItem";

import { BrowserRouter } from "react-router-dom";
describe("<RouteMenuItem />", () => {
    it("랜더링 테스트",() => {
        render(
            <BrowserRouter>
                <RouteMenuItem name={"테스트메뉴"} link={"/"}/>
            </BrowserRouter>
        );
        expect(screen.getByText("테스트메뉴")).toBeInTheDocument();
    });

    // it("navigaterHandler 작동 확인", () => {
    //     const navigaterHandler = jest.fn();
    //     render(
    //         <BrowserRouter>
    //             <RouteMenuItem name={"테스트메뉴"} link={"/"}/>
    //         </BrowserRouter>
    //     );
    //     fireEvent.click(screen.getByText("테스트메뉴"));
    //     expect(navigaterHandler).toHaveBeenCalled();
    // });
    // describe("CSS", () => {
    //     it("cursor: pointer 확인", () => {
    //         render(
    //             <BrowserRouter>
    //                 <RouteMenuItem name={"테스트메뉴"} link={"/"}/>
    //             </BrowserRouter>);
    //         expect(screen.getByText("테스트메뉴")).toHaveStyle({ "cursor": "pointer" });
    //     });
    // });
});