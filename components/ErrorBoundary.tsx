'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Critical UI Failure:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Store Temporarily Unreachable</h2>
          <p className="mt-2 text-gray-600">Our team is aware. Please refresh or try again in 5 minutes.</p>
        </div>
      );
    }
    return this.props.children;
  }
}