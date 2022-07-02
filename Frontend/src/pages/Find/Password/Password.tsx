import React, { useCallback, useState } from "react";
import useAxios from "hooks/use-Axios";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";
import Title from "components/common/Title";
import FindPasswordForm from "./FindPasswordForm";

interface ValuesProps {
    id: string;
    email: string;
}

function Password() {
    const { t } = useTranslation<"findPage">("findPage");
    const [values, setValues] = useState<ValuesProps>({
        id: "",
        email: ""
    });
    const { fetchData, status } = useAxios({
        url: "/findpw",
        method: "POST",
        body: {
            id: values.id,
            email: values.email
        }
    });

    const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }, [values]);
    const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    }, [fetchData]);

    const init = !status.isError && !status.isLoading && !status.isSucess;


    return (
        <React.Fragment>
            <Title>{t(`pw.title`)}</Title>
            <p>{t("ment")}</p>
            {init &&
                <FindPasswordForm
                    label={{
                        id: t("pw.id.label"),
                        email: t("pw.email.label")
                    }}
                    placeholder={{
                        id: t("pw.id.placeholder"),
                        email: t("pw.email.placeholder")
                    }}
                    onSubmit={submitHandler}
                    onChange={changeHandler}
                    values={values}
                />
            }
            {status.isLoading && <Skeleton variant="text" sx={{ bgcolor: "grey.500" }} width={430} height={30} />}
            {status.isSucess && <p>{t("pw.sucess")}</p>}
            {status.isError && <p>{t("pw.error")}</p>}
        </React.Fragment>

    );
}

export default Password;