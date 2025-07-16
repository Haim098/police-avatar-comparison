"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { contentManager } from '@/lib/services/content-manager'
import { Download, RotateCcw, Save, AlertTriangle } from 'lucide-react'

interface ContentControlsProps {
  className?: string
}

export function ContentControls({ className }: ContentControlsProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const hasChanges = contentManager.hasChanges()

  const handleExportChanges = async () => {
    try {
      setIsExporting(true)
      
      const exportData = contentManager.exportAll()
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      // Create download link
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `content-changes-${new Date().toISOString().split('T')[0]}.json`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Cleanup
      URL.revokeObjectURL(url)
      
      toast.success('השינויים יוצאו בהצלחה', {
        description: 'הקובץ הורד למחשב שלך'
      })
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('שגיאה בייצוא השינויים', {
        description: 'נסה שוב או פנה לתמיכה טכנית'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleResetChanges = async () => {
    try {
      setIsResetting(true)
      
      contentManager.resetAll()
      
      // Refresh the page to show original content
      window.location.reload()
      
      toast.success('כל השינויים בוטלו', {
        description: 'התוכן חזר למצב המקורי'
      })
    } catch (error) {
      console.error('Reset failed:', error)
      toast.error('שגיאה בביטול השינויים', {
        description: 'נסה שוב או רענן את הדף'
      })
    } finally {
      setIsResetting(false)
      setIsResetDialogOpen(false)
    }
  }

  const handleImportChanges = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      try {
        const text = await file.text()
        const data = JSON.parse(text)
        
        contentManager.importAll(data)
        
        // Refresh the page to show imported content
        window.location.reload()
        
        toast.success('השינויים יובאו בהצלחה', {
          description: 'התוכן עודכן בהתאם לקובץ שנבחר'
        })
      } catch (error) {
        console.error('Import failed:', error)
        toast.error('שגיאה בייבוא השינויים', {
          description: 'וודא שהקובץ תקין ונסה שוב'
        })
      }
    }
    
    input.click()
  }

  if (!hasChanges) {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
        <Save className="h-4 w-4" />
        <span>אין שינויים לשמירה</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleImportChanges}
          className="mr-2"
        >
          <Download className="h-4 w-4 ml-1" />
          ייבא שינויים
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
        <AlertTriangle className="h-4 w-4" />
        <span>יש שינויים שלא נשמרו</span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportChanges}
        disabled={isExporting}
        className="flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        {isExporting ? 'מייצא...' : 'ייצא שינויים'}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleImportChanges}
        className="flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        ייבא שינויים
      </Button>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="h-4 w-4" />
            בטל שינויים
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>בטל את כל השינויים?</DialogTitle>
            <DialogDescription>
              פעולה זו תמחק את כל השינויים שביצעת ותחזיר את התוכן למצב המקורי.
              לא ניתן לבטל פעולה זו.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetDialogOpen(false)}
              disabled={isResetting}
            >
              ביטול
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetChanges}
              disabled={isResetting}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              {isResetting ? 'מבטל...' : 'בטל שינויים'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}