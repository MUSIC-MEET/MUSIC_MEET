import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import  "../../i18n";
import { BrowserRouter } from "react-router-dom";
import TopIcons from "components/Menu/TopIcons";

describe("<TopIcons />", () => {
    it("icons 생성 확인",() => {
        render(<TopIcons />);
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();
    });

    it("closeIcon 클릭시 onClick 호출 확인",() => {
        const onMenuClose = jest.fn();
        render(<TopIcons onMenuClose={onMenuClose}/>);
        const closeIcon = screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(onMenuClose).toHaveBeenCalled();
    });
});