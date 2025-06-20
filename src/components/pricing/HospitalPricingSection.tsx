
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Crown } from 'lucide-react';
import { hospitalCreditBundles, seatFeePerMonth } from './PricingData';

export const HospitalPricingSection: React.FC = () => {
  const { language } = useLanguage();
  const [doctorCount, setDoctorCount] = useState(5);
  const totalSeatFee = doctorCount * seatFeePerMonth;

  return (
    <div className="space-y-12">
      {/* Hospital Seat Fees */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {language === 'en' ? 'Seat Fees (Required)' : 'Naknade po Sjedištu (Obavezno)'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-medical-primary mb-2">€25/month per doctor</div>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Billed monthly. Required for all hospital accounts.' : 'Naplaćuje se mjesečno. Obavezno za sve bolničke račune.'}
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Select value={doctorCount.toString()} onValueChange={value => setDoctorCount(parseInt(value))}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {language === 'en' ? 'doctors' : 'liječnika'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-2xl">×</span>
              <span className="text-2xl font-bold">€25</span>
              <span className="text-2xl">=</span>
              <div className="text-2xl font-bold text-medical-primary">€{totalSeatFee}/month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital Credit Bundles */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Credit Bundles (Optional Add-ons)' : 'Paketi Kredita (Dodatni)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hospitalCreditBundles.map((bundle, index) => (
            <Card key={index} className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
              {bundle.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {bundle.bestValue && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                  <Crown className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{bundle.name}</CardTitle>
                <div className="text-3xl font-bold">€{bundle.price}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">€{bundle.costPerCredit.toFixed(2)}/credit</div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">{bundle.credits.toLocaleString()} credits</div>
                </div>
                <Button className="w-full" variant="outline">
                  {language === 'en' ? 'Add to Hospital Plan' : 'Dodaj u Bolnički Plan'}
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  {language === 'en' ? 'Credits never expire. Shared across all doctors.' : 'Krediti nikad ne istječu. Dijeli se među svim liječnicima.'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enterprise CTA */}
      <Card className="bg-gradient-to-r from-medical-primary to-blue-700 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Need 10,000+ credits?' : 'Trebate 10,000+ kredita?'}
          </h3>
          <p className="text-lg mb-6">
            {language === 'en' ? 'Contact us for volume discounts (up to 20% off)' : 'Kontaktirajte nas za popuste na količinu (do 20% popusta)'}
          </p>
          <Button size="lg" variant="secondary">
            {language === 'en' ? 'Get Custom Quote' : 'Dobijte Prilagođenu Ponudu'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
