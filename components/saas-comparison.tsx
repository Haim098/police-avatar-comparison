"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, DollarSign, Users, CheckCircle, XCircle, Edit } from "lucide-react"
import { PDFButton } from "@/components/ui/pdf-button"
import { EditableText } from "@/components/ui/editable-text"
import { ContentControls } from "@/components/ui/content-controls"

// Editable data structure
const initialCompaniesData = {
  soulMachines: {
    name: "Soul Machines Digital People",
    logo: "🧠",
    deployment: "Cloud/On-Premise/Hybrid",
    security: "SOC 2, GDPR, ISO 27001/27017/27018",
    languages: "עברית, ערבית, רוסית, אנגלית; אמהרית מוגבלת",
    model: "Digital Brain פנימי (מוח דיגיטלי)",
    pricing: "Basic: $12.99\n(40 דקות שיחה אינטראקטיבית)\n\nPlus: $99\n(350 דקות, 3 אווטארים)\n\nPro: $2,700\n(10,000 דקות, 5 אווטארים)",
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
    pricing: "Free\n\nPro: $99\n(100 קרדיטים)\n\nScale: $330\n(660 קרדיטים)\n\nEnterprise: מותאם\n\n* קרדיט = 5 דקות שיחה אינטראקטיבית",
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
    pricing: "Trial: חינם\n\nBuild: $18\n(אווטאר 1 מותאם ועד 32 דקות שיחה)\n\nLaunch: $50\n(3 אווטארים מותאמים ועד 90 דקות שיחה)\n\nScale: $198\n\nEnterprise: מותאם",
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
    pricing: "Enterprise: $240,000/שנה\n\n* לא מפורט בבירור באתר שלהם\n* באתר של AWS מופיע התמחור הנ\"ל לאווטאר של UneeQ הפרוס על הענן שלהם\n* יש לאמת מול החברה!",
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
    pricing: "Starter: $19\n(אווטאר 1, 150 דקות שיחה)\n\nBasic: $199\n(אווטאר 1, 1900 דקות שיחה)\n\nBusiness: $499\n(4 אווטארים, 5000 דקות)\n\nCorporate: $999\n(8 אווטארים כולל פריסה מקומית, 10,000 דקות)\n\nEnterprise: מותאם\n(כולל פריסה מקומית)",
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
      {/* Content Controls */}
      <ContentControls className="flex justify-center" />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <EditableText 
            initialValue="השוואת פלטפורמות SaaS"
            storageKey="saas-title"
            className="text-3xl font-bold text-gray-900 mb-4 block"
          />
          <EditableText 
            initialValue="ניתוח מפורט של 5 החברות המובילות בתחום אווטארים אינטראקטיביים"
            storageKey="saas-description"
            className="text-lg text-gray-600 block"
          />
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
          <TabsTrigger value="overview">
            <EditableText 
              initialValue="סקירה כללית"
              storageKey="saas-tab-overview"
              className="inline"
            />
          </TabsTrigger>
          <TabsTrigger value="technical">
            <EditableText 
              initialValue="מפרט טכני"
              storageKey="saas-tab-technical"
              className="inline"
            />
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <EditableText 
              initialValue="תמחור"
              storageKey="saas-tab-pricing"
              className="inline"
            />
          </TabsTrigger>
          <TabsTrigger value="recommendation">
            <EditableText 
              initialValue="המלצות"
              storageKey="saas-tab-recommendation"
              className="inline"
            />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {companies.map(([key, company]) => (
              <Card key={key} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{company.logo}</span>
                    <div>
                      <CardTitle className="text-lg">
                        <EditableText 
                          initialValue={company.name}
                          storageKey={`${key}-name`}
                          className="text-lg inline"
                        />
                      </CardTitle>
                      <CardDescription>
                        <EditableText 
                          initialValue={company.deployment}
                          storageKey={`${key}-deployment`}
                          className="inline"
                        />
                      </CardDescription>
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
                            <EditableText 
                              initialValue={pro}
                              storageKey={`${key}-pro-${index}`}
                              className="inline"
                            />
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
                            <EditableText 
                              initialValue={con}
                              storageKey={`${key}-con-${index}`}
                              className="inline"
                            />
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
              <CardTitle>
                <EditableText 
                  initialValue="השוואה טכנית מפורטת"
                  storageKey="saas-technical-comparison-title"
                  className="inline"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 font-semibold">
                        <EditableText 
                          initialValue="תכונה"
                          storageKey="saas-table-header-feature"
                          className="inline"
                        />
                      </th>
                      {companies.map(([key, company]) => (
                        <th key={key} className="text-center py-3 px-2 font-semibold text-xs">
                          {company.name.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4 font-medium">
                        <EditableText 
                          initialValue="פריסה"
                          storageKey="saas-table-row-deployment"
                          className="inline"
                        />
                      </td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          <EditableText 
                            initialValue={company.deployment}
                            storageKey={`${key}-deployment-table`}
                            className="inline text-xs"
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">
                        <EditableText 
                          initialValue="אבטחה ותקנים"
                          storageKey="saas-table-row-security"
                          className="inline"
                        />
                      </td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          <EditableText 
                            initialValue={company.security}
                            storageKey={`${key}-security-table`}
                            className="inline text-xs"
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">
                        <EditableText 
                          initialValue="שפות נתמכות"
                          storageKey="saas-table-row-languages"
                          className="inline"
                        />
                      </td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          <EditableText 
                            initialValue={company.languages}
                            storageKey={`${key}-languages-table`}
                            className="inline text-xs"
                            multiline={true}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">
                        <EditableText 
                          initialValue="מודל האווטאר"
                          storageKey="saas-table-row-model"
                          className="inline"
                        />
                      </td>
                      {companies.map(([key, company]) => (
                        <td key={key} className="py-3 px-2 text-center text-xs">
                          <EditableText 
                            initialValue={company.model}
                            storageKey={`${key}-model-table`}
                            className="inline text-xs"
                          />
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
                    <CardTitle className="text-lg">
                      <EditableText 
                        initialValue={company.name.split(" ")[0]}
                        storageKey={`${key}-name-short`}
                        className="text-lg inline"
                      />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        <EditableText 
                          initialValue="תמחור מלא:"
                          storageKey={`${key}-pricing-label`}
                          className="inline"
                        />
                      </h4>
                      <div className="text-sm bg-gray-50 p-2 rounded whitespace-pre-line">
                        <EditableText 
                          initialValue={company.pricing}
                          storageKey={`${key}-pricing-value`}
                          className="inline text-sm whitespace-pre-line"
                          multiline={true}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        <EditableText 
                          initialValue="תמיכה:"
                          storageKey={`${key}-support-label`}
                          className="inline"
                        />
                      </h4>
                      <div className="text-sm">
                        <EditableText 
                          initialValue={company.support}
                          storageKey={`${key}-support-value`}
                          className="inline text-sm"
                        />
                      </div>
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
                  <CardTitle className="text-green-800">
                    <EditableText 
                      initialValue="המלצה ראשונה"
                      storageKey="saas-top-recommendation-title"
                      className="text-green-800"
                    />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🧠</span>
                  <EditableText 
                    initialValue="Soul Machines"
                    storageKey="saas-top-recommendation-name"
                    className="font-bold text-lg mt-2 block"
                  />
                  <EditableText 
                    initialValue="לפריסה מלאה"
                    storageKey="saas-top-recommendation-desc"
                    className="text-sm text-green-700 block"
                  />
                </div>
                <ul className="text-sm space-y-2">
                  <li>
                    <EditableText 
                      initialValue="• טכנולוגיה מתקדמת ביותר"
                      storageKey="saas-top-rec-item1"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• מוח דיגיטלי פנימי"
                      storageKey="saas-top-rec-item2"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• אינטראקציה טבעית מלאה"
                      storageKey="saas-top-rec-item3"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• תמיכה בכל השפות הנדרשות"
                      storageKey="saas-top-rec-item4"
                      className="inline"
                    />
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Budget Option */}
            <Card className="border-2 border-blue-500 bg-blue-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-blue-800">
                    <EditableText 
                      initialValue="אופציה חסכונית"
                      storageKey="saas-budget-recommendation-title"
                      className="text-blue-800"
                    />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🎪</span>
                  <EditableText 
                    initialValue="D-ID"
                    storageKey="saas-budget-recommendation-name"
                    className="font-bold text-lg mt-2 block"
                  />
                  <EditableText 
                    initialValue="למעבר הדרגתי"
                    storageKey="saas-budget-recommendation-desc"
                    className="text-sm text-blue-700 block"
                  />
                </div>
                <ul className="text-sm space-y-2">
                  <li>
                    <EditableText 
                      initialValue="• מחיר תחרותי"
                      storageKey="saas-budget-rec-item1"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• תמיכה בעברית וערבית"
                      storageKey="saas-budget-rec-item2"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• אבטחה טובה"
                      storageKey="saas-budget-rec-item3"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• קל להטמעה"
                      storageKey="saas-budget-rec-item4"
                      className="inline"
                    />
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pilot Option */}
            <Card className="border-2 border-purple-500 bg-purple-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-purple-800">
                    <EditableText 
                      initialValue="לפיילוט"
                      storageKey="saas-pilot-recommendation-title"
                      className="text-purple-800"
                    />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">🤖</span>
                  <EditableText 
                    initialValue="Ravatar"
                    storageKey="saas-pilot-recommendation-name"
                    className="font-bold text-lg mt-2 block"
                  />
                  <EditableText 
                    initialValue="לבדיקת היתכנות"
                    storageKey="saas-pilot-recommendation-desc"
                    className="text-sm text-purple-700 block"
                  />
                </div>
                <ul className="text-sm space-y-2">
                  <li>
                    <EditableText 
                      initialValue="• מחיר נמוך לפיילוט"
                      storageKey="saas-pilot-rec-item1"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• תמיכה בכל השפות"
                      storageKey="saas-pilot-rec-item2"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• פריסה מקומית"
                      storageKey="saas-pilot-rec-item3"
                      className="inline"
                    />
                  </li>
                  <li>
                    <EditableText 
                      initialValue="• גמישות בהתאמות"
                      storageKey="saas-pilot-rec-item4"
                      className="inline"
                    />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>
                <EditableText 
                  initialValue="אסטרטגיית יישום מומלצת"
                  storageKey="saas-implementation-strategy-title"
                  className="inline"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <EditableText 
                      initialValue="שלב פיילוט (3-6 חודשים)"
                      storageKey="saas-strategy-phase1-title"
                      className="font-semibold block"
                    />
                    <EditableText 
                      initialValue="התחלה עם Ravatar או D-ID לבדיקת היתכנות בתחנה אחת"
                      storageKey="saas-strategy-phase1-desc"
                      className="text-sm text-gray-600 block"
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <EditableText 
                      initialValue="הרחבה מוגבלת (6-12 חודשים)"
                      storageKey="saas-strategy-phase2-title"
                      className="font-semibold block"
                    />
                    <EditableText 
                      initialValue="הרחבה ל-3-5 תחנות עם פתרון שהוכח בפיילוט"
                      storageKey="saas-strategy-phase2-desc"
                      className="text-sm text-gray-600 block"
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <EditableText 
                      initialValue="פריסה מלאה (12+ חודשים)"
                      storageKey="saas-strategy-phase3-title"
                      className="font-semibold block"
                    />
                    <EditableText 
                      initialValue="מעבר ל-Soul Machines לפריסה ארצית עם כל התכונות המתקדמות"
                      storageKey="saas-strategy-phase3-desc"
                      className="text-sm text-gray-600 block"
                    />
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
