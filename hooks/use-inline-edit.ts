import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { UseInlineEditOptions, UseInlineEditReturn } from '@/lib/types/inline-editing'
import { contentManager } from '@/lib/services/content-manager'

export function useInlineEdit<T>({
  initialValue,
  key,
  validator,
  debounceMs = 300,
  onSave
}: UseInlineEditOptions<T>): UseInlineEditReturn<T> {
  const [value, setValue] = useState<T>(initialValue)
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [originalValue] = useState<T>(initialValue)
  
  const debounceTimeoutRef = useRef<NodeJS.Timeout>()
  const isMountedRef = useRef(true)

  // Load saved value on mount
  useEffect(() => {
    const savedValue = contentManager.load(key)
    if (savedValue !== null && savedValue !== initialValue) {
      setValue(savedValue)
      setHasChanges(true)
    }
    
    return () => {
      isMountedRef.current = false
    }
  }, [key, initialValue])

  // Memoized debounced save function
  const debouncedSave = useMemo(() => {
    let timeoutId: NodeJS.Timeout | undefined

    return (newValue: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        if (!isMountedRef.current) return

        try {
          // Validate if validator is provided
          if (validator) {
            const validationResult = validator(newValue)
            if (validationResult !== true) {
              console.warn('Validation failed:', validationResult)
              return
            }
          }

          // Save to storage
          contentManager.save(key, newValue)
          
          // Call onSave callback if provided
          if (onSave) {
            onSave(newValue)
          }
        } catch (error) {
          console.error('Failed to save value:', error)
        }
      }, debounceMs)
    }
  }, [key, validator, debounceMs, onSave])

  const startEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const cancelEdit = useCallback(() => {
    setIsEditing(false)
    // Revert to last saved value or original value
    const savedValue = contentManager.load(key)
    if (savedValue !== null) {
      setValue(savedValue)
    } else {
      setValue(originalValue)
      setHasChanges(false)
    }
  }, [key, originalValue])

  const saveEdit = useCallback((newValue: T) => {
    try {
      // Validate if validator is provided
      if (validator) {
        const validationResult = validator(newValue)
        if (validationResult !== true) {
          throw new Error(typeof validationResult === 'string' ? validationResult : 'Validation failed')
        }
      }

      setValue(newValue)
      setIsEditing(false)
      
      const hasActualChanges = newValue !== originalValue
      setHasChanges(hasActualChanges)
      
      if (hasActualChanges) {
        // Save immediately, not with debounce
        contentManager.save(key, newValue)
        
        // Call onSave callback if provided
        if (onSave) {
          onSave(newValue)
        }
      } else {
        // If value is back to original, remove from storage
        contentManager.remove(key)
      }
    } catch (error) {
      console.error('Failed to save value:', error)
      throw error
    }
  }, [validator, originalValue, key, onSave])

  const resetToOriginal = useCallback(() => {
    setValue(originalValue)
    setIsEditing(false)
    setHasChanges(false)
    contentManager.remove(key)
    
    if (onSave) {
      onSave(originalValue)
    }
  }, [originalValue, key, onSave])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return {
    value,
    isEditing,
    hasChanges,
    startEdit,
    cancelEdit,
    saveEdit,
    resetToOriginal
  }
}