# Interactive Avatar Solutions - Israeli Police

מצגת אינטראקטיבית המציגה פתרונות אווטארים אינטראקטיביים למשטרת ישראל, עם יכולת עריכת תוכן מוטבעת.

## תכונות עיקריות

### 🎯 מצגת אינטראקטיבית
- השוואה מפורטת בין Microsoft Azure AI ו-NVIDIA Omniverse ACE
- ניתוח פלטפורמות SaaS מובילות (Soul Machines, HeyGen, D-ID, Uneeq, Ravatar)
- הגדרת בעיה והמלצות יישום
- ניווט קל בין סקציות

### ✏️ עריכת תוכן מוטבעת (Inline Content Editing)
- **עריכה פשוטה**: לחיצה על טקסט או מספר להתחלת עריכה
- **שמירה אוטומטית**: השינויים נשמרים ב-localStorage
- **אינדיקטורים ויזואליים**: הצגה ברורה של אלמנטים הניתנים לעריכה ושינויים
- **ביטול שינויים**: אפשרות לחזור למצב המקורי
- **ייצוא/ייבוא**: שמירת השינויים לקובץ JSON

## התחלה מהירה

### דרישות מערכת
- Node.js 18+ 
- npm או pnpm

### התקנה
```bash
# שכפול הפרויקט
git clone <repository-url>
cd <project-name>

# התקנת תלויות
npm install
# או
pnpm install

# הרצת שרת הפיתוח
npm run dev
# או
pnpm dev
```

הפתח דפדפן וגש ל-`http://localhost:3000`

## שימוש בעריכת תוכן

### עריכת טקסט
```tsx
import { EditableText } from '@/components/ui/editable-text'

<EditableText
  initialValue="הטקסט המקורי"
  storageKey="unique-key"
  placeholder="לחץ לעריכה..."
  multiline={false}
  validator={(value) => value.length > 0 ? true : 'שדה חובה'}
  onSave={(value) => console.log('נשמר:', value)}
/>
```

### עריכת מספרים
```tsx
import { EditableNumber } from '@/components/ui/editable-number'

<EditableNumber
  initialValue={42}
  storageKey="unique-number-key"
  min={0}
  max={100}
  step={1}
  formatter={(value) => `${value}%`}
  onSave={(value) => console.log('נשמר:', value)}
/>
```

### בקרת תוכן גלובלית
```tsx
import { ContentControls } from '@/components/ui/content-controls'

<ContentControls className="flex justify-center" />
```

## API Reference

### EditableText Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string` | - | הערך ההתחלתי |
| `storageKey` | `string` | - | מפתח ייחודי לשמירה |
| `placeholder` | `string` | "לחץ לעריכה..." | טקסט מקום |
| `multiline` | `boolean` | `false` | האם לאפשר מספר שורות |
| `validator` | `function` | - | פונקציית בדיקת תקינות |
| `className` | `string` | - | CSS classes נוספים |
| `onSave` | `function` | - | callback לאחר שמירה |

### EditableNumber Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `number` | - | הערך ההתחלתי |
| `storageKey` | `string` | - | מפתח ייחודי לשמירה |
| `min` | `number` | - | ערך מינימלי |
| `max` | `number` | - | ערך מקסימלי |
| `step` | `number` | `1` | גודל הצעד |
| `formatter` | `function` | - | פונקציית עיצוב התצוגה |
| `className` | `string` | - | CSS classes נוספים |
| `onSave` | `function` | - | callback לאחר שמירה |

### useInlineEdit Hook
```tsx
const {
  value,           // הערך הנוכחי
  isEditing,       // האם במצב עריכה
  hasChanges,      // האם יש שינויים
  startEdit,       // התחלת עריכה
  cancelEdit,      // ביטול עריכה
  saveEdit,        // שמירת עריכה
  resetToOriginal  // איפוס למקור
} = useInlineEdit({
  initialValue: 'ערך התחלתי',
  key: 'storage-key',
  validator: (value) => true,
  debounceMs: 300,
  onSave: (value) => {}
})
```

## נגישות (Accessibility)

המערכת תומכת במלוא בתקני נגישות:

- **ניווט מקלדת**: Tab, Enter, Escape, חיצים
- **קוראי מסך**: ARIA labels, live regions, הודעות
- **ניגודיות גבוהה**: תמיכה ב-high contrast mode
- **הפחתת תנועה**: תמיכה ב-reduced motion

### דוגמאות ניווט מקלדת
- `Tab` - מעבר בין אלמנטים
- `Enter` או `Space` - התחלת עריכה
- `Enter` - שמירת שינויים (טקסט רגיל)
- `Ctrl+Enter` - שמירת שינויים (טקסט רב-שורות)
- `Escape` - ביטול עריכה
- `↑↓` - שינוי ערכים במספרים

## ביצועים

### אופטימיזציות
- **React.memo**: מניעת re-renders מיותרים
- **useMemo**: מטמון חישובים יקרים
- **useCallback**: מטמון פונקציות
- **Debouncing**: עיכוב שמירה (300ms)
- **Lazy Loading**: טעינת קומפוננטים לפי דרישה

### מדדי ביצועים
- זמן תגובה לעריכה: < 100ms
- זמן שמירה: < 50ms
- גודל bundle נוסף: < 15KB gzipped

## אבטחה

- **Client-Side Only**: כל הנתונים נשארים בדפדפן
- **Data Validation**: בדיקת תקינות בצד הלקוח
- **XSS Protection**: sanitization אוטומטי
- **Storage Security**: שימוש ב-localStorage בלבד

## מבנה הפרויקט

```
├── components/
│   ├── ui/
│   │   ├── editable-text.tsx      # קומפוננט עריכת טקסט
│   │   ├── editable-number.tsx    # קומפוננט עריכת מספרים
│   │   ├── content-controls.tsx   # בקרות תוכן גלובליות
│   │   └── editing-error-boundary.tsx # טיפול בשגיאות
│   ├── microsoft-nvidia-comparison.tsx
│   ├── problem-statement.tsx
│   ├── recommendations.tsx
│   └── saas-comparison.tsx
├── hooks/
│   └── use-inline-edit.ts         # Hook עיקרי לעריכה
├── lib/
│   ├── services/
│   │   └── content-manager.ts     # ניהול אחסון
│   └── types/
│       └── inline-editing.ts      # הגדרות TypeScript
├── styles/
│   └── inline-editing.css         # סגנונות עריכה
└── __tests__/
    └── integration/               # בדיקות אינטגרציה
```

## בדיקות (Testing)

```bash
# הרצת כל הבדיקות
npm test

# בדיקות עם coverage
npm run test:coverage

# בדיקות נגישות
npm run test:a11y
```

### סוגי בדיקות
- **Unit Tests**: בדיקת קומפוננטים בודדים
- **Integration Tests**: בדיקת זרימות מלאות
- **Accessibility Tests**: בדיקת תקני נגישות
- **Performance Tests**: בדיקת ביצועים

## פתרון בעיות נפוצות

### השינויים לא נשמרים
1. בדוק שה-`storageKey` ייחודי
2. וודא שה-localStorage זמין
3. בדוק את ה-console לשגיאות

### עריכה לא עובדת
1. וודא שהקומפוננט מקבל `initialValue`
2. בדוק שאין שגיאות JavaScript
3. נסה לרענן את הדף

### בעיות נגישות
1. בדוק שיש `aria-label` מתאים
2. וודא שהאלמנט נגיש עם מקלדת
3. השתמש בכלי בדיקת נגישות

## תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## רישיון

פרויקט זה מוגן תחת רישיון MIT. ראה קובץ `LICENSE` לפרטים.

## תמיכה

לשאלות ותמיכה:
- פתח Issue ב-GitHub
- שלח אימייל ל-[email]
- בקר בתיעוד המלא ב-[docs-url]