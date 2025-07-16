import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Clock, Users } from "lucide-react"
import { EditableText } from "@/components/ui/editable-text"
import { ContentControls } from "@/components/ui/content-controls"

export default function Recommendations() {
  return (
    <div className="space-y-8">
      {/* Content Controls */}
      <ContentControls className="flex justify-center" />
      
      {/* Header */}
      <div className="text-center">
        <EditableText 
          initialValue="המלצות סופיות ותוכנית יישום"
          storageKey="recommendations-title"
          className="text-3xl font-bold text-gray-900 mb-4 block"
        />
        <EditableText 
          initialValue="על בסיס המחקר המקיף, אלו ההמלצות שלנו למשטרת ישראל ליישום אווטארים אינטראקטיביים"
          storageKey="recommendations-description"
          className="text-lg text-gray-600 max-w-4xl mx-auto block"
          multiline={true}
        />
      </div>

      {/* Main Recommendation */}
      <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center space-x-3 space-x-reverse">
            <Star className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl text-green-800">
                <EditableText 
                  initialValue="המלצה מרכزית"
                  storageKey="main-recommendation-title"
                  className="text-2xl text-green-800"
                />
              </CardTitle>
              <CardDescription className="text-green-600">
                <EditableText 
                  initialValue="הגישה המומלצת למשטרת ישראל"
                  storageKey="main-recommendation-description"
                  className="text-green-600"
                />
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <EditableText 
                initialValue="התחלה עם פלטפורמת SaaS"
                storageKey="saas-start-title"
                className="text-xl font-semibold text-green-800 mb-4 block"
              />
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="Soul Machines Digital People לפריסה מלאה"
                    storageKey="saas-item1"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="D-ID Digital Avatars למעבר הדרגתי או פיילוט"
                    storageKey="saas-item2"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="יישום מהיר תוך 1-3 חודשים"
                    storageKey="saas-item3"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="סיכון נמוך והשקעה ראשונית קטנה"
                    storageKey="saas-item4"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
            <div>
              <EditableText 
                initialValue="מעבר עתידי למיקרו-שירותים"
                storageKey="microservices-title"
                className="text-xl font-semibold text-green-800 mb-4 block"
              />
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="לאחר הוכחת היתכנות והצלחה"
                    storageKey="microservices-item1"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="שקילת NVIDIA ACE או Microsoft Azure"
                    storageKey="microservices-item2"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="התאמה מלאה לצרכי המשטרה"
                    storageKey="microservices-item3"
                    className="inline"
                  />
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <EditableText 
                    initialValue="חיסכון לטווח ארוך"
                    storageKey="microservices-item4"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <EditableText 
              initialValue="תוכנית יישום מפורטת"
              storageKey="implementation-timeline-title"
              className="text-2xl"
            />
          </CardTitle>
          <CardDescription>
            <EditableText 
              initialValue="לוח זמנים מומלץ ליישום הדרגתי של אווטארים אינטראקטיביים"
              storageKey="implementation-timeline-description"
              className="inline"
            />
          </CardDescription>
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
                  <EditableText 
                    initialValue="שלב פיילוט"
                    storageKey="phase1-title"
                    className="text-lg font-semibold inline"
                  />
                  <Badge variant="outline">
                    <EditableText 
                      initialValue="3-6 חודשים"
                      storageKey="phase1-duration"
                      className="inline"
                    />
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <EditableText 
                      initialValue="מטרות:"
                      storageKey="phase1-goals-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• בדיקת היתכנות טכנית"
                          storageKey="phase1-goal1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• הערכת קבלת הציבור"
                          storageKey="phase1-goal2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• מדידת יעילות התהליך"
                          storageKey="phase1-goal3"
                          className="inline"
                        />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <EditableText 
                      initialValue="יישום:"
                      storageKey="phase1-implementation-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• תחנה אחת נבחרת"
                          storageKey="phase1-impl1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• D-ID או Ravatar"
                          storageKey="phase1-impl2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• תלונות פשוטות בלבד"
                          storageKey="phase1-impl3"
                          className="inline"
                        />
                      </li>
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
                  <EditableText 
                    initialValue="הרחבה מוגבלת"
                    storageKey="phase2-title"
                    className="text-lg font-semibold inline"
                  />
                  <Badge variant="outline">
                    <EditableText 
                      initialValue="6-12 חודשים"
                      storageKey="phase2-duration"
                      className="inline"
                    />
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <EditableText 
                      initialValue="מטרות:"
                      storageKey="phase2-goals-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• הרחבה ל-3-5 תחנות"
                          storageKey="phase2-goal1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• שיפור המערכת על בסיס משוב"
                          storageKey="phase2-goal2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• הכשרת צוותים נוספים"
                          storageKey="phase2-goal3"
                          className="inline"
                        />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <EditableText 
                      initialValue="יישום:"
                      storageKey="phase2-implementation-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• אינטגרציה עם מערכות קיימות"
                          storageKey="phase2-impl1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• הרחבת סוגי התלונות"
                          storageKey="phase2-impl2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• שיפור תמיכה רב-לשונית"
                          storageKey="phase2-impl3"
                          className="inline"
                        />
                      </li>
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
                  <EditableText 
                    initialValue="פריסה ארצית"
                    storageKey="phase3-title"
                    className="text-lg font-semibold inline"
                  />
                  <Badge variant="outline">
                    <EditableText 
                      initialValue="12+ חודשים"
                      storageKey="phase3-duration"
                      className="inline"
                    />
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <EditableText 
                      initialValue="מטרות:"
                      storageKey="phase3-goals-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• פריסה לכל תחנות המשטרה"
                          storageKey="phase3-goal1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• מעבר לפלטפורמה מתקדמת"
                          storageKey="phase3-goal2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• אופטימיזציה מלאה"
                          storageKey="phase3-goal3"
                          className="inline"
                        />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <EditableText 
                      initialValue="יישום:"
                      storageKey="phase3-implementation-title"
                      className="font-medium mb-2 block"
                    />
                    <ul className="text-sm space-y-1">
                      <li>
                        <EditableText 
                          initialValue="• Soul Machines או מיקרו-שירותים"
                          storageKey="phase3-impl1"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• כל סוגי התלונות"
                          storageKey="phase3-impl2"
                          className="inline"
                        />
                      </li>
                      <li>
                        <EditableText 
                          initialValue="• אינטגרציה מלאה"
                          storageKey="phase3-impl3"
                          className="inline"
                        />
                      </li>
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
            <EditableText 
              initialValue="חיסכון בזמן"
              storageKey="benefit-time-title"
              className="font-semibold text-lg mb-2 block"
            />
            <EditableText 
              initialValue="60%"
              storageKey="benefit-time-percentage"
              className="text-3xl font-bold text-blue-600 mb-2 block"
            />
            <EditableText 
              initialValue="חיסכון בזמן חוקרים"
              storageKey="benefit-time-description"
              className="text-sm text-gray-600 block"
            />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <EditableText 
              initialValue="שיפור שירות"
              storageKey="benefit-service-title"
              className="font-semibold text-lg mb-2 block"
            />
            <EditableText 
              initialValue="24/7"
              storageKey="benefit-service-value"
              className="text-3xl font-bold text-green-600 mb-2 block"
            />
            <EditableText 
              initialValue="זמינות מלאה"
              storageKey="benefit-service-description"
              className="text-sm text-gray-600 block"
            />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <EditableText 
              initialValue="יעילות"
              storageKey="benefit-efficiency-title"
              className="font-semibold text-lg mb-2 block"
            />
            <EditableText 
              initialValue="3x"
              storageKey="benefit-efficiency-value"
              className="text-3xl font-bold text-purple-600 mb-2 block"
            />
            <EditableText 
              initialValue="עיבוד תלונות מהיר יותר"
              storageKey="benefit-efficiency-description"
              className="text-sm text-gray-600 block"
            />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <EditableText 
              initialValue="דיוק"
              storageKey="benefit-accuracy-title"
              className="font-semibold text-lg mb-2 block"
            />
            <EditableText 
              initialValue="95%"
              storageKey="benefit-accuracy-value"
              className="text-3xl font-bold text-orange-600 mb-2 block"
            />
            <EditableText 
              initialValue="דיוק בתיעוד"
              storageKey="benefit-accuracy-description"
              className="text-sm text-gray-600 block"
            />
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-2 border-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">
            <EditableText 
              initialValue="הצעדים הבאים"
              storageKey="next-steps-title"
              className="text-2xl text-blue-800"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <EditableText 
                initialValue="מיידי (חודש הבא)"
                storageKey="immediate-steps-title"
                className="font-semibold text-blue-800 mb-3 block"
              />
              <ul className="space-y-2 text-sm">
                <li>
                  <EditableText 
                    initialValue="• אישור תקציב לפיילוט"
                    storageKey="immediate-step1"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• בחירת תחנה לפיילוט"
                    storageKey="immediate-step2"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• פנייה לספקים לקבלת הצעות"
                    storageKey="immediate-step3"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
            <div>
              <EditableText 
                initialValue="קצר טווח (3 חודשים)"
                storageKey="short-term-steps-title"
                className="font-semibold text-blue-800 mb-3 block"
              />
              <ul className="space-y-2 text-sm">
                <li>
                  <EditableText 
                    initialValue="• התקשרות עם ספק נבחר"
                    storageKey="short-term-step1"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• הכשרת צוות הפיילוט"
                    storageKey="short-term-step2"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• הטמעה בתחנה הנבחרת"
                    storageKey="short-term-step3"
                    className="inline"
                  />
                </li>
              </ul>
            </div>
            <div>
              <EditableText 
                initialValue="בינוני טווח (6-12 חודשים)"
                storageKey="medium-term-steps-title"
                className="font-semibold text-blue-800 mb-3 block"
              />
              <ul className="space-y-2 text-sm">
                <li>
                  <EditableText 
                    initialValue="• הערכת תוצאות הפיילוט"
                    storageKey="medium-term-step1"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• תכנון הרחבה"
                    storageKey="medium-term-step2"
                    className="inline"
                  />
                </li>
                <li>
                  <EditableText 
                    initialValue="• הכנת תקציב לפריסה רחבה"
                    storageKey="medium-term-step3"
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
