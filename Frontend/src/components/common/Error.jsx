import React from "react";

function Error(props) {
    return (
        <b style={{ 
            fontSize: "0.9rem",
            color: "#df0000",
            marginBottom: "0.2rem"   
        }}>
            {props.children}
        </b>
    );
}

export default React.memo(Error);