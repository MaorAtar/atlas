// __tests__/CustomLoader.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock @nextui-org/modal
jest.mock('@nextui-org/modal', () => {
  const React = require('react');
  return {
    __esModule: true,
    useDisclosure: () => ({
      isOpen: true,
      onOpen: jest.fn(),
      onOpenChange: jest.fn(),
    }),
    Modal: ({ children }) => <div data-testid="modal">{children}</div>,
    ModalContent: ({ children }) => (
      <div data-testid="modal-content">
        {typeof children === 'function' ? children(() => {}) : children}
      </div>
    ),
    ModalBody: ({ children }) => <div data-testid="modal-body">{children}</div>,
    ModalHeader: ({ children }) => <div data-testid="modal-header">{children}</div>,
    ModalFooter: ({ children }) => <div data-testid="modal-footer">{children}</div>,
  };
});

import CustomLoader from '../src/components/custom/CustomLoader';

describe('CustomLoader', () => {
  it('does not render the modal when isLoading is false', () => {
    render(<CustomLoader isLoading={false} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders the modal wrapper when isLoading is true', () => {
    render(<CustomLoader isLoading={true} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders ModalContent and ModalBody wrappers', () => {
    render(<CustomLoader isLoading={true} />);
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-body')).toBeInTheDocument();
  });

  it('renders the loader image with correct src, alt, and classes', () => {
    render(<CustomLoader isLoading={true} />);
    const img = screen.getByAltText('create-trip');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/create-trip-icons/create-trip.gif');
    expect(img).toHaveClass('w-96', 'h-96', 'mx-auto');
  });

  it('renders the main heading as an H2 with correct text and classes', () => {
    render(<CustomLoader isLoading={true} />);
    const heading = screen.getByRole('heading', { level: 2, name: /planning your trip/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-center', 'text-2xl', 'font-bold', 'text-gray-800');
  });

  it('renders the subheading as an H4 with correct text and classes', () => {
    render(<CustomLoader isLoading={true} />);
    // Fallback: query by text if role level 4 isn't supported
    const sub = screen.getByText(/this usually takes about 2 minutes/i);
    expect(sub).toBeInTheDocument();
    expect(sub.tagName).toBe('H4');
    expect(sub).toHaveClass('text-center', 'text-lg', 'text-gray-600');
  });
});
