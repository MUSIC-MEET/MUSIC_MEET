import { css } from "@emotion/react";
import Button from "components/common/Button";
import Submit from "components/common/Submit";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import chnageImage from "utils/RequestApis/MyPage/ChangeImage";

function ImageEdit() {
    const { t } = useTranslation<"myPage">("myPage");
    const imgRef = React.createRef<HTMLInputElement>();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>("");
    const [newImg, setNewImg] = useState<File | null>(null);
    const { mutate } = useMutation(chnageImage, {
        retry: 0
    });

    const fileSelectHandler = useCallback(() => {
        imgRef.current?.click();
    }, [imgRef]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setNewImg(file);
        const preview = URL.createObjectURL(file);
        setImgSrc(preview);
        setIsSelected(true);
    }, []);

    const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(newImg);
    }, [mutate, newImg]);

    return (
        <section>
            <img src={imgSrc} css={[imgStyle]} />
            <form onSubmit={onSubmitHandler}>
                <input ref={imgRef} type="file" hidden onChange={onChangeHandler} />
                {
                    isSelected &&
                    <Submit
                        value={"이미지 변경하기"}
                        w={"20rem"}
                        h={"3rem"}
                    />
                }
            </form>
            {
                !isSelected &&
                <Button
                    w={"20rem"}
                    h={"3rem"}
                    value={t("edit.img.button")}
                    onClick={fileSelectHandler}
                />
            }
        </section>
    );
}


const imgStyle = css`
width: 240px;
height: 240px;
border: 1px solid gray;
border-radius: 50%;
margin-bottom: 1.2rem;
`;

export default React.memo(ImageEdit);