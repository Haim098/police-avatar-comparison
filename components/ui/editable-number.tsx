"use client"

import React, { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useInlineEdit } from '@/hooks/use-inline-edit'
import { EditableNumberProps } from '@/lib/types/inline-editing'
import { EditingErrorBoundary, DefaultEditingErrorFallback } from './editing-error-boundary'

const EditableNumberComponent = memo(function EditableNumber({
  initialValue,
  storageKey,
  min,
  max,
  step = 1,
  formatter,
  className,
  onSave
}: EditableNumberProps) {
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Memoize validator to prevent recreation on every render
  const memoizedValidator = useCallback((value: number): boolean | string => {
    if (isNaN(value)) {
      return 'ערך חייב להיות מספר'
    }
    
    if (min !== undefined && value < min) {
      return `ערך חייב להיות לפחות ${min}`
    }
    
    if (max !== undefined && value > max) {
      return `ערך חייב להיות לכל היותר ${max}`
    }
    
    return true
  }, [min, max])

  const {
    value,
    isEditing,
    hasChanges,
    startEdit,
    cancelEdit,
    saveEdit
  } = useInlineEdit({
    initialValue,
    key: storageKey,
    validator: memoizedValidator,
    onSave
  })

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    setInputValue(value.toString())
    setValidationError(null)
    startEdit()
  }

  const handleSave = () => {
    try {
      setValidationError(null)
      
      const numericValue = parseFloat(inputValue)
      
      // Validate the numeric value
      const validationResult = memoizedValidator(numericValue)
      if (validationResult !== true) {
        setValidationError(validationResult)
        return
      }
      
      saveEdit(numericValue)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'שגיאה בשמירה'
      setValidationError(errorMessage)
      console.error('Save failed:', error)
    }
  }

  const handleCancel = () => {
    setInputValue('')
    setValidationError(null)
    cancelEdit()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      handleCancel()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const currentValue = parseFloat(inputValue) || 0
      const newValue = currentValue + step
      if (max === undefined || newValue <= max) {
        setInputValue(newValue.toString())
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const currentValue = parseFloat(inputValue) || 0
      const newValue = currentValue - step
      if (min === undefined || newValue >= min) {
        setInputValue(newValue.toString())
      }
    }
  }

  const handleBlur = () => {
    handleSave()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    // Allow empty string, minus sign, and valid number patterns
    if (newValue === '' || newValue === '-' || /^-?\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue)
      setValidationError(null)
    }
  }

  // Format display value with memoization
  const displayValue = useMemo(() => 
    formatter ? formatter(value) : value.toString(), 
    [value, formatter]
  )

  if (isEditing) {
    return (
      <EditingErrorBoundary fallback={DefaultEditingErrorFallback}>
        <div className="inline-block relative">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            min={min}
            max={max}
            step={step}
            aria-label={`עריכת מספר: ${displayValue}`}
            aria-describedby={validationError ? `${storageKey}-error` : `${storageKey}-instructions`}
            className={cn(
              "inline-block min-w-[80px] px-2 py-1 text-sm",
              "border rounded shadow-sm ring-opacity-50",
              "focus:outline-none transition-all duration-200",
              "text-center",
              validationError 
                ? "border-red-500 bg-red-50 ring-2 ring-red-200 focus:ring-red-300"
                : "border-blue-500 bg-blue-50 ring-2 ring-blue-200 focus:ring-blue-300",
              className
            )}
            placeholder="0"
          />
          {validationError && (
            <div 
              id={`${storageKey}-error`}
              role="alert"
              aria-live="assertive"
              className="absolute z-10 mt-1 px-2 py-1 bg-red-100 border border-red-300 rounded text-red-700 text-xs shadow-sm whitespace-nowrap"
            >
              {validationError}
            </div>
          )}
          <div 
            id={`${storageKey}-instructions`}
            className="sr-only"
          >
            השתמש בחיצים למעלה ומטה לשינוי הערך, Enter לשמירה, Escape לביטול
          </div>
          <div className="absolute -bottom-5 left-0 text-xs text-gray-500">
            ↑↓ לשינוי, Enter לשמירה
          </div>
        </div>
      </EditingErrorBoundary>
    )
  }

  return (
    <span
      onClick={handleStartEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleStartEdit()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`מספר ניתן לעריכה: ${displayValue}. לחץ Enter או רווח לעריכה`}
      aria-describedby={`${storageKey}-instructions`}
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "editable-element edit-transition",
        "inline-block min-w-[40px] px-2 py-1 rounded text-center",
        hasChanges && "has-changes",
        className
      )}
    >
      {displayValue}
      <div className="edit-tooltip">
        לחץ לעריכה • ↑↓ לשינוי • Enter לשמירה
      </div>
    </span>
  )
})

export const EditableNumber = EditableNumberComponent