import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableNumber } from '../editable-number'

// Mock the useInlineEdit hook
jest.mock('@/hooks/use-inline-edit', () => ({
  useInlineEdit: jest.fn()
}))

import { useInlineEdit } from '@/hooks/use-inline-edit'
const mockUseInlineEdit = useInlineEdit as jest.MockedFunction<typeof useInlineEdit>

describe('EditableNumber', () => {
  const defaultMockReturn = {
    value: 42,
    isEditing: false,
    hasChanges: false,
    startEdit: jest.fn(),
    cancelEdit: jest.fn(),
    saveEdit: jest.fn(),
    resetToOriginal: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseInlineEdit.mockReturnValue(defaultMockReturn)
  })

  it('should render display mode by default', () => {
    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should use custom formatter', () => {
    const formatter = (value: number) => `$${value.toFixed(2)}`
    
    render(
      <EditableNumber
        initialValue={42.5}
        storageKey="test-key"
        formatter={formatter}
      />
    )

    expect(screen.getByText('$42.50')).toBeInTheDocument()
  })

  it('should start editing when clicked', async () => {
    const user = userEvent.setup()
    const startEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      startEdit
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    await user.click(screen.getByRole('button'))
    expect(startEdit).toHaveBeenCalled()
  })

  it('should render input in editing mode', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('inputMode', 'numeric')
  })

  it('should save on Enter key', async () => {
    const user = userEvent.setup()
    const saveEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true,
      saveEdit
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, '100')
    await user.keyboard('{Enter}')
    
    expect(saveEdit).toHaveBeenCalledWith(100)
  })

  it('should cancel on Escape key', async () => {
    const user = userEvent.setup()
    const cancelEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true,
      cancelEdit
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    await user.keyboard('{Escape}')
    
    expect(cancelEdit).toHaveBeenCalled()
  })

  it('should increment value on ArrowUp', async () => {
    const user = userEvent.setup()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
        step={5}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    await user.keyboard('{ArrowUp}')
    
    expect(input.value).toBe('47')
  })

  it('should decrement value on ArrowDown', async () => {
    const user = userEvent.setup()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
        step={3}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    await user.keyboard('{ArrowDown}')
    
    expect(input.value).toBe('39')
  })

  it('should respect min value constraint', async () => {
    const user = userEvent.setup()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={5}
        storageKey="test-key"
        min={0}
        step={10}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    await user.keyboard('{ArrowDown}')
    
    // Should not go below min value
    expect(input.value).toBe('5')
  })

  it('should respect max value constraint', async () => {
    const user = userEvent.setup()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={95}
        storageKey="test-key"
        max={100}
        step={10}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    await user.keyboard('{ArrowUp}')
    
    // Should not go above max value
    expect(input.value).toBe('95')
  })

  it('should validate numeric input', async () => {
    const user = userEvent.setup()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    // Should allow valid numbers
    await user.clear(input)
    await user.type(input, '123.45')
    expect(input.value).toBe('123.45')
    
    // Should allow negative numbers
    await user.clear(input)
    await user.type(input, '-67.89')
    expect(input.value).toBe('-67.89')
    
    // Should not allow invalid characters
    await user.clear(input)
    await user.type(input, 'abc')
    expect(input.value).toBe('')
  })

  it('should show validation error for invalid range', async () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={50}
        storageKey="test-key"
        min={0}
        max={100}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '150' } })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(screen.getByText('ערך חייב להיות לכל היותר 100')).toBeInTheDocument()
    })
  })

  it('should show validation error for non-numeric input', async () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(screen.getByText('ערך חייב להיות מספר')).toBeInTheDocument()
    })
  })

  it('should show changes indicator', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      hasChanges: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    const element = screen.getByRole('button')
    expect(element).toHaveClass('border-r-orange-400', 'bg-orange-50')
  })

  it('should show keyboard hints in editing mode', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableNumber
        initialValue={42}
        storageKey="test-key"
      />
    )

    expect(screen.getByText('↑↓ לשינוי, Enter לשמירה')).toBeInTheDocument()
  })
})