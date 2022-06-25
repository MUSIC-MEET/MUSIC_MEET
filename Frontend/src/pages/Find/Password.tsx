import React, { useCallback, useState } from "react";
import FindContentBox from "./FindContent";
import useAxios from "hooks/use-Axios";
import Input from "components/common/Input";
import Form from "../../components/common/Form";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";

interface InfoProps {
    id: string;
    email: string;
}

function Password() {
    const { t } = useTranslation<"findPage">("findPage");
    const [info, setInfo] = useState<InfoProps>({
        id: "",
        email: ""
    });
    const { fetchData, status } = useAxios({
        url: "/findpw",
        method: "POST",
        body: {
            id: info.id,
            email: info.email
        }
    });

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }, [info]);
    const onSumbitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
        console.log(info);
    }, [fetchData, info]);

    const init = !status.isError && !status.isLoading && !status.isSucess;

    if (init) {
        return (
            <FindContentBox>
                <Form addCss={[formStyle]} onSubmit={onSumbitHandler} direction={"column"}>
                    <label htmlFor="id">{t("pw.id.label")}</label>
                    <Input
                        input={{
                            type: "text",
                            value: info.id,
                            id: "id",
                            name: "id",
                            onChange: onChangeHandler,
                            placeholder: t("pw.id.placeholder")
                        }
                        }
                    />
                    <label htmlFor="email">{t("pw.email.label")}</label>
                    <Input
                        input={{
                            type: "email",
                            value: info.email,
                            id: "email",
                            name: "email",
                            onChange: onChangeHandler,
                            placeholder: t("pw.email.placeholder")
                        }}
                    />
                    <Submit
                        value="전송"
                        disabled={!info.id || !info.email}
                    />
                </Form>
            </FindContentBox>
        );
    }

    if (status.isLoading) {
        return (
            <FindContentBox>
                <Skeleton variant="text" sx={{ bgcolor: "grey.500" }} width={430} height={30} />
            </FindContentBox>
        );
    }

    return (
        <FindContentBox>
            {status.isSucess && <p>{t("pw.sucess")}</p>}
            {status.isError && <p>{t("pw.error")}</p>}
        </FindContentBox>
    );
}
const formStyle = css`
    label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    input {
        width:25rem;
        height: 2.5rem;
    }

    input[type="submit"] {
        margin-top: 1rem;
    }
`;

export default Password;