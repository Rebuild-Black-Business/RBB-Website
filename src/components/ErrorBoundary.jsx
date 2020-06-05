// ? We're not able to use SFC's and hooks with componentDidCatch: https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return <h1>Something went wrong!</h1>;
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
