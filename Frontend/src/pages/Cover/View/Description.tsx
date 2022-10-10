import React from "react";

interface DescriptionProps {
    description?: string;
}

function Description(props: DescriptionProps) {
    return (
        <p style={{ "whiteSpace": "pre-wrap" }}>
            {props.description}
        </p>
    );
}

export default Description;