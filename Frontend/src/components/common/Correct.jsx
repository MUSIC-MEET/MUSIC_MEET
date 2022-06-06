import React from "react";

function Correct(props) {
    return (
        <b style={{ 
            fontSize: "0.9rem",
            color: "#30d361",
            marginBottom: "0.2rem"   
        }}>
            {props.children}
        </b>
    );
}

export default React.memo(Correct);