"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield } from "lucide-react"
import ApproachComparison from "@/components/approach-comparison"
import MicrosoftNvidiaComparison from "@/components/microsoft-nvidia-comparison"
import SaasComparison from "@/components/saas-comparison"
import ProblemStatement from "@/components/problem-statement"
import Recommendations from "@/components/recommendations"

export default function PitchDeck() {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { id: "problem", title: "הגדרת הבעיה", component: ProblemStatement },
    { id: "approaches", title: "השוואת גישות", component: ApproachComparison },
    { id: "microsoft-nvidia", title: "Microsoft vs NVIDIA", component: MicrosoftNvidiaComparison },
    { id: "saas", title: "השוואת פלטפורמות SaaS", component: SaasComparison },
    { id: "recommendations", title: "המלצות", component: Recommendations },
  ]

  const CurrentComponent = sections[currentSection].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">אווטארים אינטראקטיביים למשטרת ישראל</h1>
                <p className="text-sm text-gray-600">פתרונות טכנולוגיים לקבלת תלונות הציבור</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              מצגת אינטראקטיבית
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 space-x-reverse overflow-x-auto">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  currentSection === index
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CurrentComponent />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            הקודם
          </Button>
          <div className="flex space-x-2 space-x-reverse">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentSection ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <Button
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
          >
            הבא
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>מצגת אינטראקטיבית - אווטארים אינטראקטיביים למשטרת ישראל</p>
            <p className="mt-1">נתונים ניתנים לעדכון ושינוי בהתאם לצרכים</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
