"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Loader2 } from "lucide-react"
import { PDFService } from "@/lib/pdfService"
import { cn } from "@/lib/utils"

export interface PDFButtonProps {
  platformId: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  children?: React.ReactNode
}

export function PDFButton({ 
  platformId, 
  className, 
  size = 'md', 
  variant = 'primary',
  disabled = false,
  children 
}: PDFButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  // Check if PDF is available for this platform
  const isPDFAvailable = PDFService.isPDFAvailable(platformId)
  const platformInfo = PDFService.getPlatformInfo(platformId)

  // Don't render button if no PDF is available
  if (!isPDFAvailable || !platformInfo) {
    return null
  }

  const handleClick = async () => {
    if (isLoading || disabled || typeof window === 'undefined') return

    setIsLoading(true)
    
    try {
      const success = await PDFService.openPDF(platformId)
      // Don't log errors here as PDFService handles them
    } catch (error) {
      console.error('Error in PDF button click:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600'
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "font-medium transition-all duration-200 shadow-sm hover:shadow-md",
        "flex items-center space-x-2 space-x-reverse",
        sizeClasses[size],
        variantClasses[variant],
        isLoading && "opacity-75 cursor-not-allowed",
        className
      )}
      title={platformInfo.description}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>פותח...</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          <span>{children || "מצגת מפורטת"}</span>
        </>
      )}
    </Button>
  )
}