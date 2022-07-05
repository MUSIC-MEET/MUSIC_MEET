import { css } from "@emotion/react";
import Button from "components/common/Button";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

function ImageEdit() {
    const { t } = useTranslation<"myPage">("myPage");
    const fileSelectHandler = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.click();
    }, []);
    return (
        <section>
            <div css={[imgStyle]}>

            </div>
            <Button
                w={"25rem"}
                h={"3rem"}
                value={t("edit.img.button")}
                onClick={fileSelectHandler}
            />
        </section>
    );
}


const imgStyle = css`
width: 30rem;
height: 10rem;
border: 1px solid gray;
margin-bottom: 2rem;
`;

export default ImageEdit;