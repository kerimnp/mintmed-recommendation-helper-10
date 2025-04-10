
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ArrowRight, Activity, FileText, UserCheck, Database } from "lucide-react";

const About = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const sections = [
    {
      title: language === "en" ? "Evidence-Based Recommendations" : "Preporuke Temeljene na Dokazima",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      content: language === "en" 
        ? "Horalix integrates the latest clinical guidelines and research to provide recommendations that are always backed by current scientific evidence." 
        : "Horalix integrira najnovije kliničke smjernice i istraživanja kako bi pružio preporuke koje su uvijek potkrijepljene trenutnim znanstvenim dokazima."
    },
    {
      title: language === "en" ? "Comprehensive Patient Factors" : "Sveobuhvatni Faktori Pacijenta",
      icon: <UserCheck className="h-8 w-8 text-green-500" />,
      content: language === "en" 
        ? "Our system considers a wide range of patient-specific factors including allergies, renal/hepatic function, age, weight, and comorbidities to ensure safe and personalized dosing." 
        : "Naš sustav uzima u obzir širok raspon faktora specifičnih za pacijenta, uključujući alergije, bubrežnu/jetrenu funkciju, dob, težinu i komorbiditete kako bi osigurao sigurno i personalizirano doziranje."
    },
    {
      title: language === "en" ? "Renal Function Precision" : "Preciznost Bubrežne Funkcije",
      icon: <Activity className="h-8 w-8 text-red-500" />,
      content: language === "en" 
        ? "Advanced creatinine clearance calculation methods ensure accurate assessment of renal function, which is critical for proper antibiotic dosing and avoiding nephrotoxicity." 
        : "Napredne metode izračuna klirensa kreatinina osiguravaju točnu procjenu bubrežne funkcije, što je ključno za pravilno doziranje antibiotika i izbjegavanje nefrotoksičnosti."
    },
    {
      title: language === "en" ? "Regional Resistance Patterns" : "Regionalni Obrasci Otpornosti",
      icon: <Database className="h-8 w-8 text-purple-500" />,
      content: language === "en"
        ? "Horalix adapts recommendations based on local antimicrobial resistance patterns, ensuring that suggested treatments are effective in your specific geographic region." 
        : "Horalix prilagođava preporuke na temelju lokalnih obrazaca antimikrobne otpornosti, osiguravajući da su predloženi tretmani učinkoviti u vašoj specifičnoj geografskoj regiji."
    },
    {
      title: language === "en" ? "Transparent Documentation" : "Transparentna Dokumentacija",
      icon: <FileText className="h-8 w-8 text-amber-500" />,
      content: language === "en"
        ? "Every recommendation includes clear rationale and references to source guidelines, providing full transparency for clinical decision-making and professional documentation." 
        : "Svaka preporuka uključuje jasno obrazloženje i reference na izvorne smjernice, pružajući potpunu transparentnost za kliničko odlučivanje i profesionalnu dokumentaciju."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-auto">
      <Helmet>
        <title>About Horalix - Evidence-Based Antibiotic Recommendation System</title>
        <meta name="description" content="Learn more about Horalix, the advanced AI-powered medical decision support system for antibiotics." />
      </Helmet>

      <header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {language === "en" ? "Back" : "Natrag"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full overflow-auto pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-4">
                {language === "en" ? "About Horalix" : "O Horalixu"}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === "en"
                  ? "Horalix is an advanced AI-powered medical decision support system designed to improve antibiotic prescribing practices through evidence-based recommendations."
                  : "Horalix je napredni sustav za podršku medicinskom odlučivanju pokretan umjetnom inteligencijom, dizajniran za poboljšanje prakse propisivanja antibiotika kroz preporuke temeljene na dokazima."}
              </p>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 shadow-inner">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 text-center"
            >
              <Link to="/advisor">
                <Button size="lg" className="bg-medical-primary hover:bg-medical-primary-hover text-white rounded-full shadow-md">
                  {language === "en" ? "Try Antibiotic Advisor" : "Isprobaj Savjetnik za Antibiotike"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
