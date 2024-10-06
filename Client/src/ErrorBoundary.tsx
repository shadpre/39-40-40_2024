import React, { Component, ErrorInfo, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorCode: number | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorCode: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorCode: 500 }; // Default to 500 error
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorCode === 403) {
        return <Navigate to="/403" />;
      }
      if (this.state.errorCode === 404) {
        return <Navigate to="/404" />;
      }
      return <Navigate to="/500" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
