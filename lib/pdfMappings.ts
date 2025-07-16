// PDF mapping configuration for platform presentations
export interface PDFMapping {
  fileName: string
  displayName: string
  description: string
}

export interface PDFMappings {
  [platformId: string]: PDFMapping
}

export const pdfMappings: PDFMappings = {
  'heygen': {
    fileName: 'HeyGen_AI_Avatars_for_Police_Complaint_Department_Automation.pdf',
    displayName: 'HeyGen AI Avatars',
    description: 'מצגת מפורטת על פלטפורמת HeyGen לאוטומציה של מחלקת תלונות משטרה'
  },
  'soul-machines': {
    fileName: 'Soul_Machines_אווטארים_לאוטומציה_של_מחלקת_תלונות_משטרה.pdf',
    displayName: 'Soul Machines',
    description: 'מצגת מפורטת על פלטפורמת Soul Machines לאוטומציה של מחלקת תלונות משטרה'
  },
  'ravatar': {
    fileName: 'אווטארים_של_Ravatar_לייעול_מחלקת_תלונות_משטרה.pdf',
    displayName: 'Ravatar',
    description: 'מצגת מפורטת על פלטפורמת Ravatar לייעול מחלקת תלונות משטרה'
  },
  'd-id': {
    fileName: 'פתרון_אווטאר_לטיפול_בתלונות_במשטרה_באמצעות_D-ID.pdf',
    displayName: 'D-ID',
    description: 'מצגת מפורטת על פתרון אווטאר לטיפול בתלונות במשטרה באמצעות D-ID'
  },
  'uneeq': {
    fileName: 'uneeq.pdf',
    displayName: 'UneeQ',
    description: 'מצגת מפורטת על פלטפורמת UneeQ לאווטארים דיגיטליים'
  },
  'microsoft-nvidia': {
    fileName: 'פתרונות_אווטאר_אינטראקטיבי_לטיפול_בתלונות_ציבור_עבור_משטרת_ישראל, מיקרוסופט ואינבידיה.pdf',
    displayName: 'Microsoft vs NVIDIA',
    description: 'השוואה מפורטת בין פתרונות Microsoft ו-NVIDIA לאווטארים אינטראקטיביים'
  }
}

// Base path for PDF files
export const PDF_BASE_PATH = '/pdf-Presentation/'