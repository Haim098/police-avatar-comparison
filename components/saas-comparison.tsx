"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, DollarSign, Users, CheckCircle, XCircle, Edit } from "lucide-react"
import { PDFButton } from "@/components/ui/pdf-button"

// Editable data structure
const initialCompaniesData = {
  soulMachines: {
    name: "Soul Machines Digital People",
    logo: "🧠",
    deployment: "Cloud/On-Premise/Hybrid",
    security: "SOC 2, GDPR, ISO 27001/27017/27018",
    languages: "עברית, ערבית, רוסית, אנגלית; אמהרית מוגבלת",
    model: "Digital Brain פנימי (מוח דיגיטלי)",
    pricing: "Basic: $12.99/Plus: $99/Pro: $2,700",
    support: "24/7 תמיכה, Email Support",
    pros: ["טכנולוגיה מתקדמת ביותר", "מוח דיגיטלי פנימי", "אינטראקציה טבעית מלאה"],
    cons: ["מחיר גבוה", "מורכבות גבוהה", "זמן הטמעה ארוך"],
  },
  heyGen: {
    name: "HeyGen AI Avatars",
    logo: "🎭",
    deployment: "Cloud בלבד",
    security: "GDPR, SOC 2 Type 2",
    languages: "עברית, ערבית, רוסית, אמהרית, אנגלית + 170 שפות",
    model: "דורש חיבור ל-LLM חיצוני",
    pricing: "Free/Creator: $29/Team: $149/Enterprise מותאם",
    support: "Priority Support ב-Enterprise",
    pros: ["תמיכה ב-170+ שפות", "קל לשימוש", "מחיר סביר"],
    cons: ["רק בענן", "תלות ב-LLM חיצוני", "פחות אבטחה"],
  },
  dId: {
    name: "D-ID Digital Avatars",
    logo: "🎪",
    deployment: "Cloud/Enterprise Dedicated",
    security: "ISO 27001/27017/27018/42001, SOC 2",
    languages: "עברית, ערבית, רוסית, אנגלית + 30 שפות",
    model: "דורש חיבור ל-LLM חיצוני",
    pricing: "Trial: חינם/Lite: $5.9/Pro: $16/Advanced: $108/Enterprise מותאם",
    support: "24/7 Support, SLA Enterprise",
    pros: ["מחיר תחרותי", "תמיכה בעברית מלאה", "אבטחה טובה"],
    cons: ["תלות ב-LLM חיצוני", "פחות תכונות מתקדמות", "מוגבל בהתאמות"],
  },
  uneeq: {
    name: "UneeQ Digital Humans",
    logo: "👤",
    deployment: "Cloud/On-Premise",
    security: "SOC 2 Type 2, GDPR, ISO 27001/42001",
    languages: "עברית, ערבית, רוסית, אנגלית",
    model: "Synapse פנימי + LLM מותאם",
    pricing: "Enterprise: $240,000/שנה",
    support: "24/7 SLA, Implementation Services",
    pros: ["מערכת Synapse מתקדמת", "תמיכה מלאה", "אבטחה גבוהה"],
    cons: ["מחיר גבוה מאוד", "מיועד לארגונים גדולים", "מורכבות גבוהה"],
  },
  ravatar: {
    name: "Ravatar Genesis AI Studio",
    logo: "🤖",
    deployment: "Cloud/On-Premise",
    security: "GDPR, AI Act",
    languages: "עברית, ערבית, רוסית, אנגלית, אמהרית",
    model: "דורש חיבור ל-LLM חיצוני",
    pricing: "Starter: $19/Basic: $199/Business: $499/Enterprise מותאם",
    support: "Email, Account Manager",
    pros: ["מחיר סביר", "תמיכה בכל השפות הנדרשות", "פריסה מקומית"],
    cons: ["תלות ב-LLM חיצוני", "פחות מוכר", "תמיכה מוגבלת"],
  },
}

export default function SaasComparison() {
  const [companiesData, setCompaniesData] = useState(initialCompaniesData)
  const [editMode, setEditMode] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState("soulMachines")

  const companies = Object.entries(companiesData)

  // Mapping between internal company keys and PDF platform IDs
  const companyToPdfMapping: { [key: string]: string } = {
    'soulMachines': 'soul-machines',
    'heyGen': 'heygen',
    'dId': 'd-id',
    'uneeq': 'uneeq',
    'ravatar': 'ravatar'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">השוואת פלטפורמות SaaS</h2>
          <p className="text-lg text-gray-600">ניתוח מפורט של 5 החברות המובילות בתחום אווטארים אינטראקטיביים</p>
        </div>
        <Button variant={editMode ? "destructive" : "outline"} onClick={() => setEditMode(!editMode)}>
          <Edit className="h-4 w-4 ml-2" />
          {editMode ? "סיום עריכה" : "מצב עריכה"}
        </Button>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {companies.map(([key, company]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all ${
              selectedCompany === key ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedCompany(key)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{company.logo}</div>
              <h3 className="font-semibold text-sm mb-2">{company.name}</h3>
              <Badge variant="outline" className="text-xs">
                {company.pricing.split("/")[0]}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="technical">מפרט טכני</TabsTrigger>
          <TabsTrigger value="pricing">תמחור</TabsTrigger>
          <TabsTrigger value="recommendation">המלצות</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {companies.map(([key, company]) => (
              <Card key={key} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{company.logo}</span>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription>{company.deployment}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">יתרונות:</h4>
                      <ul className="text-sm space-y-1">
                        {company.pros.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-2 space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">חסרונות:</h4>
                      <ul className="text-sm space-y-1">
                        {company.cons.map((con, index) => (
                          <li key={index} className="flex items-start space-x-2 space-x-reverse">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* PDF Button */}
                    <div className="pt-2 border-t">
                      <PDFButton 
                        platformId={companyToPdfMapping[key]} 
                        size="sm"
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>השוואה טכנית מפורטת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 font-semibold">תכונה</th>
                      {companies.map(([key, company]) => (
                        <th key={key} className="text-center py-3 px-2 font-semibold text-xs">
                          {company.name.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4 font-medium">פריסה</td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          {company.deployment}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">אבטחה ותקנים</td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          {company.security}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">שפות נתמכות</td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          {company.languages}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">מודל האווטאר</td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          {company.model}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map(([key, company]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xl">{company.logo}</span>
                    <CardTitle className="text-lg">{company.name.split(" ")[0]}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">תמחור חודשי:</h4>
                      <p className="text-sm bg-gray-50 p-2 rounded">{company.pricing}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">תמיכה:</h4>
                      <p className="text-sm">{company.support}</p>
                    </div>
                    <div className="pt-2">
                      <PDFButton 
                        platformId={companyToPdfMapping[key]} 
                        size="sm"
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Recommendation */}
            <Card className="border-2 border-green-500 bg-green-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">המלצה ראשונה</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🧠</span>
                  <h3 className="font-bold text-lg mt-2">Soul Machines</h3>
                  <p className="text-sm text-green-700">לפריסה מלאה</p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• טכנולוגיה מתקדמת ביותר</li>
                  <li>• מוח דיגיטלי פנימי</li>
                  <li>• אינטראקציה טבעית מלאה</li>
                  <li>• תמיכה בכל השפות הנדרשות</li>
                </ul>
              </CardContent>
            </Card>

            {/* Budget Option */}
            <Card className="border-2 border-blue-500 bg-blue-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-blue-800">אופציה חסכונית</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🎪</span>
                  <h3 className="font-bold text-lg mt-2">D-ID</h3>
                  <p className="text-sm text-blue-700">למעבר הדרגתי</p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• מחיר תחרותי</li>
                  <li>• תמיכה בעברית וערבית</li>
                  <li>• אבטחה טובה</li>
                  <li>• קל להטמעה</li>
                </ul>
              </CardContent>
            </Card>

            {/* Pilot Option */}
            <Card className="border-2 border-purple-500 bg-purple-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-purple-800">לפיילוט</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🤖</span>
                  <h3 className="font-bold text-lg mt-2">Ravatar</h3>
                  <p className="text-sm text-purple-700">לבדיקת היתכנות</p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• מחיר נמוך לפיילוט</li>
                  <li>• תמיכה בכל השפות</li>
                  <li>• פריסה מקומית</li>
                  <li>• גמישות בהתאמות</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>אסטרטגיית יישום מומלצת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">שלב פיילוט (3-6 חודשים)</h4>
                    <p className="text-sm text-gray-600">התחלה עם Ravatar או D-ID לבדיקת היתכנות בתחנה אחת</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">הרחבה מוגבלת (6-12 חודשים)</h4>
                    <p className="text-sm text-gray-600">הרחבה ל-3-5 תחנות עם פתרון שהוכח בפיילוט</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">פריסה מלאה (12+ חודשים)</h4>
                    <p className="text-sm text-gray-600">מעבר ל-Soul Machines לפריסה ארצית עם כל התכונות המתקדמות</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Mode Notice */}
      {editMode && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <p className="text-amber-800 text-sm">
              <strong>מצב עריכה פעיל:</strong> ניתן לעדכן את הנתונים בטבלאות ובכרטיסים לפי הצורך. השינויים יישמרו באופן
              מקומי במהלך המצגת.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
