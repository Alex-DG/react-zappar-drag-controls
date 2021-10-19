import { render, screen } from '@testing-library/react'

import App from '.'

/**
 * TODO: fix  Cannot find module 'worker-loader!./worker' from 'node_modules/@zappar/zappar-cv/lib/worker-client.js'
 */
test('renders zappar link', () => {
  render(<App />)
  const linkElement = screen.getByText(
    /Zappar: Augmented, Virtual & Mixed Reality Solution/i
  )
  expect(linkElement).toBeInTheDocument()
})

test('renders allow camera button', () => {
  render(<App />)
  const linkElement = screen.getByText(/Allow Camera/i)
  expect(linkElement).toBeInTheDocument()
})
