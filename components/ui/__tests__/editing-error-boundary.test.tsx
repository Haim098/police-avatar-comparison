import React from 'react'
import { render, screen } from '@testing-library/react'
import { EditingErrorBoundary, DefaultEditingErrorFallback } from '../editing-error-boundary'

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('EditingErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  
  afterAll(() => {
    console.error = originalError
  })

  it('should render children when no error occurs', () => {
    render(
      <EditingErrorBoundary fallback={DefaultEditingErrorFallback}>
        <ThrowError shouldThrow={false} />
      </EditingErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should render fallback when error occurs', () => {
    render(
      <EditingErrorBoundary fallback={DefaultEditingErrorFallback}>
        <ThrowError shouldThrow={true} />
      </EditingErrorBoundary>
    )

    expect(screen.getByText('שגיאה בעריכה:')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('should call onError callback when error occurs', () => {
    const onError = jest.fn()
    
    render(
      <EditingErrorBoundary fallback={DefaultEditingErrorFallback} onError={onError}>
        <ThrowError shouldThrow={true} />
      </EditingErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(expect.any(Error))
  })
})

describe('DefaultEditingErrorFallback', () => {
  it('should display error message', () => {
    const error = new Error('Custom error message')
    
    render(<DefaultEditingErrorFallback error={error} />)

    expect(screen.getByText('שגיאה בעריכה:')).toBeInTheDocument()
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    const error = new Error('Test error')
    
    const { container } = render(<DefaultEditingErrorFallback error={error} />)
    const errorDiv = container.firstChild as HTMLElement

    expect(errorDiv).toHaveClass('bg-red-50', 'border-red-200', 'text-red-700')
  })
})