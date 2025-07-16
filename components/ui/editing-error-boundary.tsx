"use client"

import React from 'react'
import { EditingErrorBoundaryProps } from '@/lib/types/inline-editing'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class EditingErrorBoundary extends React.Component<
  EditingErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: EditingErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Editing Error Boundary caught an error:', error, errorInfo)
    
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return <this.props.fallback error={this.state.error!} />
    }

    return this.props.children
  }
}

// Default fallback component
export function DefaultEditingErrorFallback({ error }: { error: Error }) {
  return (
    <div className="inline-block px-2 py-1 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
      <span className="font-medium">שגיאה בעריכה:</span>
      <span className="mr-1">{error.message}</span>
    </div>
  )
}