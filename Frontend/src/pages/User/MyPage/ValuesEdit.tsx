import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import React from "react";
import { useTranslation } from "react-i18next";

const SUBMIT_WIDTH = "2.5rem";
const WIDTH = "25rem";
const HEIGHT = "2rem";
function ValuesEdit() {
    const { t } = useTranslation<"myPage">("myPage");

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        //
        e.preventDefault();
    };
    return (
        <React.Fragment>
            <Form addCss={[formStyle]} direction="column" onSubmit={onSubmit}>
                <label htmlFor="id">{t("edit.values.label.id")}</label>
                <Wrap>
                    <Input

                        w={WIDTH}
                        input={{
                            id: "id",
                            name: "id",
                            type: "text",
                            placeholder: "id",
                            disabled: "disabled",
                        }}
                    />
                    <Submit
                        value={t("edit.values.submit")}
                        w={SUBMIT_WIDTH}
                        h={HEIGHT}
                    />
                </Wrap>
            </Form>
            <Form addCss={[formStyle]} direction="column" onSubmit={onSubmit}>
                <label htmlFor="nickname">{t("edit.values.label.nickname")}</label>
                <Wrap>
                    <Input
                        w={WIDTH}
                        h={HEIGHT}
                        input={{
                            id: "id",
                            name: "id",
                            type: "text",
                            placeholder: "id"
                        }}
                    />
                    <Submit
                        value={t("edit.values.submit")}
                        w={SUBMIT_WIDTH}
                        h={HEIGHT}
                    />
                </Wrap>

            </Form>
            <Form addCss={[formStyle]} direction="column" onSubmit={onSubmit}>
                <label htmlFor="email">{t("edit.values.label.email")}</label>
                <Wrap>
                    <Input
                        w={WIDTH}
                        input={{
                            id: "id",
                            name: "id",
                            type: "text",
                            placeholder: "id"
                        }}
                    />
                    <Submit
                        value={t("edit.values.submit")}
                        w={SUBMIT_WIDTH}
                        h={HEIGHT}
                    />
                </Wrap>
            </Form>
            <Button
                w={"28.5rem"}
                h={"3rem"}
                value={t("edit.values.changePasswordButton")}
            />
        </React.Fragment>
    );
}


const formStyle = css`
    & {
        margin-bottom: 1rem;
    }
    label {
        margin-bottom: 0.5rem;
    }
    input[type="submit"] {
        margin-left: 1rem;
    }
`;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-between;
`;

export default ValuesEdit;