import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import logError from '../utils/logError';

jest.mock('../utils/logError', () =>
  jest.fn(() => Promise.resolve({ success: true }))
);

const error = expect.any(Error);
const errorInfo = { componentStack: expect.stringContaining('ErrorBoundary') };
const ErroringComponent = () => this.fake.caboom();

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Log error to Sentry and show a whoopsie message', () => {
  // Render
  render(
    <ErrorBoundary>
      <h1 data-testid="child">Oh Hi</h1>
      <ErroringComponent />
    </ErrorBoundary>
  );
  // Make sure we log the error to our service (Sentry)
  expect(logError).toHaveBeenCalledTimes(1);
  expect(logError).toHaveBeenCalledWith({ error, errorInfo });

  // Make sure we're displaying the correct thing
  expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  expect(screen.getByTestId('error-message')).toBeInTheDocument();
});
