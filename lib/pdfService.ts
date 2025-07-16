import { pdfMappings, PDF_BASE_PATH } from './pdfMappings'

export enum PDFErrorType {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  POPUP_BLOCKED = 'POPUP_BLOCKED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNSUPPORTED_BROWSER = 'UNSUPPORTED_BROWSER'
}

export interface PDFError {
  type: PDFErrorType
  message: string
  platformId: string
  timestamp: Date
}

export class PDFService {
  /**
   * Check if a PDF is available for the given platform
   */
  static isPDFAvailable(platformId: string): boolean {
    const mapping = pdfMappings[platformId]
    return mapping && mapping.fileName.length > 0
  }

  /**
   * Get the full path to a PDF file
   */
  static getPDFPath(platformId: string): string | null {
    const mapping = pdfMappings[platformId]
    if (!mapping || !mapping.fileName) {
      return null
    }
    return `${PDF_BASE_PATH}${mapping.fileName}`
  }

  /**
   * Get display information for a platform
   */
  static getPlatformInfo(platformId: string) {
    return pdfMappings[platformId] || null
  }

  /**
   * Open a PDF in a new tab/window
   */
  static async openPDF(platformId: string): Promise<boolean> {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      console.warn('PDFService.openPDF called in server environment')
      return false
    }

    try {
      const pdfPath = this.getPDFPath(platformId)
      
      if (!pdfPath) {
        this.handlePDFError(platformId, new Error(`PDF not found for platform: ${platformId}`))
        return false
      }

      // Try to open in new tab
      const newWindow = window.open(pdfPath, '_blank', 'noopener,noreferrer')
      
      if (!newWindow || newWindow.closed) {
        // Pop-up was blocked - offer alternative
        this.handlePopupBlocked(platformId, pdfPath)
        return false
      }

      return true
    } catch (error) {
      this.handlePDFError(platformId, error as Error)
      return false
    }
  }

  /**
   * Handle popup blocked scenario
   */
  private static handlePopupBlocked(platformId: string, pdfPath: string) {
    if (typeof window === 'undefined') return
    
    const platformInfo = this.getPlatformInfo(platformId)
    const platformName = platformInfo?.displayName || platformId
    
    const userConfirmed = confirm(
      `חסימת חלונות קופצים מונעת פתיחת המצגת של ${platformName}.\n\nהאם תרצה לפתוח את המצגת בטאב הנוכחי?`
    )
    
    if (userConfirmed) {
      window.location.href = pdfPath
    }
  }

  /**
   * Handle PDF opening errors
   */
  private static handlePDFError(platformId: string, error: Error) {
    let errorType: PDFErrorType
    let message: string

    if (error.message.includes('Pop-up blocked')) {
      errorType = PDFErrorType.POPUP_BLOCKED
      message = 'חסימת חלונות קופצים מונעת פתיחת המצגת. אנא אפשר חלונות קופצים או השתמש בקישור הישיר.'
    } else if (error.message.includes('not found')) {
      errorType = PDFErrorType.FILE_NOT_FOUND
      message = 'המצגת לא נמצאה. אנא נסה שוב מאוחר יותר.'
    } else if (error.message.includes('network')) {
      errorType = PDFErrorType.NETWORK_ERROR
      message = 'שגיאת רשת. אנא בדוק את החיבור לאינטרנט ונסה שוב.'
    } else {
      errorType = PDFErrorType.UNSUPPORTED_BROWSER
      message = 'הדפדפן אינו תומך בפתיחת המצגת. אנא נסה דפדפן אחר.'
    }

    const pdfError: PDFError = {
      type: errorType,
      message,
      platformId,
      timestamp: new Date()
    }

    // Log error for debugging
    console.error('PDF Error:', pdfError)

    // You can extend this to show user notifications
    this.showErrorNotification(pdfError)
  }

  /**
   * Show error notification to user
   */
  private static showErrorNotification(error: PDFError) {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return
    
    // For now, just show an alert. In a real app, you'd use a toast notification
    if (error.type === PDFErrorType.POPUP_BLOCKED) {
      const pdfPath = this.getPDFPath(error.platformId)
      if (pdfPath) {
        const userConfirmed = confirm(
          `${error.message}\n\nהאם תרצה לפתוח את המצגת בטאב הנוכחי?`
        )
        if (userConfirmed) {
          window.location.href = pdfPath
        }
      }
    } else {
      alert(error.message)
    }
  }

  /**
   * Get direct download link for a PDF
   */
  static getDownloadLink(platformId: string): string | null {
    return this.getPDFPath(platformId)
  }
}