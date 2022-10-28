import Title from "components/common/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import MusicInfo from "./MusicInfo";

function View() {
    const { t } = useTranslation<"musicPage">("musicPage");
    const params = useParams<{ musicNum: string; }>();
    const musicNum = params.musicNum ?? "-1";
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <MusicInfo musicNum={musicNum} />
            <Comments musicNum={musicNum} />
        </React.Fragment>
    );
}

export default View;