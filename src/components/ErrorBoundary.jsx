import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            padding: "2rem",
            color: "#ef4444",
            backgroundColor: "#1e293b",
            height: "100vh",
            fontFamily: "monospace",
          }}
        >
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <br />
            <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
