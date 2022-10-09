import React from "react";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import StopCircleIcon from "@mui/icons-material/StopCircle";
function Player() {
    return (
        <div className="player">
            <NotStartedIcon />
            <StopCircleIcon />
        </div>
    );
}

export default Player;