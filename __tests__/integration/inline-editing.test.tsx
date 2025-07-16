import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableText } from '@/components/ui/editable-text'
import { EditableNumber } from '@/components/ui/editable-number'
import { ContentControls } from '@/components/ui/content-controls'
import { contentManager } from '@/lib/services/content-manager'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    key: jest.fn((index: number) => {
      const keys = Object.keys(store)
      return keys[index] || null
    }),
    get length() {
      return Object.keys(store).length
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn()
  }
})

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('Inline Editing Integration Tests', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('Full Edit Cycle', () => {
    it('should complete full edit cycle for text', async () => {
      const user = userEvent.setup()
      
      render(
        <EditableText
          initialValue="Original Text"
          storageKey="test-text"
        />
      )

      // Initial state
      expect(screen.getByText('Original Text')).toBeInTheDocument()

      // Start editing
      await user.click(screen.getByRole('button'))
      
      // Should show input
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('Original Text')

      // Edit text
      await user.clear(input)
      await user.type(input, 'New Text')

      // Save by pressing Enter
      await user.keyboard('{Enter}')

      // Should show new text
      await waitFor(() => {
        expect(screen.getByText('New Text')).toBeInTheDocument()
      })

      // Should persist in localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'inline-edit-test-text',
        expect.stringContaining('"value":"New Text"')
      )
    })

    it('should complete full edit cycle for numbers', async () => {
      const user = userEvent.setup()
      
      render(
        <EditableNumber
          initialValue={42}
          storageKey="test-number"
        />
      )

      // Initial state
      expect(screen.getByText('42')).toBeInTheDocument()

      // Start editing
      await user.click(screen.getByRole('button'))
      
      // Should show input
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('42')

      // Edit number
      await user.clear(input)
      await user.type(input, '100')

      // Save by pressing Enter
      await user.keyboard('{Enter}')

      // Should show new number
      await waitFor(() => {
        expect(screen.getByText('100')).toBeInTheDocument()
      })

      // Should persist in localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'inline-edit-test-number',
        expect.stringContaining('"value":100')
      )
    })
  })

  describe('Persistence After Page Reload', () => {
    it('should load saved values after page reload', () => {
      // Simulate saved data in localStorage
      localStorageMock.setItem(
        'inline-edit-test-key',
        JSON.stringify({
          value: 'Saved Value',
          timestamp: new Date().toISOString(),
          type: 'string'
        })
      )

      render(
        <EditableText
          initialValue="Original Value"
          storageKey="test-key"
        />
      )

      // Should show saved value, not initial value
      expect(screen.getByText('Saved Value')).toBeInTheDocument()
      expect(screen.queryByText('Original Value')).not.toBeInTheDocument()
    })
  })

  describe('Multiple Elements Interaction', () => {
    it('should handle multiple editable elements independently', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <EditableText
            initialValue="Text 1"
            storageKey="text-1"
          />
          <EditableText
            initialValue="Text 2"
            storageKey="text-2"
          />
          <EditableNumber
            initialValue={10}
            storageKey="number-1"
          />
        </div>
      )

      // Edit first text
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      
      let input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, 'Modified Text 1')
      await user.keyboard('{Enter}')

      // Edit number
      await user.click(buttons[2])
      
      input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, '50')
      await user.keyboard('{Enter}')

      // Verify both changes
      await waitFor(() => {
        expect(screen.getByText('Modified Text 1')).toBeInTheDocument()
        expect(screen.getByText('50')).toBeInTheDocument()
        expect(screen.getByText('Text 2')).toBeInTheDocument() // Unchanged
      })

      // Verify separate storage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'inline-edit-text-1',
        expect.stringContaining('"value":"Modified Text 1"')
      )
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'inline-edit-number-1',
        expect.stringContaining('"value":50')
      )
    })
  })

  describe('Error Recovery', () => {
    it('should handle localStorage failures gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock localStorage to throw error
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full')
      })

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      render(
        <EditableText
          initialValue="Test"
          storageKey="test-key"
        />
      )

      // Edit should still work
      await user.click(screen.getByRole('button'))
      const input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, 'New Value')
      await user.keyboard('{Enter}')

      // Should show new value (using memory fallback)
      await waitFor(() => {
        expect(screen.getByText('New Value')).toBeInTheDocument()
      })

      // Should log warning
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should handle validation errors properly', async () => {
      const user = userEvent.setup()
      
      render(
        <EditableNumber
          initialValue={50}
          storageKey="test-number"
          min={0}
          max={100}
        />
      )

      await user.click(screen.getByRole('button'))
      const input = screen.getByRole('textbox')
      
      // Try to enter invalid value
      await user.clear(input)
      await user.type(input, '150')
      await user.keyboard('{Enter}')

      // Should show validation error
      await waitFor(() => {
        expect(screen.getByText('ערך חייב להיות לכל היותר 100')).toBeInTheDocument()
      })

      // Should not save invalid value
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
        'inline-edit-test-number',
        expect.stringContaining('"value":150')
      )
    })
  })

  describe('Keyboard Navigation Flow', () => {
    it('should support full keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <EditableText
            initialValue="Text 1"
            storageKey="text-1"
          />
          <EditableText
            initialValue="Text 2"
            storageKey="text-2"
          />
        </div>
      )

      // Tab to first element
      await user.tab()
      expect(screen.getAllByRole('button')[0]).toHaveFocus()

      // Enter to edit
      await user.keyboard('{Enter}')
      expect(screen.getByRole('textbox')).toHaveFocus()

      // Edit and save
      await user.keyboard('{Control>}a{/Control}')
      await user.type(screen.getByRole('textbox'), 'Modified')
      await user.keyboard('{Enter}')

      // Tab to next element
      await user.tab()
      expect(screen.getAllByRole('button')[1]).toHaveFocus()

      // Verify first element was saved
      expect(screen.getByText('Modified')).toBeInTheDocument()
    })

    it('should handle Escape key to cancel editing', async () => {
      const user = userEvent.setup()
      
      render(
        <EditableText
          initialValue="Original"
          storageKey="test-key"
        />
      )

      await user.click(screen.getByRole('button'))
      const input = screen.getByRole('textbox')
      
      await user.clear(input)
      await user.type(input, 'Modified')
      
      // Cancel with Escape
      await user.keyboard('{Escape}')

      // Should revert to original
      await waitFor(() => {
        expect(screen.getByText('Original')).toBeInTheDocument()
      })

      // Should not save
      expect(localStorageMock.setItem).not.toHaveBeenCalled()
    })
  })

  describe('Content Controls Integration', () => {
    it('should show content controls when there are changes', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <EditableText
            initialValue="Test"
            storageKey="test-key"
          />
          <ContentControls />
        </div>
      )

      // Initially no changes
      expect(screen.getByText('אין שינויים לשמירה')).toBeInTheDocument()

      // Make a change
      await user.click(screen.getByRole('button'))
      const input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, 'Modified')
      await user.keyboard('{Enter}')

      // Should show controls for changes
      await waitFor(() => {
        expect(screen.getByText('יש שינויים שלא נשמרו')).toBeInTheDocument()
        expect(screen.getByText('ייצא שינויים')).toBeInTheDocument()
        expect(screen.getByText('בטל שינויים')).toBeInTheDocument()
      })
    })
  })
})