import * as React from 'react';
import logError from '../utils/logError';

// ? We're not able to use SFC's and hooks with componentDidCatch: https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.forceError };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    logError({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      // TODO show a nicer "error" UI once it's designed
      return <h1 data-testid="error-message">Something went wrong!</h1>;
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
