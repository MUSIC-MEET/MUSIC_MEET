import UnAuthorization from "pages/Unauthorization/UnAuthorization";
import React from "react";
import { Navigate } from "react-router-dom";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    


    render() {
        if (this.state.hasError) {
            // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
            return (
                <UnAuthorization />
            );
            // <Navigate to="/unauthorization" replace={true} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;