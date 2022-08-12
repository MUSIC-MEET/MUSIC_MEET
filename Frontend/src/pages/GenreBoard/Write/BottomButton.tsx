import { css } from "@mui/material";
import GreenButton from "components/common/GreenButton";
import RedButton from "components/common/RedButton";
import React from "react";
import { useTranslation } from "react-i18next";

interface BottomButtonHandler {
    goBackHandler: () => void;
}

function BottomButton(props: BottomButtonHandler) {
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    return (
        <section css={style}>
            <GreenButton
                value={t("button.submit")}
                type={"submit"}
            />

            <RedButton
                value={t("button.cancel")}
                type={"button"}
                onClick={props.goBackHandler}
            />

        </section>
    );
}

const style = css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > input[type="submit"], input {
        text-align: center;
        border-radius: 8px;
        width: 5rem;
        height: 3rem;
    }
    
    & > input[type="submit"] {
        margin-right: 1rem;
    }

`;

export default React.memo(BottomButton);


