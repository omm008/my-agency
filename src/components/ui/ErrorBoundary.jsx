import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an analytics service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-brand-black flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-brand-blue">
            System Glitch.
          </h1>
          <p className="text-neutral-400 mb-8 max-w-md">
            Our animation engine encountered a critical error. Please refresh
            the page to recalibrate.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200"
          >
            Reload System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
