/** @jsx jsx */
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { jsx, css } from '.'

afterEach(cleanup)

const SpaceTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={{ space: { 1: 4, 2: 8 } }}>{children}</ThemeProvider>
  )
}

describe('#jsx', () => {
  it('does nothing without css prop', () => {
    const { container } = render(<div />)
    expect(container.firstChild!.nodeName).toBe('DIV')
  })

  it('handles css string', () => {
    const { container } = render(
      <SpaceTheme>
        <div
          // @ts-expect-error
          css={css`
            margin: 2;
            padding: 1;
            margin-top: 2px;
          `}
        />
      </SpaceTheme>,
    )
    expect(container.firstChild).toHaveStyle(`
      margin: 2px 8px 8px 8px;
      padding: 4px;
    `)
  })

  it('handles array of css string', () => {
    const { container } = render(
      <SpaceTheme>
        <div
          // @ts-expect-error
          css={[
            css`
              margin: 2;
            `,
            css`
              padding: 1;
            `,
          ]}
        />
      </SpaceTheme>,
    )
    expect(container.firstChild).toHaveStyle(`
      margin: 8px;
      padding: 4px;
    `)
  })

  it('handles css objects', () => {
    const { container } = render(
      <SpaceTheme>
        <div
          // @ts-expect-error
          css={{ margin: '2' }}
        />
      </SpaceTheme>,
    )
    expect(container.firstChild).toHaveStyle(`
      margin: 8px;
    `)
  })

  it('handles array of css objects', () => {
    const { container } = render(
      <SpaceTheme>
        <div
          // @ts-expect-error
          css={[{ margin: '2' }, { padding: '1' }]}
        />
      </SpaceTheme>,
    )
    expect(container.firstChild).toHaveStyle(`
      margin: 8px;
      padding: 4px;
    `)
  })
})
