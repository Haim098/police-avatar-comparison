"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, Zap, Globe } from "lucide-react"
import { PDFButton } from "@/components/ui/pdf-button"

export default function MicrosoftNvidiaComparison() {
    const comparisonData = {
        microsoft: {
            name: "Microsoft Azure AI",
            logo: "🔷",
            subtitle: "Azure Cognitive Services + Mixed Reality",
            strengths: [
                "תמיכה ישירה בעברית, ערבית, רוסית ואמהרית",
                "מסגרת אבטחה מקיפה וחזקה (SOC 2, ISO 27001)",
                "אקוסיסטם ענן בוגר עם שירותי AI נרחבים",
                "מודל תמחור צריכה גמיש ושקוף",
                "שירותי אינטגרציה מתקדמים (Logic Apps, Functions)",
                "פריסה מקומית דרך Azure Arc",
                "תמיכה ב-140+ שפות"
            ],
            weaknesses: [
                "תלות בענן גם בפריסה מקומית",
                "עלויות יכולות להיות גבוהות בשימוש נרחב",
                "איכות אווטארים מותאמים אישית דורשת בדיקה",
                "מורכבות בניהול עלויות"
            ],
            technicalSpecs: {
                deployment: "Cloud / On-Premise (Azure Arc)",
                security: "SOC 2, ISO 27001, GDPR, Customer Lockbox",
                languages: "עברית, ערבית, רוסית, אמהרית + 140 שפות נוספות",
                pricing: "צריכה - לדקת וידאו, לתו/טוקן",
                integration: "Logic Apps, Functions, API Management",
                avatar: "Standard/Custom avatars, Microsoft Mesh"
            }
        },
        nvidia: {
            name: "NVIDIA Omniverse ACE",
            logo: "🟢",
            subtitle: "Avatar Cloud Engine",
            strengths: [
                "טכנולוגיה מתקדמת ביותר לאווטארים פוטוריאליסטיים",
                "ביצועים גבוהים בזמן אמת",
                "פריסה מקומית מלאה עם NVIDIA NIMs",
                "מיקרו-שירותים מודולריים וגמישים",
                "מודלי AI מתקדמים (Audio2Face)",
                "אופטימיזציה למעבדי NVIDIA GPU",
                "כלים לטיפול ב-PII ופרטיות"
            ],
            weaknesses: [
                "מורכבות אינטגרציה גבוהה",
                "דורש צוות פיתוח מיומן",
                "תמיכה בעברית ואמהרית דרך NMT בלבד",
                "תמחור לא שקוף - דורש משא ומתן",
                "זמן פיתוח ארוך יותר",
                "תלות בחומרת NVIDIA"
            ],
            technicalSpecs: {
                deployment: "On-Premise (Docker, Kubernetes)",
                security: "PII Redaction, Licensed Data Models",
                languages: "רוסית, ערבית (Riva) + NMT לעברית/אמהרית",
                pricing: "רישוי ארגוני - לא פומבי",
                integration: "APIs + פיתוח מותאם אישית",
                avatar: "Photorealistic + Audio2Face"
            }
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">השוואה מעמיקה: Microsoft vs NVIDIA</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    ניתוח מפורט של שני הפתרונות המובילים מחברות הענק לפיתוח אווטארים אינטראקטיביים
                </p>
            </div>

            {/* Quick Overview Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Microsoft Card */}
                <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                        <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-4xl">{comparisonData.microsoft.logo}</span>
                            <div>
                                <CardTitle className="text-2xl text-blue-800">{comparisonData.microsoft.name}</CardTitle>
                                <CardDescription className="text-blue-600 text-lg">
                                    {comparisonData.microsoft.subtitle}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                    <Globe className="h-3 w-3 ml-1" />
                                    רב-לשוני
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                    <Shield className="h-3 w-3 ml-1" />
                                    אבטחה גבוהה
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                    <Zap className="h-3 w-3 ml-1" />
                                    יישום מהיר
                                </Badge>
                            </div>
                            <p className="text-sm text-blue-700">
                                פתרון מקיף עם אקוסיסטם בוגר, תמיכה מלאה בשפות הנדרשות ומסגרת אבטחה חזקה
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* NVIDIA Card */}
                <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                        <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-4xl">{comparisonData.nvidia.logo}</span>
                            <div>
                                <CardTitle className="text-2xl text-green-800">{comparisonData.nvidia.name}</CardTitle>
                                <CardDescription className="text-green-600 text-lg">
                                    {comparisonData.nvidia.subtitle}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                    <Star className="h-3 w-3 ml-1" />
                                    פוטוריאליזם
                                </Badge>
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                    <Zap className="h-3 w-3 ml-1" />
                                    ביצועים גבוהים
                                </Badge>
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                    <Shield className="h-3 w-3 ml-1" />
                                    פריסה מקומית
                                </Badge>
                            </div>
                            <p className="text-sm text-green-700">
                                טכנולוגיה מתקדמת ביותר לאווטארים פוטוריאליסטיים עם ביצועים מעולים
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Comparison Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
                    <TabsTrigger value="technical">מפרט טכני</TabsTrigger>
                    <TabsTrigger value="languages">תמיכה לשונית</TabsTrigger>
                    <TabsTrigger value="security">אבטחה ופריסה</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Microsoft Strengths & Weaknesses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 space-x-reverse text-blue-800">
                                    <span className="text-2xl">{comparisonData.microsoft.logo}</span>
                                    <span>Microsoft Azure</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-green-700 mb-3 flex items-center">
                                            <CheckCircle className="h-4 w-4 ml-1" />
                                            יתרונות עיקריים
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                            {comparisonData.microsoft.strengths.map((strength, index) => (
                                                <li key={index} className="flex items-start space-x-2 space-x-reverse">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-red-700 mb-3 flex items-center">
                                            <XCircle className="h-4 w-4 ml-1" />
                                            חסרונות וסיכונים
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                            {comparisonData.microsoft.weaknesses.map((weakness, index) => (
                                                <li key={index} className="flex items-start space-x-2 space-x-reverse">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{weakness}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* NVIDIA Strengths & Weaknesses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 space-x-reverse text-green-800">
                                    <span className="text-2xl">{comparisonData.nvidia.logo}</span>
                                    <span>NVIDIA ACE</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-green-700 mb-3 flex items-center">
                                            <CheckCircle className="h-4 w-4 ml-1" />
                                            יתרונות עיקריים
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                            {comparisonData.nvidia.strengths.map((strength, index) => (
                                                <li key={index} className="flex items-start space-x-2 space-x-reverse">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-red-700 mb-3 flex items-center">
                                            <XCircle className="h-4 w-4 ml-1" />
                                            חסרונות וסיכונים
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                            {comparisonData.nvidia.weaknesses.map((weakness, index) => (
                                                <li key={index} className="flex items-start space-x-2 space-x-reverse">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{weakness}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>השוואה טכנית מפורטת</CardTitle>
                            <CardDescription>מפרט טכני מלא של שני הפתרונות</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-right py-3 px-4 font-semibold">תכונה טכנית</th>
                                            <th className="text-center py-3 px-4 font-semibold text-blue-700">Microsoft Azure</th>
                                            <th className="text-center py-3 px-4 font-semibold text-green-700">NVIDIA ACE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="py-3 px-4 font-medium">סוג הפתרון</td>
                                            <td className="py-3 px-4 text-center">פלטפורמה/חבילת שירותים</td>
                                            <td className="py-3 px-4 text-center">פלטפורמה/חבילת מיקרו-שירותים</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium">רכיבים עיקריים</td>
                                            <td className="py-3 px-4 text-center text-xs">Azure Text to Speech Avatar, Azure AI Speech, Azure OpenAI, Microsoft Mesh</td>
                                            <td className="py-3 px-4 text-center text-xs">Audio2Face, ASR, TTS, NMT, Animation Graph, LLM integration</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium">ממשק אווטאר</td>
                                            <td className="py-3 px-4 text-center text-xs">אווטארים פוטוריאליסטיים (סטנדרטיים/מותאמים), 3D ב-Mesh</td>
                                            <td className="py-3 px-4 text-center text-xs">אווטארים פוטוריאליסטיים מתקדמים עם אנימציית פנים וגוף</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium">פריסה</td>
                                            <td className="py-3 px-4 text-center">{comparisonData.microsoft.technicalSpecs.deployment}</td>
                                            <td className="py-3 px-4 text-center">{comparisonData.nvidia.technicalSpecs.deployment}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium">אינטגרציה</td>
                                            <td className="py-3 px-4 text-center">{comparisonData.microsoft.technicalSpecs.integration}</td>
                                            <td className="py-3 px-4 text-center">{comparisonData.nvidia.technicalSpecs.integration}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium">מודל עסקי</td>
                                            <td className="py-3 px-4 text-center">תשלום לפי שימוש - מודל ענן</td>
                                            <td className="py-3 px-4 text-center">רישוי ארגוני - חוזים מותאמים</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="languages" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <Card className="border-blue-200">
                            <CardHeader className="bg-blue-50">
                                <CardTitle className="text-blue-800">Microsoft Azure - תמיכה לשונית</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-2">תמיכה ישירה ומלאה:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-green-100 text-green-800">עברית</Badge>
                                            <Badge className="bg-green-100 text-green-800">ערבית</Badge>
                                            <Badge className="bg-green-100 text-green-800">רוסית</Badge>
                                            <Badge className="bg-green-100 text-green-800">אמהרית</Badge>
                                            <Badge className="bg-green-100 text-green-800">אנגלית</Badge>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">סה"כ שפות נתמכות:</h4>
                                        <p className="text-blue-700 text-lg font-bold">140+ שפות</p>
                                        <p className="text-sm text-blue-600 mt-1">דרך Azure Text to Speech ושירותי AI נוספים</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800 mb-2">איכות ותכונות:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• קולות טבעיים ואיכותיים</li>
                                            <li>• תמיכה בניואנסים תרבותיים</li>
                                            <li>• עדכונים שוטפים ושיפורים</li>
                                            <li>• התאמה לדיאלקטים מקומיים</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader className="bg-green-50">
                                <CardTitle className="text-green-800">NVIDIA ACE - תמיכה לשונית</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-2">תמיכה ישירה:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-green-100 text-green-800">איטלקית</Badge>
                                            <Badge className="bg-green-100 text-green-800">ספרדית (EU)</Badge>
                                            <Badge className="bg-green-100 text-green-800">גרמנית</Badge>
                                            <Badge className="bg-green-100 text-green-800">מנדרינית</Badge>
                                            <Badge className="bg-green-100 text-green-800">רוסית</Badge>
                                            <Badge className="bg-green-100 text-green-800">יפנית</Badge>
                                            <Badge className="bg-green-100 text-green-800">צרפתית</Badge>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">דרך Riva SDK:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-blue-100 text-blue-800">ערבית</Badge>
                                            <Badge className="bg-blue-100 text-blue-800">אנגלית</Badge>
                                            <Badge className="bg-blue-100 text-blue-800">הינדי</Badge>
                                            <Badge className="bg-blue-100 text-blue-800">קוריאנית</Badge>
                                            <Badge className="bg-blue-100 text-blue-800">פורטוגזית</Badge>
                                            <Badge className="bg-blue-100 text-blue-800">ספרדית</Badge>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-amber-800 mb-2">דרך NMT (תרגום):</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-amber-100 text-amber-800">עברית</Badge>
                                            <Badge className="bg-amber-100 text-amber-800">אמהרית</Badge>
                                        </div>
                                        <p className="text-sm text-amber-700 mt-2">
                                            <AlertTriangle className="h-4 w-4 inline ml-1" />
                                            דורש בדיקת איכות מעמיקה
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <Card className="border-blue-200">
                            <CardHeader className="bg-blue-50">
                                <CardTitle className="text-blue-800">Microsoft Azure - אבטחה ופריסה</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-2">תקני אבטחה:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-green-100 text-green-800">SOC 2</Badge>
                                            <Badge className="bg-green-100 text-green-800">ISO 27001</Badge>
                                            <Badge className="bg-green-100 text-green-800">GDPR</Badge>
                                            <Badge className="bg-green-100 text-green-800">Customer Lockbox</Badge>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">תכונות אבטחה:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• הצפנת TLS מתקדמת</li>
                                            <li>• Entra ID לניהול זהויות</li>
                                            <li>• Customer Managed Keys (CMK)</li>
                                            <li>• Virtual Networks (VNETs)</li>
                                            <li>• Data Loss Prevention (DLP)</li>
                                            <li>• Bring Your Own Storage (BYOS)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-purple-800 mb-2">אפשרויות פריסה:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• ענן ציבורי (Azure Cloud)</li>
                                            <li>• פריסה מקומית דרך Azure Arc</li>
                                            <li>• פריסה היברידית</li>
                                            <li>• Containers מנוהלים</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader className="bg-green-50">
                                <CardTitle className="text-green-800">NVIDIA ACE - אבטחה ופריסה</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-2">תכונות אבטחה:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• כלי PII Redaction מובנים</li>
                                            <li>• מודלי AI על נתונים מורשים</li>
                                            <li>• פריסה מקומית מלאה</li>
                                            <li>• שליטה מלאה בנתונים</li>
                                            <li>• אופטימיזציה לחומרת NVIDIA</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-amber-800 mb-2">דורש אימות נוסף:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• פרטי הצפנה ותקשורת</li>
                                            <li>• תקני תאימות ספציפיים</li>
                                            <li>• מדיניות גיבוי ושחזור</li>
                                            <li>• ניהול מפתחות הצפנה</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">אפשרויות פריסה:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• NVIDIA NIMs (Docker Compose)</li>
                                            <li>• Kubernetes מנוהל</li>
                                            <li>• פריסה מקומית מלאה</li>
                                            <li>• ענן NVIDIA (Foundry)</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Final Recommendation */}
            <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
                <CardHeader>
                    <div className="flex items-center space-x-3 space-x-reverse">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                        <div>
                            <CardTitle className="text-2xl text-amber-800">המלצה מבוססת ניתוח</CardTitle>
                            <CardDescription className="text-amber-700 text-lg">
                                על בסיס הדרישות הספציפיות של משטרת ישראל
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="bg-blue-100 p-6 rounded-lg">
                            <h3 className="font-bold text-blue-800 text-lg mb-3 flex items-center">
                                <Star className="h-5 w-5 ml-2" />
                                לצרכים מיידיים
                            </h3>
                            <div className="text-center mb-4">
                                <span className="text-4xl">{comparisonData.microsoft.logo}</span>
                                <p className="font-bold text-blue-800 mt-2">Microsoft Azure</p>
                            </div>
                            <ul className="text-sm space-y-2 text-blue-700">
                                <li>• תמיכה מלאה בכל השפות הנדרשות</li>
                                <li>• מסגרת אבטחה מוכחת וחזקה</li>
                                <li>• יישום מהיר יחסית</li>
                                <li>• תמחור שקוף וגמיש</li>
                            </ul>
                        </div>

                        <div className="bg-green-100 p-6 rounded-lg">
                            <h3 className="font-bold text-green-800 text-lg mb-3 flex items-center">
                                <Zap className="h-5 w-5 ml-2" />
                                לטווח הארוך
                            </h3>
                            <div className="text-center mb-4">
                                <span className="text-4xl">{comparisonData.nvidia.logo}</span>
                                <p className="font-bold text-green-800 mt-2">NVIDIA ACE</p>
                            </div>
                            <ul className="text-sm space-y-2 text-green-700">
                                <li>• טכנולוגיה מתקדמת ביותר</li>
                                <li>• פוטוריאליזם מעולה</li>
                                <li>• שליטה מלאה בנתונים</li>
                                <li>• ביצועים גבוהים</li>
                            </ul>
                        </div>

                        <div className="bg-purple-100 p-6 rounded-lg">
                            <h3 className="font-bold text-purple-800 text-lg mb-3 flex items-center">
                                <Shield className="h-5 w-5 ml-2" />
                                גישה היברידית
                            </h3>
                            <div className="text-center mb-4">
                                <span className="text-2xl">🔷🟢</span>
                                <p className="font-bold text-purple-800 mt-2">שילוב חכם</p>
                            </div>
                            <ul className="text-sm space-y-2 text-purple-700">
                                <li>• Azure לשיחה ואינטגרציה</li>
                                <li>• NVIDIA לרינדור אווטאר</li>
                                <li>• מיטוב היתרונות</li>
                                <li>• גמישות מרבית</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
                        <h4 className="font-semibold text-amber-800 mb-2">מסקנה:</h4>
                        <p className="text-amber-700 mb-4">
                            <strong>למשטרת ישראל מומלץ להתחיל עם Microsoft Azure</strong> בשל התמיכה המלאה בשפות הנדרשות,
                            מסגרת האבטחה החזקה והיכולת ליישום מהיר. לטווח הארוך, ניתן לשקול שילוב עם רכיבי NVIDIA ACE
                            לשיפור הפוטוריאליזם והביצועים.
                        </p>
                        <div className="flex justify-center">
                            <PDFButton 
                                platformId="microsoft-nvidia"
                                size="md"
                                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                            >
                                מצגת השוואה מפורטת
                            </PDFButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}