import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useState } from "react";
import InputTitle from "./InputTitle";
import InputDescription from "./InputDescription";

import FileUploader from "components/common/FileUploader";
import GreenButton from "components/common/GreenButton";
import RedButton from "components/common/RedButton";
import { useTranslation } from "react-i18next";
import CoverType from "./CoverType";
import ValueEmptyModal from "components/AlertModal/ValueEmptyModal";

interface InputFormPros {
    onSubmit: (obj: CoverType) => void;
    navigator: (path: string) => void;
}

/**
 * Upload Form Component 입력값들을 받아서 onSubmit으로 전달
 * @param props.onSubmit - submit 함수
 * @param props.navigator - react-router-dom의 navigate 함수
 * @returns 
 */
function InputForm(props: InputFormPros) {
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mp3File, setMp3File] = useState<Blob>(new Blob());
    const [fileName, setFileName] = useState<string>("");
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const titleChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
    }, []);

    const descriptionChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(() => e.target.value);
    }, []);

    const mp3FileOnChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMp3File(() => e.target.files![0] ?? new Blob());
        setFileName(() => e.target.files![0].name ?? "");
    }, []);

    const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.length === 0 || description.length === 0 || mp3File.size === 0 || fileName.length === 0) {
            setIsEmpty(() => true);
            return;
        }
        props.onSubmit({ title, description, mp3File, fileName });
    }, [description, fileName.length, mp3File, props, title]);


    return (
        <SectionWrapper css={style}>
            {isEmpty && <ValueEmptyModal callback={() => setIsEmpty(() => false)} />}
            <form onSubmit={onSubmitHandler}>
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
                        onClick={() => props.navigator("/cover/list")}
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