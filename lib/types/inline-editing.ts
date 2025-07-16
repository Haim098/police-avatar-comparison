// Types for inline content editing system

export type ContentType = 'text' | 'number' | 'list'

export interface EditableContent {
  key: string
  originalValue: any
  currentValue: any
  type: ContentType
  lastModified: Date
  isValid: boolean
}

export interface ContentState {
  contents: Record<string, EditableContent>
  hasUnsavedChanges: boolean
  lastSyncTime: Date | null
}

export interface UseInlineEditOptions<T> {
  initialValue: T
  key: string
  validator?: (value: T) => boolean | string
  debounceMs?: number
  onSave?: (value: T) => void
}

export interface UseInlineEditReturn<T> {
  value: T
  isEditing: boolean
  hasChanges: boolean
  startEdit: () => void
  cancelEdit: () => void
  saveEdit: (newValue: T) => void
  resetToOriginal: () => void
}

export interface EditableTextProps {
  initialValue: string
  storageKey: string
  placeholder?: string
  multiline?: boolean
  validator?: (value: string) => boolean | string
  className?: string
  onSave?: (value: string) => void
}

export interface EditableNumberProps {
  initialValue: number
  storageKey: string
  min?: number
  max?: number
  step?: number
  formatter?: (value: number) => string
  className?: string
  onSave?: (value: number) => void
}

export interface ContentManagerInterface {
  save(key: string, value: any): void
  load(key: string): any | null
  remove(key: string): void
  exportAll(): Record<string, any>
  importAll(data: Record<string, any>): void
  resetAll(): void
  hasChanges(): boolean
}

export interface EditingErrorBoundaryProps {
  fallback: React.ComponentType<{error: Error}>
  onError?: (error: Error) => void
  children: React.ReactNode
}