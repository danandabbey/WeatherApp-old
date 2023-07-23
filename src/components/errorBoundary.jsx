import React from 'react'

class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage:error.message
        }
    }
    render() {
        if (this.state.hasError) {
            return <Error error={this.state.errorMessage} />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;