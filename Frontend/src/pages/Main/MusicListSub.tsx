import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MusicListSubProps {
    onChange: (tpye: "latest" | "popular") => void;
    type: string;
}

function MusicListSub(props: MusicListSubProps) {
    const { t } = useTranslation<"mainPage">("mainPage");
    const navigator = useNavigate();
    return (
        <div css={style}>
            <div>
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
            <span
                onClick={() => navigator(`/${props.type}/list`)}
            >
                {t("more")}
            </span>
        </div>
    );
}

const style = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    span { 
        cursor: pointer;
    }
    .latest::after {
        content: " | ";
    }
`;

export default MusicListSub;