import React from "react";

interface DescriptionProps {
    description?: string;
}

function Description(props: DescriptionProps) {
    return (
        <p style={{ "whiteSpace": "pre-wrap", "lineHeight": "1.2" }}>
            {props.description}
        </p>
    );
}

export default Description;