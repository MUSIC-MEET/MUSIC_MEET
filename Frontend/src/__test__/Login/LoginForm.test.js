import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "components/Login/LoginForm";
import React from "react";
import text from "../../locales/en/loginForm";
import  "../../i18n";

describe("<LoginForm />", () => {
    it("필수 텍스트들 생성 확인", () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText(text.email)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(text.password)).toBeInTheDocument();
        expect(screen.getAllByText(text.title)[1]).toBeInTheDocument();
        expect(screen.getByText(text.keepLoginState)).toBeInTheDocument();
        expect(screen.getByText(text.signup)).toBeInTheDocument();
        expect(screen.getByText(text.findId)).toBeInTheDocument();
        expect(screen.getByText(text.findPw)).toBeInTheDocument();
    });

    describe("로그인 상태 유지 체크 테스트", () => {
        it("비활성화 아이콘 생성 확인", () => {
            render(<LoginForm keepLoginState={false}/>);
            expect(screen.getByTestId("CheckCircleOutlineIcon")).toBeInTheDocument();
        });
        it("활성화 아이콘 생성 확인", () => {
            render(<LoginForm keepLoginState={true}/>);
            expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
        });

        it("문구 클릭시 상태 변경 함수 호출 확인", () => {
            const onChangeKeepLoginState = jest.fn();
            render(<LoginForm onChangeKeepLoginState={onChangeKeepLoginState}/>);
            const targetText = screen.getByText(text.keepLoginState);
            fireEvent.click(targetText);
            expect(onChangeKeepLoginState).toHaveBeenCalled();
        });

        it("아이콘  클릭시 상태 변경 함수 호출 확인", () => {
            const onChangeKeepLoginState = jest.fn();
            render(<LoginForm onChangeKeepLoginState={onChangeKeepLoginState}/>);
            const targetIcon= screen.getByTestId("CheckCircleOutlineIcon");
            fireEvent.click(targetIcon);
            expect(onChangeKeepLoginState).toHaveBeenCalled();
        });
        // const onChangeKeepLoginState = jest.fn();
        // render(<LoginForm onChangeKeepLoginState={onChangeKeepLoginState}/>);
        // c;
    });
});