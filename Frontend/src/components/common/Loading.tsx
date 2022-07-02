import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
    return (
        <React.Fragment>
            <CircularProgress size="10rem" />
        </React.Fragment >
    );
}

export default Loading;