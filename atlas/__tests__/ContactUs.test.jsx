// __tests__/ContactUs.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from '../src/components/custom/ContactUs';

describe('ContactUs component', () => {
  let container;

  beforeEach(() => {
    const result = render(<ContactUs />);
    container = result.container;
  });

  it('renders the main heading', () => {
    const mainHeading = screen.getByRole('heading', {
      level: 2,
      name: /we're here to help you plan your trip/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  it('main heading has correct styling classes', () => {
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveClass('text-4xl', 'font-bold', 'mb-4');
  });

  it('renders the subheading', () => {
    const subHeading = screen.getByRole('heading', {
      level: 3,
      name: /our team is available to help you with any questions that might arise\./i,
    });
    expect(subHeading).toBeInTheDocument();
  });

  it('subheading has correct styling classes', () => {
    const subHeading = screen.getByRole('heading', { level: 3 });
    expect(subHeading).toHaveClass('text-xl', 'text-gray-700', 'mb-6');
  });

  it('renders the contact link with correct text and href', () => {
    const link = screen.getByRole('link', { name: /contact us/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(/^Contact Us$/);
    expect(link).toHaveAttribute(
      'href',
      'mailto:maorat@ac.sce.ac.il, guyez@ac.sce.ac.il'
    );
  });

  it('link has correct styling classes', () => {
    const link = screen.getByRole('link', { name: /contact us/i });
    expect(link).toHaveClass(
      'inline-flex',
      'items-center',
      'px-6',
      'py-3',
      'bg-teal-500',
      'text-white',
      'text-lg',
      'rounded-lg'
    );
    // ensure hover variants are present in the class list
    expect(link.className).toContain('hover:bg-teal-600');
    expect(link.className).toContain('hover:text-white');
  });

  it('renders the paper plane icon inside the link', () => {
    const link = screen.getByRole('link', { name: /contact us/i });
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('icon svg has correct styling classes', () => {
    const svg = screen.getByRole('link', { name: /contact us/i }).querySelector('svg');
    expect(svg).toHaveClass('mr-2', 'text-xl');
  });

  it('root div has correct styling classes', () => {
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('py-16', 'bg-teal-50', 'text-center');
  });
});
