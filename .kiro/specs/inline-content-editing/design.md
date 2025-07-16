# מסמך עיצוב - עריכת תוכן מוטבעת

## סקירה כללית

המערכת תספק יכולת עריכת תוכן מוטבעת (inline editing) שמאפשרת למשתמשים לערוך טקסט, מספרים ורשימות ישירות בדפדפן. הפתרון יהיה מבוסס על React hooks ו-TypeScript, ויתאים לארכיטקטורת Next.js הקיימת של הפרויקט.

## ארכיטקטורה

### רכיבי המערכת

```
┌─────────────────────────────────────────┐
│              UI Components              │
├─────────────────────────────────────────┤
│  EditableText │ EditableNumber │ List   │
├─────────────────────────────────────────┤
│           useInlineEdit Hook            │
├─────────────────────────────────────────┤
│         ContentManager Service         │
├─────────────────────────────────────────┤
│      LocalStorage │ ValidationUtils    │
└─────────────────────────────────────────┘
```

### עקרונות עיצוב

1. **Progressive Enhancement** - האתר יעבוד גם ללא JavaScript
2. **Type Safety** - שימוש מלא ב-TypeScript
3. **Accessibility** - תמיכה מלאה ב-ARIA ו-keyboard navigation
4. **Performance** - עדכונים מקומיים עם debouncing
5. **User Experience** - אינדיקציות ויזואליות ברורות

## קומפוננטים וממשקים

### 1. Hook עיקרי - useInlineEdit

```typescript
interface UseInlineEditOptions<T> {
  initialValue: T
  key: string
  validator?: (value: T) => boolean | string
  debounceMs?: number
  onSave?: (value: T) => void
}

interface UseInlineEditReturn<T> {
  value: T
  isEditing: boolean
  hasChanges: boolean
  startEdit: () => void
  cancelEdit: () => void
  saveEdit: (newValue: T) => void
  resetToOriginal: () => void
}
```

### 2. קומפוננט EditableText

```typescript
interface EditableTextProps {
  initialValue: string
  storageKey: string
  placeholder?: string
  multiline?: boolean
  validator?: (value: string) => boolean | string
  className?: string
  onSave?: (value: string) => void
}
```

### 3. קומפוננט EditableNumber

```typescript
interface EditableNumberProps {
  initialValue: number
  storageKey: string
  min?: number
  max?: number
  step?: number
  formatter?: (value: number) => string
  className?: string
  onSave?: (value: number) => void
}
```

### 4. שירות ContentManager

```typescript
class ContentManager {
  static save(key: string, value: any): void
  static load(key: string): any | null
  static remove(key: string): void
  static exportAll(): Record<string, any>
  static importAll(data: Record<string, any>): void
  static resetAll(): void
  static hasChanges(): boolean
}
```

## מודלי נתונים

### EditableContent

```typescript
interface EditableContent {
  key: string
  originalValue: any
  currentValue: any
  type: 'text' | 'number' | 'list'
  lastModified: Date
  isValid: boolean
}
```

### ContentState

```typescript
interface ContentState {
  contents: Record<string, EditableContent>
  hasUnsavedChanges: boolean
  lastSyncTime: Date | null
}
```

## טיפול בשגיאות

### אסטרטגיות טיפול בשגיאות

1. **Validation Errors**
   - הצגת הודעות שגיאה ליד השדה
   - מניעת שמירה של נתונים לא תקינים
   - החזרה אוטומטית לערך הקודם

2. **Storage Errors**
   - Fallback ל-memory storage
   - הודעות למשתמש על בעיות שמירה
   - ניסיון חוזר אוטומטי

3. **Network Errors** (עבור תכונות עתידיות)
   - שמירה מקומית עד לחזרת הרשת
   - סנכרון אוטומטי כשהרשת חוזרת

### קומפוננט ErrorBoundary

```typescript
interface EditingErrorBoundaryProps {
  fallback: React.ComponentType<{error: Error}>
  onError?: (error: Error) => void
}
```

## אסטרטגיית בדיקות

### Unit Tests

1. **Hook Testing**
   - בדיקת לוגיקת העריכה
   - בדיקת validation
   - בדיקת localStorage integration

2. **Component Testing**
   - בדיקת rendering בכל המצבים
   - בדיקת keyboard interactions
   - בדיקת accessibility

3. **Service Testing**
   - בדיקת ContentManager
   - בדיקת error handling
   - בדיקת data persistence

### Integration Tests

1. **User Flow Testing**
   - מחזור עריכה מלא
   - בדיקת ביטול שינויים
   - בדיקת ייצוא/ייבוא

2. **Cross-Component Testing**
   - אינטראקציה בין מספר אלמנטים
   - בדיקת state management
   - בדיקת performance

### E2E Tests

1. **Browser Testing**
   - בדיקה בדפדפנים שונים
   - בדיקת responsive design
   - בדיקת accessibility tools

## אינטגרציה עם הפרויקט הקיים

### שילוב עם הקומפוננטים הקיימים

1. **Microsoft-Nvidia Comparison**
   - הפיכת נתוני ההשוואה לניתנים לעריכה
   - שמירת שינויים ב-localStorage
   - אפשרות לייצא נתונים מעודכנים

2. **Problem Statement**
   - עריכת טקסט הבעיה
   - עדכון סטטיסטיקות
   - התאמת תוכן לצרכים ספציפיים

3. **Recommendations**
   - עריכת המלצות
   - עדכון קריטריונים
   - התאמת דירוגים

### שימוש ב-Tailwind CSS

הפתרון יעשה שימוש בכיתות Tailwind הקיימות:

```css
/* מצב רגיל */
.editable-element {
  @apply hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer;
}

/* מצב עריכה */
.editing-element {
  @apply border-blue-500 bg-blue-50 shadow-sm ring-2 ring-blue-200;
}

/* אינדיקטור שינויים */
.has-changes {
  @apply border-l-4 border-l-orange-400 bg-orange-50;
}
```

### אינטגרציה עם shadcn/ui

השימוש ברכיבי shadcn/ui הקיימים:

- `Button` - לכפתורי שמירה וביטול
- `Input` - לעריכת טקסט
- `Toast` - להודעות משוב
- `Dialog` - לאישור פעולות
- `Badge` - לאינדיקטורי מצב

## ביצועים ואופטימיזציה

### אסטרטגיות אופטימיזציה

1. **Debouncing**
   - עיכוב שמירה ב-300ms
   - מניעת שמירות מיותרות
   - שיפור חוויית המשתמש

2. **Lazy Loading**
   - טעינת קומפוננטי עריכה לפי דרישה
   - code splitting אוטומטי
   - הקטנת bundle size

3. **Memory Management**
   - ניקוי listeners בעת unmount
   - שימוש ב-WeakMap לאחסון זמני
   - מניעת memory leaks

### מדדי ביצועים

- זמן תגובה לעריכה: < 100ms
- זמן שמירה: < 50ms
- גודל bundle נוסף: < 15KB gzipped
- זיכרון נוסף: < 5MB

## אבטחה ופרטיות

### עקרונות אבטחה

1. **Client-Side Only**
   - כל הנתונים נשארים בדפדפן
   - אין שליחת נתונים לשרת
   - שליטה מלאה של המשתמש

2. **Data Validation**
   - בדיקת תקינות בצד הלקוח
   - מניעת XSS דרך sanitization
   - הגבלת גודל נתונים

3. **Storage Security**
   - שימוש ב-localStorage בלבד
   - אין שמירה של נתונים רגישים
   - אפשרות לניקוי מלא

### Privacy by Design

- אין איסוף נתונים
- אין tracking
- שליטה מלאה של המשתמש בנתונים
- שקיפות מלאה בפעולות המערכת

## תמיכה בנגישות

### WCAG 2.1 Compliance

1. **Keyboard Navigation**
   - תמיכה מלאה ב-Tab navigation
   - Enter לתחילת עריכה
   - Escape לביטול עריכה

2. **Screen Reader Support**
   - ARIA labels מתאימים
   - הודעות על שינוי מצב
   - תיאור פעולות זמינות

3. **Visual Indicators**
   - ניגודיות גבוהה
   - אינדיקטורים ברורים
   - תמיכה ב-high contrast mode

### Accessibility Features

```typescript
// דוגמה לתמיכה בנגישות
<div
  role="textbox"
  aria-label="ערוך טקסט"
  aria-describedby="edit-instructions"
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
  {content}
</div>
```

## תיעוד למפתחים

### API Reference

מדריך מפורט לשימוש בכל קומפוננט וhook, כולל:

- דוגמאות קוד
- פרמטרים זמינים
- דוגמאות שימוש נפוצות
- troubleshooting guide

### Migration Guide

הוראות להוספת יכולת עריכה לקומפוננטים קיימים:

1. זיהוי אלמנטים לעריכה
2. הוספת data attributes
3. אינטגרציה עם hooks
4. בדיקת תקינות

## תוכנית פיתוח

### Phase 1: Core Infrastructure
- פיתוח useInlineEdit hook
- יצירת ContentManager service
- בדיקות יחידה בסיסיות

### Phase 2: UI Components
- פיתוח EditableText
- פיתוח EditableNumber
- עיצוב ויזואלי

### Phase 3: Integration
- שילוב עם קומפוננטים קיימים
- בדיקות אינטגרציה
- אופטימיזציה

### Phase 4: Advanced Features
- ייצוא/ייבוא נתונים
- תכונות נגישות מתקדמות
- תיעוד מלא