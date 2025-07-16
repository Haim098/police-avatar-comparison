import { ContentManager } from '../content-manager'

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

describe('ContentManager', () => {
  let contentManager: ContentManager

  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
    contentManager = new ContentManager()
  })

  describe('save and load', () => {
    it('should save and load string values', () => {
      const key = 'test-key'
      const value = 'test value'
      
      contentManager.save(key, value)
      const loaded = contentManager.load(key)
      
      expect(loaded).toBe(value)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'inline-edit-test-key',
        expect.stringContaining('"value":"test value"')
      )
    })

    it('should save and load number values', () => {
      const key = 'number-key'
      const value = 42
      
      contentManager.save(key, value)
      const loaded = contentManager.load(key)
      
      expect(loaded).toBe(value)
    })

    it('should return null for non-existent keys', () => {
      const loaded = contentManager.load('non-existent')
      expect(loaded).toBeNull()
    })

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full')
      })
      
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      contentManager.save('test', 'value')
      const loaded = contentManager.load('test')
      
      expect(loaded).toBe('value') // Should use memory fallback
      expect(consoleSpy).toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })

  describe('remove', () => {
    it('should remove stored values', () => {
      contentManager.save('test', 'value')
      contentManager.remove('test')
      
      const loaded = contentManager.load('test')
      expect(loaded).toBeNull()
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('inline-edit-test')
    })
  })

  describe('exportAll', () => {
    it('should export all stored data', () => {
      contentManager.save('key1', 'value1')
      contentManager.save('key2', 42)
      
      const exported = contentManager.exportAll()
      
      expect(exported).toHaveProperty('exportedAt')
      expect(exported.data).toHaveProperty('key1')
      expect(exported.data).toHaveProperty('key2')
      expect(exported.data.key1.value).toBe('value1')
      expect(exported.data.key2.value).toBe(42)
    })

    it('should handle export errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Parse error')
      })
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const exported = contentManager.exportAll()
      
      expect(exported).toHaveProperty('exportedAt')
      expect(exported.data).toEqual({})
      expect(consoleSpy).toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })

  describe('importAll', () => {
    it('should import data correctly', () => {
      const importData = {
        exportedAt: new Date().toISOString(),
        data: {
          'key1': { value: 'imported1', timestamp: new Date().toISOString(), type: 'string' },
          'key2': { value: 123, timestamp: new Date().toISOString(), type: 'number' }
        }
      }
      
      contentManager.importAll(importData)
      
      expect(contentManager.load('key1')).toBe('imported1')
      expect(contentManager.load('key2')).toBe(123)
    })

    it('should throw error for invalid import data', () => {
      expect(() => {
        contentManager.importAll({ invalid: 'data' })
      }).toThrow('Invalid import data format')
    })
  })

  describe('resetAll', () => {
    it('should clear all stored data', () => {
      contentManager.save('key1', 'value1')
      contentManager.save('key2', 'value2')
      
      contentManager.resetAll()
      
      expect(contentManager.load('key1')).toBeNull()
      expect(contentManager.load('key2')).toBeNull()
      expect(contentManager.hasChanges()).toBe(false)
    })
  })

  describe('hasChanges', () => {
    it('should return false initially', () => {
      expect(contentManager.hasChanges()).toBe(false)
    })

    it('should return true after saving data', () => {
      contentManager.save('test', 'value')
      expect(contentManager.hasChanges()).toBe(true)
    })

    it('should return false after reset', () => {
      contentManager.save('test', 'value')
      contentManager.resetAll()
      expect(contentManager.hasChanges()).toBe(false)
    })
  })
})