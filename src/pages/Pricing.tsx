
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { HospitalPricingSection } from '@/components/pricing/HospitalPricingSection';
import { IndividualPricingSection } from '@/components/pricing/IndividualPricingSection';

const Pricing = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('hospitals');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      <PricingHeader />
      
      <div className="max-w-7xl mx-auto p-4 md:p-6 pt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Choose Your Plan' : 'Odaberite Svoj Plan'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' ? 'Hospital-grade pricing designed for healthcare professionals and institutions' : 'Bolničke cijene dizajnirane za zdravstvene stručnjake i ustanove'}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="hospitals" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {language === 'en' ? 'Hospitals & Clinics' : 'Bolnice i Klinike'}
              </TabsTrigger>
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === 'en' ? 'Individual Doctors' : 'Individualni Liječnici'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hospitals">
              <HospitalPricingSection />
            </TabsContent>

            <TabsContent value="individual">
              <IndividualPricingSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
