import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableText } from '../editable-text'

// Mock the useInlineEdit hook
jest.mock('@/hooks/use-inline-edit', () => ({
  useInlineEdit: jest.fn()
}))

import { useInlineEdit } from '@/hooks/use-inline-edit'
const mockUseInlineEdit = useInlineEdit as jest.MockedFunction<typeof useInlineEdit>

describe('EditableText', () => {
  const defaultMockReturn = {
    value: 'test value',
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
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    expect(screen.getByText('test value')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should show placeholder when value is empty', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      value: ''
    })

    render(
      <EditableText
        initialValue=""
        storageKey="test-key"
        placeholder="Custom placeholder"
      />
    )

    expect(screen.getByText('Custom placeholder')).toBeInTheDocument()
  })

  it('should start editing when clicked', async () => {
    const user = userEvent.setup()
    const startEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      startEdit
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    await user.click(screen.getByRole('button'))
    expect(startEdit).toHaveBeenCalled()
  })

  it('should start editing when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const startEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      startEdit
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')
    
    expect(startEdit).toHaveBeenCalled()
  })

  it('should render input in editing mode', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render textarea when multiline is true', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
        multiline={true}
      />
    )

    const textarea = screen.getByRole('textbox')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('should save on Enter key (single line)', async () => {
    const user = userEvent.setup()
    const saveEdit = jest.fn()
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true,
      saveEdit
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'new value')
    await user.keyboard('{Enter}')
    
    expect(saveEdit).toHaveBeenCalledWith('test valuenew value')
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
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    await user.keyboard('{Escape}')
    
    expect(cancelEdit).toHaveBeenCalled()
  })

  it('should show validation error', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true
    })

    const validator = jest.fn().mockReturnValue('Validation failed')

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
        validator={validator}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    expect(validator).toHaveBeenCalled()
  })

  it('should show changes indicator', () => {
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      hasChanges: true
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    const element = screen.getByRole('button')
    expect(element).toHaveClass('border-r-orange-400', 'bg-orange-50')
  })

  it('should handle validation errors gracefully', async () => {
    const user = userEvent.setup()
    const saveEdit = jest.fn().mockImplementation(() => {
      throw new Error('Validation failed')
    })
    
    mockUseInlineEdit.mockReturnValue({
      ...defaultMockReturn,
      isEditing: true,
      saveEdit
    })

    render(
      <EditableText
        initialValue="test value"
        storageKey="test-key"
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    await waitFor(() => {
      expect(screen.getByText('Validation failed')).toBeInTheDocument()
    })
  })
})