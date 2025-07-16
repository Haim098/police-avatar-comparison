import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Clock, Users } from "lucide-react"

export default function Recommendations() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">המלצות סופיות ותוכנית יישום</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          על בסיס המחקר המקיף, אלו ההמלצות שלנו למשטרת ישראל ליישום אווטארים אינטראקטיביים
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center space-x-3 space-x-reverse">
            <Star className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl text-green-800">המלצה מרכזית</CardTitle>
              <CardDescription className="text-green-600">הגישה המומלצת למשטרת ישראל</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">התחלה עם פלטפורמת SaaS</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>
                    <strong>Soul Machines Digital People</strong> לפריסה מלאה
                  </span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>
                    <strong>D-ID Digital Avatars</strong> למעבר הדרגתי או פיילוט
                  </span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>יישום מהיר תוך 1-3 חודשים</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>סיכון נמוך והשקעה ראשונית קטנה</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">מעבר עתידי למיקרו-שירותים</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>לאחר הוכחת היתכנות והצלחה</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>שקילת NVIDIA ACE או Microsoft Azure</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>התאמה מלאה לצרכי המשטרה</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>חיסכון לטווח ארוך</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">תוכנית יישום מפורטת</CardTitle>
          <CardDescription>לוח זמנים מומלץ ליישום הדרגתי של אווטארים אינטראקטיביים</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <h3 className="text-lg font-semibold">שלב פיילוט</h3>
                  <Badge variant="outline">3-6 חודשים</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">מטרות:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• בדיקת היתכנות טכנית</li>
                      <li>• הערכת קבלת הציבור</li>
                      <li>• מדידת יעילות התהליך</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">יישום:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• תחנה אחת נבחרת</li>
                      <li>• D-ID או Ravatar</li>
                      <li>• תלונות פשוטות בלבד</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <h3 className="text-lg font-semibold">הרחבה מוגבלת</h3>
                  <Badge variant="outline">6-12 חודשים</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">מטרות:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• הרחבה ל-3-5 תחנות</li>
                      <li>• שיפור המערכת על בסיס משוב</li>
                      <li>• הכשרת צוותים נוספים</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">יישום:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• אינטגרציה עם מערכות קיימות</li>
                      <li>• הרחבת סוגי התלונות</li>
                      <li>• שיפור תמיכה רב-לשונית</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <h3 className="text-lg font-semibold">פריסה ארצית</h3>
                  <Badge variant="outline">12+ חודשים</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">מטרות:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• פריסה לכל תחנות המשטרה</li>
                      <li>• מעבר לפלטפורמה מתקדמת</li>
                      <li>• אופטימיזציה מלאה</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">יישום:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Soul Machines או מיקרו-שירותים</li>
                      <li>• כל סוגי התלונות</li>
                      <li>• אינטגרציה מלאה</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Benefits */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">חיסכון בזמן</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">60%</p>
            <p className="text-sm text-gray-600">חיסכון בזמן חוקרים</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">שיפור שירות</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">24/7</p>
            <p className="text-sm text-gray-600">זמינות מלאה</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">יעילות</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2">3x</p>
            <p className="text-sm text-gray-600">עיבוד תלונות מהיר יותר</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">דיוק</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2">95%</p>
            <p className="text-sm text-gray-600">דיוק בתיעוד</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-2 border-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">הצעדים הבאים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">מיידי (חודש הבא)</h4>
              <ul className="space-y-2 text-sm">
                <li>• אישור תקציב לפיילוט</li>
                <li>• בחירת תחנה לפיילוט</li>
                <li>• פנייה לספקים לקבלת הצעות</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">קצר טווח (3 חודשים)</h4>
              <ul className="space-y-2 text-sm">
                <li>• התקשרות עם ספק נבחר</li>
                <li>• הכשרת צוות הפיילוט</li>
                <li>• הטמעה בתחנה הנבחרת</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">בינוני טווח (6-12 חודשים)</h4>
              <ul className="space-y-2 text-sm">
                <li>• הערכת תוצאות הפיילוט</li>
                <li>• תכנון הרחבה</li>
                <li>• הכנת תקציב לפריסה רחבה</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
