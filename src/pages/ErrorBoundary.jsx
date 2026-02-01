import React from 'react';

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
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold">Something went wrong.</h2>
          <button 
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Try Refreshing
          </button>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;