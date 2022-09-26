import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface NotLoginMenuProps {
    onOpenLoginModal: () => void;
    fontColor: string;
    navigator: (path: string) => void;
}

function NotLoginMenu(props: NotLoginMenuProps) {
    const { onOpenLoginModal, fontColor, navigator } = props;
    const { t } = useTranslation("menu");
    return (
        <section css={style}>
            <span
                css={css`color: ${fontColor};`}
                onClick={onOpenLoginModal}
            >{t("login")}</span>
            <span
                css={css`color: ${fontColor}; margin-top: 1rem;`}
                onClick={() => navigator("/signup")}
            >{t("signup")}</span>
        </section>
    );
}

const style = css`
    display: flex;
    flex-direction: column;

    & > span {
        cursor: pointer;
    }

    @media screen and (max-width: 1023px) {
        flex-direction: row;
        span {
            margin-top: 0;
        }

        span:nth-child(1) {
            margin-right: 1rem;
        }
    }
`;

export default NotLoginMenu;