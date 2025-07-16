import { ContentManagerInterface, EditableContent } from '@/lib/types/inline-editing'

const STORAGE_PREFIX = 'inline-edit-'
const CHANGES_KEY = 'inline-edit-changes'

export class ContentManager implements ContentManagerInterface {
  private static instance: ContentManager
  private memoryFallback: Map<string, any> = new Map()
  private isLocalStorageAvailable: boolean

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability()
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager()
    }
    return ContentManager.instance
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  save(key: string, value: any): void {
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`
      const data = {
        value,
        timestamp: new Date().toISOString(),
        type: typeof value
      }

      if (this.isLocalStorageAvailable) {
        localStorage.setItem(storageKey, JSON.stringify(data))
        this.updateChangesFlag(true)
      } else {
        this.memoryFallback.set(storageKey, data)
      }
    } catch (error) {
      console.warn('Failed to save to localStorage, using memory fallback:', error)
      this.memoryFallback.set(`${STORAGE_PREFIX}${key}`, {
        value,
        timestamp: new Date().toISOString(),
        type: typeof value
      })
    }
  }

  load(key: string): any | null {
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`
      
      if (this.isLocalStorageAvailable) {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const data = JSON.parse(stored)
          return data.value
        }
      }
      
      const memoryData = this.memoryFallback.get(storageKey)
      return memoryData ? memoryData.value : null
    } catch (error) {
      console.warn('Failed to load from localStorage:', error)
      return null
    }
  }

  remove(key: string): void {
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`
      
      if (this.isLocalStorageAvailable) {
        localStorage.removeItem(storageKey)
      }
      
      this.memoryFallback.delete(storageKey)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }

  exportAll(): Record<string, any> {
    const exported: Record<string, any> = {}
    
    try {
      if (this.isLocalStorageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith(STORAGE_PREFIX)) {
            const cleanKey = key.replace(STORAGE_PREFIX, '')
            const data = JSON.parse(localStorage.getItem(key) || '{}')
            exported[cleanKey] = {
              value: data.value,
              timestamp: data.timestamp,
              type: data.type
            }
          }
        }
      }

      // Add memory fallback data
      this.memoryFallback.forEach((data, key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          const cleanKey = key.replace(STORAGE_PREFIX, '')
          exported[cleanKey] = data
        }
      })

      return {
        exportedAt: new Date().toISOString(),
        data: exported
      }
    } catch (error) {
      console.error('Failed to export data:', error)
      return { exportedAt: new Date().toISOString(), data: {} }
    }
  }

  importAll(data: Record<string, any>): void {
    try {
      if (!data.data) {
        throw new Error('Invalid import data format')
      }

      Object.entries(data.data).forEach(([key, value]) => {
        if (typeof value === 'object' && value.value !== undefined) {
          this.save(key, value.value)
        }
      })

      this.updateChangesFlag(true)
    } catch (error) {
      console.error('Failed to import data:', error)
      throw error
    }
  }

  resetAll(): void {
    try {
      if (this.isLocalStorageAvailable) {
        const keysToRemove: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key)
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key))
        localStorage.removeItem(CHANGES_KEY)
      }

      this.memoryFallback.clear()
    } catch (error) {
      console.warn('Failed to reset localStorage:', error)
      this.memoryFallback.clear()
    }
  }

  hasChanges(): boolean {
    try {
      if (this.isLocalStorageAvailable) {
        return localStorage.getItem(CHANGES_KEY) === 'true'
      }
      return this.memoryFallback.size > 0
    } catch {
      return this.memoryFallback.size > 0
    }
  }

  private updateChangesFlag(hasChanges: boolean): void {
    try {
      if (this.isLocalStorageAvailable) {
        if (hasChanges) {
          localStorage.setItem(CHANGES_KEY, 'true')
        } else {
          localStorage.removeItem(CHANGES_KEY)
        }
      }
    } catch (error) {
      console.warn('Failed to update changes flag:', error)
    }
  }
}

// Export singleton instance
export const contentManager = ContentManager.getInstance()