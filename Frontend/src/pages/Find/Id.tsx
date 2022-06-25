import React, { useCallback, useEffect, useState } from "react";
import Input from "components/common/Input";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import useAxios from "hooks/use-Axios";
import { Skeleton } from "@mui/material";


interface ContentProps {
    children: React.ReactNode;
    title: string;
}

const Content = (props: ContentProps) => {
    const { children } = props;
    return (
        <section css={style} >
            {children}
        </section>
    );
};
const Id = () => {
    const { t } = useTranslation("findPage");
    const [email, setEmail] = useState<string>("");
    const { fetchData, status } = useAxios({
        url: "/findid",
        method: "POST",
        body: {
            email
        }
    });
    useEffect(() => {
        //
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    }, [fetchData]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const init = !status.isError && !status.isLoading && !status.isSucess;

    if (init) {
        return (
            <form onSubmit={onSubmit}>
                <Input
                    type="email"
                    w={"25rem"}
                    h={"2.5rem"}
                    input={{
                        id: "email",
                        placeholder: t("id.placeholder"),
                        type: "email",
                        value: email,
                        onChange: onChangeHandler
                    }}
                />
                <Submit
                    w={"5rem"}
                    h={"2.5rem"}
                    value={t("id.submit")}
                    disabled={!email}
                />
            </form>
        );
    }

    if (status.isLoading) {
        return (
            <Content title={t("id.title")}>
                <Skeleton variant="text" sx={{ bgcolor: "grey.500" }} width={430} height={30} />
            </Content>
        );
    }

    return (
        <Content title={t("id.ment")}>
            {status.isError && <p>{t("id.error")}</p>}
            {status.isSucess && <p className="ment">{t("id.sucess")}</p>}
        </Content>
    );
};

const style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-bottom: 1rem;
    }
    .ment {
        margin-top: 1rem;
    }
`;

export default Id;