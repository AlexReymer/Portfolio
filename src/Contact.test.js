import React from 'react';
import { getByTestId } from '@testing-library/react'

test('Tests that Send Message button is enabled', () => {
    expect(getByTestId('button-contact')).toBeEnabled()
  });