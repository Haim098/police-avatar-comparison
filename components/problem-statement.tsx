import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Users, FileText, Target } from "lucide-react"

export default function ProblemStatement() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">האתגר: עומס על מחלקת התלונות</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          משטרת ישראל מתמודדת עם עומס רב על חוקרים בקבלת תלונות פשוטות, מה שגורם לזמני המתנה ארוכים לאזרחים ובזבוז זמן
          יקר של חוקרים
        </p>
      </div>

      {/* Current Problems */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-800">זמני המתנה ארוכים</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">אזרחים ממתינים שעות רבות בתחנות המשטרה להגשת תלונות פשוטות</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-6 w-6 text-orange-600" />
              <CardTitle className="text-orange-800">עומס על חוקרים</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">חוקרים מבזבזים זמן יקר על משימות תיעוד בסיסיות במקום חקירות מורכבות</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-6 w-6 text-yellow-600" />
              <CardTitle className="text-yellow-800">תהליך מייגע</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">מילוי טפסים ידני ותיעוד תלונות בצורה לא יעילה</p>
          </CardContent>
        </Card>
      </div>

      {/* Proposed Solution */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">הפתרון המוצע: אווטארים אינטראקטיביים</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">מה האווטאר יעשה:</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>ישאל שאלות בצורה טבעית ואנושית</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>יתעד את כל המידע הנדרש</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>יגיש דוח מסודר ומאורגן</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>יפעל 24/7 ללא המתנה</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">היתרונות:</h4>
            <div className="space-y-3">
              <Badge variant="secondary" className="block w-fit">
                חיסכון בזמן חוקרים
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                שירות מהיר לאזרחים
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                תיעוד מדויק ואחיד
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                תמיכה רב-לשונית
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Key Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">דרישות עיקריות מהמערכת</CardTitle>
          <CardDescription>המאפיינים החיוניים שהאווטאר חייב לעמוד בהם</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">דרישות טכניות:</h4>
              <ul className="space-y-2 text-sm">
                <li>• פעולה בזמן אמת</li>
                <li>• אבטחה וסודיות ברמה גבוהה</li>
                <li>• יכולת הפעלה על שרתים מאובטחים (on-premise)</li>
                <li>• יכולת אינטגרציה עם מערכות משטרה קיימות</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">דרישות פונקציונליות:</h4>
              <ul className="space-y-2 text-sm">
                <li>• ממשק אווטאר חי - דמוי אדם</li>
                <li>• אינטראקטיביות טבעית - שיחה זורמת</li>
                <li>• איסוף מידע ותיעוד תלונות</li>
                <li>• תמיכה רב-לשונית: עברית, ערבית, רוסית, אמהרית, אנגלית</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
