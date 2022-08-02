import React from "react";

function Error(props) {
    return (
        <b style={{ 
            color: "#df0000",
            marginBottom: "0.2rem"   
        }}>
            {props.children}
        </b>
    );
}

export default React.memo(Error);