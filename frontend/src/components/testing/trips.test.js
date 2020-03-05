import React from 'react'
import { render } from '@testing-library/react'
import Trips from './trips'
import { mockDataOk, mockDataNULL } from './tripsMockData'

describe('Trips Component', () => {

  it('trips should render a title', () => {
    const { getByTestId } = render(<Trips trips={mockDataOk} />)
    const title = getByTestId('title')
    expect(title).toBeInTheDocument()
  }),

  it('trips should render a title with mockDataNULL', () => {
    const { getByTestId } = render(<Trips trips={mockDataNULL} />)
    const title = getByTestId('title')
    expect(title).toBeInTheDocument()
  })

  it('trips should render a div', () => {
    const { getAllByTestId } = render(<Trips trips={mockDataOk} />)
    const key = getAllByTestId('key')
    expect(key).toHaveLength(3)
  })


})