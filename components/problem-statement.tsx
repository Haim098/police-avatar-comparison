import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Users, FileText, Target } from "lucide-react"
import { EditableText } from "@/components/ui/editable-text"
import { ContentControls } from "@/components/ui/content-controls"

export default function ProblemStatement() {
  return (
    <div className="space-y-8">
      {/* Content Controls */}
      <ContentControls className="flex justify-center" />
      
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <EditableText 
          initialValue="האתגר: עומס על מחלקת התלונות"
          storageKey="problem-title"
          className="text-4xl font-bold text-gray-900 mb-4 block"
        />
        <EditableText 
          initialValue="משטרת ישראל מתמודדת עם עומס רב על חוקרים בקבלת תלונות פשוטות, מה שגורם לזמני המתנה ארוכים לאזרחים ובזבוז זמן יקר של חוקרים"
          storageKey="problem-description"
          className="text-xl text-gray-600 max-w-3xl mx-auto block"
          multiline={true}
        />
      </div>

      {/* Current Problems */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-800">
                <EditableText 
                  initialValue="זמני המתנה ארוכים"
                  storageKey="problem-card1-title"
                  className="text-red-800"
                />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <EditableText 
              initialValue="אזרחים ממתינים שעות רבות בתחנות המשטרה להגשת תלונות פשוטות"
              storageKey="problem-card1-content"
              className="text-red-700"
              multiline={true}
            />
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-6 w-6 text-orange-600" />
              <CardTitle className="text-orange-800">
                <EditableText 
                  initialValue="עומס על חוקרים"
                  storageKey="problem-card2-title"
                  className="text-orange-800"
                />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <EditableText 
              initialValue="חוקרים מבזבזים זמן יקר על משימות תיעוד בסיסיות במקום חקירות מורכבות"
              storageKey="problem-card2-content"
              className="text-orange-700"
              multiline={true}
            />
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-6 w-6 text-yellow-600" />
              <CardTitle className="text-yellow-800">
                <EditableText 
                  initialValue="תהליך מייגע"
                  storageKey="problem-card3-title"
                  className="text-yellow-800"
                />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <EditableText 
              initialValue="מילוי טפסים ידני ותיעוד תלונות בצורה לא יעילה"
              storageKey="problem-card3-content"
              className="text-yellow-700"
              multiline={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Proposed Solution */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <EditableText 
            initialValue="הפתרון המוצע: אווטארים אינטראקטיביים"
            storageKey="solution-title"
            className="text-3xl font-bold text-gray-900 mb-4 block"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <EditableText 
              initialValue="מה האווטאר יעשה:"
              storageKey="solution-what-title"
              className="text-xl font-semibold text-gray-800 mb-4 block"
            />
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <EditableText 
                  initialValue="ישאל שאלות בצורה טבעית ואנושית"
                  storageKey="solution-item1"
                  className="inline"
                />
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <EditableText 
                  initialValue="יתעד את כל המידע הנדרש"
                  storageKey="solution-item2"
                  className="inline"
                />
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <EditableText 
                  initialValue="יגיש דוח מסודר ומאורגן"
                  storageKey="solution-item3"
                  className="inline"
                />
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <EditableText 
                  initialValue="יפעל 24/7 ללא המתנה"
                  storageKey="solution-item4"
                  className="inline"
                />
              </li>
            </ul>
          </div>

          <div>
            <EditableText 
              initialValue="היתרונות:"
              storageKey="solution-benefits-title"
              className="text-xl font-semibold text-gray-800 mb-4 block"
            />
            <div className="space-y-3">
              <Badge variant="secondary" className="block w-fit">
                <EditableText 
                  initialValue="חיסכון בזמן חוקרים"
                  storageKey="benefit1"
                  className="inline"
                />
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                <EditableText 
                  initialValue="שירות מהיר לאזרחים"
                  storageKey="benefit2"
                  className="inline"
                />
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                <EditableText 
                  initialValue="תיעוד מדויק ואחיד"
                  storageKey="benefit3"
                  className="inline"
                />
              </Badge>
              <Badge variant="secondary" className="block w-fit">
                <EditableText 
                  initialValue="תמיכה רב-לשונית"
                  storageKey="benefit4"
                  className="inline"
                />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Key Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <EditableText 
              initialValue="דרישות עיקריות מהמערכת"
              storageKey="requirements-title"
              className="text-2xl"
            />
          </CardTitle>
          <CardDescription>
            <EditableText 
              initialValue="המאפיינים החיוניים שהאווטאר חייב לעמוד בהם"
              storageKey="requirements-description"
              className="inline"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <EditableText 
                initialValue="דרישות טכניות:"
                storageKey="tech-requirements-title"
                className="font-semibold text-gray-800 mb-3 block"
              />
              <ul className="space-y-2 text-sm">
                <li>
                  <EditableText 
                    initialValue="• פעולה בזמן אמת"
                    storageKey="tech-req1"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• אבטחה וסודיות ברמה גבוהה"
                    storageKey="tech-req2"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• יכולת הפעלה על שרתים מאובטחים (on-premise)"
                    storageKey="tech-req3"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• יכולת אינטגרציה עם מערכות משטרה קיימות"
                    storageKey="tech-req4"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
            <div>
              <EditableText 
                initialValue="דרישות פונקציונליות:"
                storageKey="func-requirements-title"
                className="font-semibold text-gray-800 mb-3 block"
              />
              <ul className="space-y-2 text-sm">
                <li>
                  <EditableText 
                    initialValue="• ממשק אווטאר חי - דמוי אדם"
                    storageKey="func-req1"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• אינטראקטיביות טבעית - שיחה זורמת"
                    storageKey="func-req2"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• איסוף מידע ותיעוד תלונות"
                    storageKey="func-req3"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• תמיכה רב-לשונית: עברית, ערבית, רוסית, אמהרית, אנגלית"
                    storageKey="func-req4"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
