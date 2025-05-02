// __tests__/Features.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '../src/components/custom/Features';

describe('Features component', () => {
  let container;

  beforeEach(() => {
    const result = render(<Features />);
    container = result.container;
  });

  it('renders the section heading', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /why choose us\?/i
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-center', 'mb-12');
  });

  it('wraps content in a root div with proper styling classes', () => {
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('py-20', 'bg-white');
  });

  it('renders exactly three feature items', () => {
    const featureHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(featureHeadings).toHaveLength(3);
  });

  it('renders each feature icon with correct src and alt attributes', () => {
    const icons = [
      '/homepage-icons/globe.png',
      '/homepage-icons/voltage.png',
      '/homepage-icons/money.png'
    ];
    const alts = [
      'Global Destinations',
      'AI-Powered Itineraries',
      'Budget-Friendly'
    ];

    alts.forEach((alt, idx) => {
      const img = screen.getByAltText(alt);
      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('w-32', 'h-32', 'mx-auto');
      expect(img).toHaveAttribute('src', icons[idx]);
    });
  });

  it('renders correct titles for each feature', () => {
    ['Global Destinations', 'AI-Powered Itineraries', 'Budget-Friendly']
      .forEach(title => {
        const titleEl = screen.getByRole('heading', {
          level: 3,
          name: title
        });
        expect(titleEl).toBeInTheDocument();
        expect(titleEl).toHaveClass('text-xl', 'font-semibold');
      });
  });

  it('renders correct descriptions for each feature', () => {
    const descriptions = [
      'Explore curated trips to destinations all over the world.',
      'Quickly generate travel plans tailored to your preferences.',
      'Stay within your budget while experiencing the best.'
    ];

    descriptions.forEach(text => {
      const p = screen.getByText(text);
      expect(p).toBeInTheDocument();
      expect(p).toHaveClass('mt-3', 'text-gray-500');
    });
  });

  it('uses a responsive grid container with proper classes', () => {
    const gridDiv = container.querySelector('div.grid');
    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-3',
      'gap-10',
      'px-6',
      'md:px-20'
    );
  });
});
