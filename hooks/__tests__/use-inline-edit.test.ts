import { renderHook, act } from '@testing-library/react'
import { useInlineEdit } from '../use-inline-edit'
import { contentManager } from '@/lib/services/content-manager'

// Mock the content manager
jest.mock('@/lib/services/content-manager', () => ({
  contentManager: {
    load: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  }
}))

const mockContentManager = contentManager as jest.Mocked<typeof contentManager>

describe('useInlineEdit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should initialize with initial value', () => {
    mockContentManager.load.mockReturnValue(null)
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'test',
        key: 'test-key'
      })
    )

    expect(result.current.value).toBe('test')
    expect(result.current.isEditing).toBe(false)
    expect(result.current.hasChanges).toBe(false)
  })

  it('should load saved value on mount', () => {
    mockContentManager.load.mockReturnValue('saved value')
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key'
      })
    )

    expect(result.current.value).toBe('saved value')
    expect(result.current.hasChanges).toBe(true)
  })

  it('should start editing', () => {
    mockContentManager.load.mockReturnValue(null)
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'test',
        key: 'test-key'
      })
    )

    act(() => {
      result.current.startEdit()
    })

    expect(result.current.isEditing).toBe(true)
  })

  it('should cancel editing and revert to saved value', () => {
    mockContentManager.load.mockReturnValue('saved value')
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key'
      })
    )

    act(() => {
      result.current.startEdit()
    })

    act(() => {
      result.current.cancelEdit()
    })

    expect(result.current.isEditing).toBe(false)
    expect(result.current.value).toBe('saved value')
  })

  it('should save edit and update state', () => {
    mockContentManager.load.mockReturnValue(null)
    const onSave = jest.fn()
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key',
        onSave
      })
    )

    act(() => {
      result.current.saveEdit('new value')
    })

    expect(result.current.value).toBe('new value')
    expect(result.current.isEditing).toBe(false)
    expect(result.current.hasChanges).toBe(true)

    // Fast-forward debounce timer
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(mockContentManager.save).toHaveBeenCalledWith('test-key', 'new value')
    expect(onSave).toHaveBeenCalledWith('new value')
  })

  it('should validate before saving', () => {
    mockContentManager.load.mockReturnValue(null)
    const validator = jest.fn().mockReturnValue('Validation error')
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key',
        validator
      })
    )

    expect(() => {
      act(() => {
        result.current.saveEdit('invalid value')
      })
    }).toThrow('Validation error')

    expect(validator).toHaveBeenCalledWith('invalid value')
    expect(mockContentManager.save).not.toHaveBeenCalled()
  })

  it('should reset to original value', () => {
    mockContentManager.load.mockReturnValue('saved value')
    const onSave = jest.fn()
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'original',
        key: 'test-key',
        onSave
      })
    )

    act(() => {
      result.current.resetToOriginal()
    })

    expect(result.current.value).toBe('original')
    expect(result.current.hasChanges).toBe(false)
    expect(result.current.isEditing).toBe(false)
    expect(mockContentManager.remove).toHaveBeenCalledWith('test-key')
    expect(onSave).toHaveBeenCalledWith('original')
  })

  it('should remove from storage when value returns to original', () => {
    mockContentManager.load.mockReturnValue(null)
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'original',
        key: 'test-key'
      })
    )

    act(() => {
      result.current.saveEdit('original')
    })

    expect(result.current.hasChanges).toBe(false)
    expect(mockContentManager.remove).toHaveBeenCalledWith('test-key')
  })

  it('should handle custom debounce time', () => {
    mockContentManager.load.mockReturnValue(null)
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key',
        debounceMs: 500
      })
    )

    act(() => {
      result.current.saveEdit('new value')
    })

    // Should not save immediately
    expect(mockContentManager.save).not.toHaveBeenCalled()

    // Should save after custom debounce time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(mockContentManager.save).toHaveBeenCalledWith('test-key', 'new value')
  })

  it('should handle successful validation', () => {
    mockContentManager.load.mockReturnValue(null)
    const validator = jest.fn().mockReturnValue(true)
    
    const { result } = renderHook(() =>
      useInlineEdit({
        initialValue: 'initial',
        key: 'test-key',
        validator
      })
    )

    act(() => {
      result.current.saveEdit('valid value')
    })

    expect(result.current.value).toBe('valid value')
    expect(validator).toHaveBeenCalledWith('valid value')
    
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    expect(mockContentManager.save).toHaveBeenCalledWith('test-key', 'valid value')
  })
})