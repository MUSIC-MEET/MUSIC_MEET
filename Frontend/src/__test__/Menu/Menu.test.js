import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Menu from "../../components/Menu/Menu";

describe("<Menu />", () => {    
    it("closeIcon 생성 체크", () => {
        render(<Menu />);
        const closeIcon = screen.getByTestId("CloseIcon");
        expect(closeIcon).toBeInTheDocument();
    });

    it("closeIcon onClick 호출 확인 ", () => {
        const onMenuClose = jest.fn();
        render(<Menu onMenuClose={onMenuClose} />);
        const closeIcon = screen.getByTestId("CloseIcon");
        fireEvent.click(closeIcon);
        expect(onMenuClose).toHaveBeenCalled();
    });

});