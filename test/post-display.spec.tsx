/**
 * @file post-display.spec.tsx
 * @brief Unit tests for PostDisplay React component with mocked fetch.
 * @details Uses jest.fn() to mock global fetch and jest.spyOn to verify
 * component behaviour. Tests loading, success, and error states without
 * real API calls.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PostDisplay } from '../src/components/PostDisplay';

/**
 * @var mockFetch
 * @type jest.Mock
 * @brief Mock implementation of global fetch.
 * @details Replaces fetch to avoid real HTTP requests during tests.
 */
const mockFetch = jest.fn();

describe('PostDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display loading state initially', () => {
    mockFetch.mockImplementation(
      () =>
        new Promise<Response>(() => {
          /* never resolves to keep loading */
        }),
    );

    render(<PostDisplay apiBaseUrl="http://test.api" postId={1} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch and display post data when API returns success', async () => {
    const mockPost: { userId: number; id: number; title: string; body: string } =
      {
        userId: 1,
        id: 1,
        title: 'Mocked Post Title',
        body: 'Mocked post body content',
      };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPost),
    } as Response);

    render(<PostDisplay apiBaseUrl="http://test.api" postId={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('post-display')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://test.api/posts/1', {
      signal: expect.any(AbortSignal),
    });
    expect(screen.getByTestId('post-title')).toHaveTextContent(
      'Mocked Post Title',
    );
    expect(screen.getByTestId('post-body')).toHaveTextContent(
      'Mocked post body content',
    );
  });

  it('should display error when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network failure'));

    render(<PostDisplay apiBaseUrl="http://test.api" postId={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Error: Network failure/)).toBeInTheDocument();
  });

  it('should display error when API returns non-OK status', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    render(<PostDisplay apiBaseUrl="http://test.api" postId={999} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/HTTP 404/)).toBeInTheDocument();
  });
});
