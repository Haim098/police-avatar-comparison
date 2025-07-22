"use client"

import React, { useState, useRef, useEffect, memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useInlineEdit } from '@/hooks/use-inline-edit'
import { EditableTextProps } from '@/lib/types/inline-editing'
import { EditingErrorBoundary, DefaultEditingErrorFallback } from './editing-error-boundary'
import { contentManager } from '@/lib/services/content-manager'

const EditableTextComponent = memo(function EditableText({
  initialValue,
  storageKey,
  placeholder = "לחץ לעריכה...",
  multiline = false,
  validator,
  className,
  onSave
}: EditableTextProps) {
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  
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
    validator,
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
    // Check if editing is locked
    if (contentManager.isEditingLocked()) {
      return
    }
    
    setInputValue(value || initialValue)
    setValidationError(null)
    startEdit()
  }

  const handleSave = () => {
    try {
      // Clear previous validation error
      setValidationError(null)
      
      // Validate input if validator is provided
      if (validator) {
        const validationResult = validator(inputValue)
        if (validationResult !== true) {
          const errorMessage = typeof validationResult === 'string' ? validationResult : 'ערך לא תקין'
          setValidationError(errorMessage)
          return
        }
      }
      
      saveEdit(inputValue)
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
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      e.stopPropagation()
      handleSave()
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      handleCancel()
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Only save if we're not clicking on another editable element
    setTimeout(() => {
      if (isEditing) {
        handleSave()
      }
    }, 100)
  }

  const displayValue = useMemo(() => value || placeholder, [value, placeholder])
  const isEmpty = useMemo(() => !value || value.trim() === '', [value])

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input'
    
    return (
      <EditingErrorBoundary fallback={DefaultEditingErrorFallback}>
        <div className="inline-block">
          <InputComponent
            ref={inputRef as any}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label={`עריכת טקסט: ${placeholder}`}
            aria-describedby={validationError ? `${storageKey}-error` : undefined}
            className={cn(
              "inline-block min-w-[100px] px-2 py-1 text-sm",
              "border rounded shadow-sm ring-opacity-50",
              "focus:outline-none transition-all duration-200",
              validationError 
                ? "border-red-500 bg-red-50 ring-2 ring-red-200 focus:ring-red-300"
                : "border-blue-500 bg-blue-50 ring-2 ring-blue-200 focus:ring-blue-300",
              multiline && "min-h-[60px] resize-none",
              className
            )}
            placeholder={placeholder}
            rows={multiline ? 3 : undefined}
          />
          {validationError && (
            <div 
              id={`${storageKey}-error`}
              role="alert"
              aria-live="assertive"
              className="absolute z-10 mt-1 px-2 py-1 bg-red-100 border border-red-300 rounded text-red-700 text-xs shadow-sm"
            >
              {validationError}
            </div>
          )}
          <div 
            id={`${storageKey}-instructions`} 
            className="sr-only"
          >
            {multiline 
              ? "לחץ Enter עם Ctrl לשמירה, Escape לביטול" 
              : "לחץ Enter לשמירה, Escape לביטול"
            }
          </div>
        </div>
      </EditingErrorBoundary>
    )
  }

  const isLocked = contentManager.isEditingLocked()

  return (
    <span
      onClick={handleStartEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleStartEdit()
        }
      }}
      tabIndex={isLocked ? -1 : 0}
      role="button"
      aria-label={
        isLocked 
          ? `טקסט נעול: ${displayValue}. העריכה כרגע נעולה`
          : `טקסט ניתן לעריכה: ${displayValue}. לחץ Enter או רווח לעריכה`
      }
      aria-describedby={`${storageKey}-instructions`}
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "editable-element edit-transition",
        "inline-block min-w-[50px] px-2 py-1 rounded",
        hasChanges && "has-changes",
        isEmpty && "text-gray-400 italic",
        isLocked && "editing-locked",
        className
      )}
    >
      {displayValue}
      {!isLocked && (
        <div className="edit-tooltip">
          לחץ לעריכה • Enter לשמירה • Esc לביטול
        </div>
      )}
    </span>
  )
})

export const EditableText = EditableTextComponent