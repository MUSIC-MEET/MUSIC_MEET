import styled from "@emotion/styled";
import Button from "components/common/Button";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "./ButtonWrapper";

function BottomButton() {
    const { t } = useTranslation<"myPage">("myPage");
    const navigate = useNavigate();

    const deleteAccoutHanlder = useCallback(() => {
        navigate("/user/delete");
    }, [navigate]);

    const changePasswordHandler = useCallback(() => {
        navigate("/user/resetpw");
    }, [navigate]);

    const WIDTH = useMemo(() => "13rem", []);
    const HEIGHT = useMemo(() => "3rem", []);
    return (
        <ButtonWrapper>
            <Button
                w={WIDTH}
                h={HEIGHT}
                value={t("edit.values.changePasswordButton")}
                onClick={changePasswordHandler}
            />
            <Button
                w={WIDTH}
                h={HEIGHT}
                value={t("edit.values.deleteButton")}
                onClick={deleteAccoutHanlder}
            />
        </ButtonWrapper>
    );
}

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default React.memo(BottomButton);