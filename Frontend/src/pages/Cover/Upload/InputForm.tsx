import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useState } from "react";
import InputTitle from "./InputTitle";
import InputDescription from "./InputDescription";

import FileUploader from "components/common/FileUploader";
import GreenButton from "components/common/GreenButton";
import RedButton from "components/common/RedButton";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import CoverType from "../CoverType";

interface InputFormPros {
    onSubmit: (obj: CoverType) => void;
}

/**
 * Upload Form Component 입력값들을 받아서 onSubmit으로 전달
 * @param props.onSubmit - submit 함수
 * @returns 
 */
function InputForm(props: InputFormPros) {
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mp3File, setMp3File] = useState<Blob>(new Blob());
    const titleChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
    }, []);

    const descriptionChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(() => e.target.value);
    }, []);

    const mp3FileOnChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMp3File(() => e.target.files![0] ?? new Blob());

    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* TODO  */
    }, []);
    return (
        <SectionWrapper css={style}>
            <form onSubmit={onSubmit}>
                <InputTitle
                    className="wrapper"
                    title={title}
                    onChange={titleChangeHandler}
                />
                <FileUploader
                    className="file-uploader"
                    onChange={mp3FileOnChangeHandler}
                />
                <InputDescription
                    description={description}
                    onChange={descriptionChangeHandler}
                />
                <div className="events">
                    <GreenButton
                        type="submit"
                        value={t("form.Submit")}
                    />
                    <RedButton
                        type="button"
                        value={t("form.Cancel")}
                    />
                </div>
            </form>
        </SectionWrapper>
    );
}

const style = css`
    width: 80vw;
    height: auto;
    & > form > *  {
        margin-bottom: 1rem;
    }

    form > label {
        display: flex;
        flex-direction: column; 

        b {
            padding-bottom: 0.5rem; 
        }
    }

    label > b {
        font-size: 1.5rem;
    }

    .file-uploader {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        input[type="text"] {
            width: 100%;
            padding: 0.5rem
        }
    }

    .events {
        display: flex;
        justify-content: flex-end;

        input[type="submit"], input[type="button"] {
        padding: 1rem;
        margin-left: 0.5rem;
    }
    }
    
`;

export default InputForm;