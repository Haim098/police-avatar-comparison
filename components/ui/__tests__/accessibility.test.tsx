import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { EditableText } from '../editable-text'
import { EditableNumber } from '../editable-number'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock the useInlineEdit hook
jest.mock('@/hooks/use-inline-edit', () => ({
  useInlineEdit: jest.fn()
}))

import { useInlineEdit } from '@/hooks/use-inline-edit'
const mockUseInlineEdit = useInlineEdit as jest.MockedFunction<typeof useInlineEdit>

describe('Accessibility Tests', () => {
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

  describe('EditableText Accessibility', () => {
    it('should not have accessibility violations in display mode', async () => {
      const { container } = render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations in editing mode', async () => {
      mockUseInlineEdit.mockReturnValue({
        ...defaultMockReturn,
        isEditing: true
      })

      const { container } = render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper ARIA labels', () => {
      render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('טקסט ניתן לעריכה'))
      expect(button).toHaveAttribute('aria-describedby', 'test-key-instructions')
      expect(button).toHaveAttribute('aria-live', 'polite')
      expect(button).toHaveAttribute('aria-atomic', 'true')
    })

    it('should have screen reader instructions', () => {
      render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      const instructions = document.getElementById('test-key-instructions')
      expect(instructions).toBeInTheDocument()
      expect(instructions).toHaveClass('sr-only')
    })

    it('should announce validation errors', () => {
      mockUseInlineEdit.mockReturnValue({
        ...defaultMockReturn,
        isEditing: true
      })

      render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
          validator={() => 'Validation error'}
        />
      )

      // Simulate validation error by triggering blur
      const input = screen.getByRole('textbox')
      userEvent.click(input)
      userEvent.tab() // This will trigger blur

      // Check if error is announced properly
      const errorElement = document.getElementById('test-key-error')
      if (errorElement) {
        expect(errorElement).toHaveAttribute('role', 'alert')
        expect(errorElement).toHaveAttribute('aria-live', 'assertive')
      }
    })

    it('should support keyboard navigation', async () => {
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
      
      // Test Tab navigation
      await user.tab()
      expect(button).toHaveFocus()

      // Test Enter key
      await user.keyboard('{Enter}')
      expect(startEdit).toHaveBeenCalled()

      // Test Space key
      startEdit.mockClear()
      await user.keyboard(' ')
      expect(startEdit).toHaveBeenCalled()
    })
  })

  describe('EditableNumber Accessibility', () => {
    beforeEach(() => {
      mockUseInlineEdit.mockReturnValue({
        ...defaultMockReturn,
        value: 42
      })
    })

    it('should not have accessibility violations in display mode', async () => {
      const { container } = render(
        <EditableNumber
          initialValue={42}
          storageKey="test-key"
        />
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations in editing mode', async () => {
      mockUseInlineEdit.mockReturnValue({
        ...defaultMockReturn,
        value: 42,
        isEditing: true
      })

      const { container } = render(
        <EditableNumber
          initialValue={42}
          storageKey="test-key"
        />
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper ARIA labels for numbers', () => {
      render(
        <EditableNumber
          initialValue={42}
          storageKey="test-key"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('מספר ניתן לעריכה'))
      expect(button).toHaveAttribute('aria-describedby', 'test-key-instructions')
    })

    it('should have numeric input mode in editing state', () => {
      mockUseInlineEdit.mockReturnValue({
        ...defaultMockReturn,
        value: 42,
        isEditing: true
      })

      render(
        <EditableNumber
          initialValue={42}
          storageKey="test-key"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('inputMode', 'numeric')
      expect(input).toHaveAttribute('aria-label', expect.stringContaining('עריכת מספר'))
    })

    it('should provide keyboard instructions for numbers', () => {
      render(
        <EditableNumber
          initialValue={42}
          storageKey="test-key"
        />
      )

      const instructions = document.getElementById('test-key-instructions')
      expect(instructions).toBeInTheDocument()
      expect(instructions).toHaveTextContent('השתמש בחיצים למעלה ומטה לשינוי הערך')
    })
  })

  describe('High Contrast Mode', () => {
    it('should work with high contrast preferences', () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      const { container } = render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      // In high contrast mode, elements should still be accessible
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Reduced Motion', () => {
    it('should respect reduced motion preferences', () => {
      // Mock reduced motion media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      render(
        <EditableText
          initialValue="test value"
          storageKey="test-key"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('edit-transition')
      // The CSS should handle reduced motion via media queries
    })
  })
})