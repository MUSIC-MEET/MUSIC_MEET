import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileUploaderProps {
    className?: string;
    fileName?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileUploader(props: FileUploaderProps) {
    const [fileName, setFileName] = useState<string>(props.fileName ?? "");
    const fileChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.files![0].name);
        props.onChange(e);
    }, [props]);
    return (
        <div className={props.className} css={style}>
            <input
                type="text"
                placeholder="Upload File..."
                value={fileName}
                disabled
            />
            <label htmlFor="upload">
                <div className="svg-wrapper">
                    <UploadFileIcon />
                </div>

            </label>
            <input type="file" id="upload" hidden onChange={fileChangeHandler} />
        </div>
    );
}

const style = css`
    svg {
        font-size: 2rem;
    }
    input[type="text"] {
        background: none;
        color: #676767;
    }

    label {
        height: 100%;
        background: #bd6a6a;
        cursor: pointer;
    }
`;

export default React.memo(FileUploader);