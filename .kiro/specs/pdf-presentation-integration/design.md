# Design Document

## Overview

The PDF presentation integration feature will enhance the interactive avatar comparison application by providing seamless access to detailed PDF presentations for each platform. The design focuses on user experience, maintainability, and cross-platform compatibility.

## Architecture

### Component Architecture

```
App
├── PDF Service (utils/pdfService.ts)
├── PDF Mapping Configuration (data/pdfMappings.ts)
├── Enhanced Components
│   ├── SaasComparison (with PDF links)
│   ├── MicrosoftNvidiaComparison (with PDF links)
│   └── Shared PDF Link Component
└── Error Handling & Logging
```

### Data Flow

1. **Initialization**: Load PDF mappings configuration
2. **Rendering**: Components check for PDF availability and render "מצגת מפורטת" buttons
3. **User Interaction**: Button click handler opens PDF in new tab
4. **Error Handling**: Graceful fallback for missing files or blocked pop-ups

## Components and Interfaces

### PDF Service Interface

```typescript
interface PDFService {
  openPDF(platformId: string): Promise<boolean>
  isPDFAvailable(platformId: string): boolean
  getPDFPath(platformId: string): string | null
}
```

### PDF Mapping Configuration

```typescript
interface PDFMapping {
  [platformId: string]: {
    fileName: string
    displayName: string
    description: string
  }
}
```

### PDF Button Component

```typescript
interface PDFButtonProps {
  platformId: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}
```

## Data Models

### PDF Mapping Structure

```typescript
const pdfMappings: PDFMapping = {
  'heygen': {
    fileName: 'HeyGen_AI_Avatars_for_Police_Complaint_Department_Automation.pdf',
    displayName: 'HeyGen AI Avatars',
    description: 'מצגת מפורטת על פלטפורמת HeyGen'
  },
  'soul-machines': {
    fileName: 'Soul_Machines_אווטארים_לאוטומציה_של_מחלקת_תלונות_משטרה.pdf',
    displayName: 'Soul Machines',
    description: 'מצגת מפורטת על פלטפורמת Soul Machines'
  },
  'ravatar': {
    fileName: 'אווטארים_של_Ravatar_לייעול_מחלקת_תלונות_משטרה.pdf',
    displayName: 'Ravatar',
    description: 'מצגת מפורטת על פלטפורמת Ravatar'
  },
  'd-id': {
    fileName: 'פתרון_אווטאר_לטיפול_בתלונות_במשטרה_באמצעות_D-ID.pdf',
    displayName: 'D-ID',
    description: 'מצגת מפורטת על פלטפורמת D-ID'
  },
  'microsoft-nvidia': {
    fileName: 'פתרונות_אווטאר_אינטראקטיבי_לטיפול_בתלונות_ציבור_עבור_משטרת_ישראל, מיקרוסופט ואינבידיה.pdf',
    displayName: 'Microsoft vs NVIDIA',
    description: 'השוואה מפורטת בין Microsoft ו-NVIDIA'
  }
}
```

## Error Handling

### Error Types and Responses

1. **File Not Found**: Log error, show tooltip with "מצגת לא זמינה כרגע"
2. **Pop-up Blocked**: Show modal with direct download link
3. **Network Error**: Retry mechanism with user notification
4. **Unsupported Browser**: Fallback to download link

### Error Handling Strategy

```typescript
enum PDFErrorType {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  POPUP_BLOCKED = 'POPUP_BLOCKED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNSUPPORTED_BROWSER = 'UNSUPPORTED_BROWSER'
}

interface PDFError {
  type: PDFErrorType
  message: string
  platformId: string
  timestamp: Date
}
```

## Testing Strategy

### Unit Tests
- PDF service functionality
- Platform link component rendering
- Error handling scenarios
- Configuration loading

### Integration Tests
- End-to-end PDF opening flow
- Cross-browser compatibility
- Mobile device testing
- Error recovery testing

### User Acceptance Tests
- Platform name clicking functionality
- Visual indicators for clickable elements
- PDF opening in new tabs
- Error message display

## Implementation Considerations

### Performance
- Lazy load PDF availability checking
- Cache PDF mapping configuration
- Minimize bundle size impact

### Accessibility
- Proper ARIA labels for clickable elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### Security
- Validate PDF file paths
- Prevent path traversal attacks
- Content Security Policy compliance
- Safe PDF opening mechanisms

### Browser Compatibility
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Mobile browser optimization
- Pop-up blocker handling
- PDF viewer fallbacks

## Visual Design

### PDF Presentation Buttons
- **Primary Style**: Blue background (#3B82F6) with white text
- **Size**: Medium (px-4 py-2) with PDF icon and text
- **Text**: "מצגת מפורטת" with PDF icon (📄)
- **Hover State**: Darker blue (#1D4ED8) with subtle shadow
- **Border Radius**: Rounded corners (rounded-md)
- **Font**: Medium weight, small size

### Button Placement
- **SaaS Cards**: Bottom right corner of each platform card
- **Comparison Tables**: Additional column or inline with platform name
- **Microsoft vs NVIDIA**: Prominent buttons in each platform section

### Button States
- **Default**: Blue with white text and PDF icon
- **Hover**: Darker blue with shadow effect
- **Loading**: Spinner icon with "פותח..." text
- **Disabled**: Gray background with reduced opacity

### Error States
- **Toast Notifications**: For temporary errors
- **Modal Dialogs**: For critical errors requiring user action
- **Inline Messages**: For persistent issues

## Responsive Design

### Desktop (>1024px)
- Full tooltip functionality
- New tab opening
- Hover effects

### Tablet (768px-1024px)
- Touch-optimized click targets
- Simplified tooltips
- Modal fallbacks for pop-up issues

### Mobile (<768px)
- Large touch targets
- Native PDF viewer integration
- Simplified error handling