import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import logError from '../utils/logError';

jest.mock('../utils/logError', () =>
  jest.fn(() => Promise.resolve({ success: true }))
);

const error = expect.any(Error);
const errorInfo = {
  componentStack: expect.stringContaining('ErrorBoundary'),
};

test('Log error to Sentry and show a whoopsie message', () => {
  // Render
  render(
    <ErrorBoundary forceError={true}>
      <h1 data-testid="expected-child">Oh Hi</h1>
    </ErrorBoundary>
  );
  // Make sure we log the error to our service (Sentry)
  expect(logError).toHaveBeenCalledTimes(1);
  expect(logError).toHaveBeenCalledWith({ error, errorInfo });

  // Make sure we're displaying the correct thing
  expect(screen.queryByTestId('expected-child')).not.toBeInTheDocument();
  expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
});
