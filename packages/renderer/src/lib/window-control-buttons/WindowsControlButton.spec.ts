/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';

import WindowsControlButton from './WindowsControlButton.svelte';

beforeEach(() => {
  vi.resetAllMocks();
  (window as any).windowClose = vi.fn().mockResolvedValue(undefined);
});

test('Check Maximize/Restore', async () => {
  render(WindowsControlButton, { name: 'Maximize' });

  const customButton = screen.getByRole('button', { name: 'Maximize' });
  expect(customButton).toBeInTheDocument();

  // check the title of the button is 'Maximize'
  expect(customButton).toHaveAttribute('title', 'Maximize');

  // click on the button
  await fireEvent.click(customButton);

  // check the title of the button is 'Restore'
  expect(customButton).toHaveAttribute('title', 'Restore');

  // click on the button
  await fireEvent.click(customButton);

  // check the title of the button is 'Maximize'
  expect(customButton).toHaveAttribute('title', 'Maximize');
});

test('Check Windows Maximize control button colors', async () => {
  render(WindowsControlButton, { name: 'Maximize' });

  const customButton = screen.getByRole('button', { name: 'Maximize' });
  expect(customButton).toBeInTheDocument();

  expect(customButton).toHaveClass('text-[var(--pd-titlebar-icon)]');
  expect(customButton).toHaveClass('hover:bg-[var(--pd-titlebar-windows-hover-bg)]');
});

test('Check Windows Minimize control button colors', async () => {
  render(WindowsControlButton, { name: 'Minimize' });

  const customButton = screen.getByRole('button', { name: 'Minimize' });
  expect(customButton).toBeInTheDocument();

  expect(customButton).toHaveClass('text-[var(--pd-titlebar-icon)]');
  expect(customButton).toHaveClass('hover:bg-[var(--pd-titlebar-windows-hover-bg)]');
});

test('Check Windows Close control button colors', async () => {
  render(WindowsControlButton, { name: 'Close' });

  const customButton = screen.getByRole('button', { name: 'Close' });
  expect(customButton).toBeInTheDocument();

  expect(customButton).toHaveClass('text-[var(--pd-titlebar-icon)]');
  expect(customButton).toHaveClass('hover:bg-[var(--pd-titlebar-windows-hover-exit-bg)]');
  expect(customButton).toHaveClass('hover:text-white');
});
