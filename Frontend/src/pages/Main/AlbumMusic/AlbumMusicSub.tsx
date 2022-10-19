import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

function AlbumMusicSub(props: { onChange: (type: "latest" | "popular") => void }) {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <div css={style}>
            <span
                className="latest"
                onClick={() => props.onChange("latest")}
            >
                {t("type.latest")}
            </span>
            <span
                className="popular"
                onClick={() => props.onChange("popular")}
            >
                {t("type.popular")}
            </span>
        </div>
    );
}

const style = css`
    span { 
        cursor: pointer;
    }
    .latest::after {
        content: " | ";
    }
`;

export default AlbumMusicSub;