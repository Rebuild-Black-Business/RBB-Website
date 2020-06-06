import * as Sentry from '@sentry/browser';

const logError = ({ error, errorInfo }) => {
  Sentry.configureScope(scope => {
    Object.keys(errorInfo).forEach(key => {
      scope.setExtra(key, errorInfo[key]);
    });
  });
  Sentry.captureException(error);
};

export default logError;
