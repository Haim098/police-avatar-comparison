import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Wrench, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ApproachComparison() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">שתי גישות לפיתוח אווטארים אינטראקטיביים</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          השוואה בין גישת המיקרו-שירותים של חברות הענק לבין פלטפורמות SaaS הכל-כלול
        </p>
      </div>

      {/* Main Comparison */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Microservices Approach */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Wrench className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl text-blue-800">גישה 1: מיקרו-שירותים</CardTitle>
                <CardDescription className="text-blue-600">NVIDIA, Microsoft - חברות הענק</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">מה זה כולל:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>מיקרו-שירותים נפרדים המתחברים יחד</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>טכנולוגיות מתקדמות ביותר</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>גמישות מרבית בהתאמה</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 ml-1" />
                    יתרונות
                  </h5>
                  <ul className="text-xs space-y-1 text-green-700">
                    <li>• טכנולוגיה מתקדמת</li>
                    <li>• ביצועים גבוהים</li>
                    <li>• התאמה מלאה</li>
                    <li>• חסכוני לטווח ארוך</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-medium text-red-800 mb-2 flex items-center">
                    <XCircle className="h-4 w-4 ml-1" />
                    חסרונות
                  </h5>
                  <ul className="text-xs space-y-1 text-red-700">
                    <li>• דורש צוות פיתוח</li>
                    <li>• זמן פיתוח ארוך</li>
                    <li>• מורכבות גבוהה</li>
                    <li>• השקעה ראשונית גדולה</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">חברות מובילות:</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">NVIDIA Omniverse ACE</Badge>
                  <Badge variant="outline">Microsoft Azure AI</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SaaS Approach */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Cloud className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-2xl text-green-800">גישה 2: הכל כלול (SaaS)</CardTitle>
                <CardDescription className="text-green-600">פלטפורמות מוכנות לשימוש</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">מה זה כולל:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>פתרון מוכן מקצה לקצה</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>תמיכה והטמעה כלולות</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>מודלי תמחור ברורים</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 ml-1" />
                    יתרונות
                  </h5>
                  <ul className="text-xs space-y-1 text-green-700">
                    <li>• יישום מהיר</li>
                    <li>• תמיכה מלאה</li>
                    <li>• פשטות בניהול</li>
                    <li>• סיכון נמוך</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-medium text-red-800 mb-2 flex items-center">
                    <XCircle className="h-4 w-4 ml-1" />
                    חסרונות
                  </h5>
                  <ul className="text-xs space-y-1 text-red-700">
                    <li>• פחות גמישות</li>
                    <li>• עלות חודשית קבועה</li>
                    <li>• תלות בספק</li>
                    <li>• התאמות מוגבלות</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">חברות מובילות:</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Soul Machines</Badge>
                  <Badge variant="outline">HeyGen</Badge>
                  <Badge variant="outline">D-ID</Badge>
                  <Badge variant="outline">UneeQ</Badge>
                  <Badge variant="outline">Ravatar</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">השוואה מפורטת</CardTitle>
          <CardDescription>ניתוח מעמיק של שתי הגישות על פי קריטריונים שונים</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-semibold">קריטריון</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-700">מיקרו-שירותים</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-700">SaaS הכל כלול</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 font-medium">זמן יישום</td>
                  <td className="py-3 px-4 text-center">6-12 חודשים</td>
                  <td className="py-3 px-4 text-center">1-3 חודשים</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">עלות התחלתית</td>
                  <td className="py-3 px-4 text-center">גבוהה</td>
                  <td className="py-3 px-4 text-center">נמוכה</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">צוות נדרש</td>
                  <td className="py-3 px-4 text-center">מפתחים + DevOps</td>
                  <td className="py-3 px-4 text-center">מנהל מערכת</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">גמישות התאמה</td>
                  <td className="py-3 px-4 text-center">מרבית</td>
                  <td className="py-3 px-4 text-center">מוגבלת</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">תחזוקה</td>
                  <td className="py-3 px-4 text-center">פנימית</td>
                  <td className="py-3 px-4 text-center">חיצונית</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">שליטה בנתונים</td>
                  <td className="py-3 px-4 text-center">מלאה</td>
                  <td className="py-3 px-4 text-center">חלקית</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center space-x-2 space-x-reverse">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            <CardTitle className="text-amber-800">המלצה ראשונית</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800 mb-4">
            <strong>למשטרת ישראל מומלץ להתחיל עם גישת SaaS הכל-כלול</strong> מהסיבות הבאות:
          </p>
          <ul className="space-y-2 text-amber-700">
            <li>• יישום מהיר - תוצאות תוך חודשים ספורים</li>
            <li>• סיכון נמוך - אפשרות לבדוק ולהעריך לפני השקעה גדולה</li>
            <li>• תמיכה מלאה - ללא צורך בצוות פיתוח פנימי</li>
            <li>• עמידה בדרישות אבטחה - כל החברות עומדות בתקנים הנדרשים</li>
          </ul>
          <p className="text-amber-800 mt-4">
            לאחר הוכחת היתכנות והצלחה, ניתן לשקול מעבר לגישת מיקרו-שירותים לטווח הארוך.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
