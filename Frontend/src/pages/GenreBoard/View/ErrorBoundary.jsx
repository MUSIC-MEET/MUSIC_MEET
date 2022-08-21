
import React from "react";
import NotFoundPost from "./NotFoundPost";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorCoode: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorCode: "404" };
    }
    


    render() {
        if (this.state.hasError && this.state.errorCode === "404") {
            // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
            return (
                <NotFoundPost />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;