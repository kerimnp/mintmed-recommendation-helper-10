
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  DollarSign,
  Clock,
  Beaker,
  BookOpen,
  Activity,
  Eye,
  MapPin,
  Pill,
  Download,
  ExternalLink
} from 'lucide-react';
import { type EnhancedAntibioticData } from '@/services/antibioticService';

interface AntibioticDetailModalProps {
  antibiotic: EnhancedAntibioticData;
  isOpen: boolean;
  onClose: () => void;
}

export const AntibioticDetailModal: React.FC<AntibioticDetailModalProps> = ({
  antibiotic,
  isOpen,
  onClose
}) => {
  const getResistanceTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {antibiotic.name}
                {antibiotic.featured && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                {antibiotic.trending && <TrendingUp className="h-5 w-5 text-blue-500" />}
              </DialogTitle>
              <DialogDescription className="text-lg mt-1">
                {antibiotic.category} • {antibiotic.spectrum}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Guidelines
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dosing">Dosing</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="resistance">Resistance</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{antibiotic.effectiveness}%</div>
                  <div className="text-sm text-gray-600">Effectiveness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{antibiotic.resistance}%</div>
                  <div className="text-sm text-gray-600">Resistance</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">${antibiotic.cost}</div>
                  <div className="text-sm text-gray-600">Est. Cost</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{antibiotic.studies}</div>
                  <div className="text-sm text-gray-600">Studies</div>
                </CardContent>
              </Card>
            </div>

            {/* Mechanism and Pharmacokinetics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5" />
                    Mechanism of Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {antibiotic.mechanismDetail}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{antibiotic.spectrum}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Half-life: {antibiotic.halfLife}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Pharmacokinetics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Absorption</div>
                    <div className="text-sm text-gray-600">{antibiotic.pharmacokinetics.absorption}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Distribution</div>
                    <div className="text-sm text-gray-600">{antibiotic.pharmacokinetics.distribution}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Elimination</div>
                    <div className="text-sm text-gray-600">{antibiotic.pharmacokinetics.elimination}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Bioavailability</div>
                    <div className="text-sm text-gray-600">{antibiotic.pharmacokinetics.bioavailability}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clinical Pearls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Clinical Pearls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {antibiotic.clinicalPearls.map((pearl, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{pearl}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dosing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Adult Dosing */}
              <Card>
                <CardHeader>
                  <CardTitle>Adult Dosing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Mild Infections</span>
                      <Badge variant="secondary">Mild</Badge>
                    </div>
                    <div className="text-sm">
                      {antibiotic.dosing.adult.mild.dose} {antibiotic.dosing.adult.mild.interval}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Moderate Infections</span>
                      <Badge variant="default">Moderate</Badge>
                    </div>
                    <div className="text-sm">
                      {antibiotic.dosing.adult.moderate.dose} {antibiotic.dosing.adult.moderate.interval}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Severe Infections</span>
                      <Badge variant="destructive">Severe</Badge>
                    </div>
                    <div className="text-sm">
                      {antibiotic.dosing.adult.severe.dose} {antibiotic.dosing.adult.severe.interval}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pediatric Dosing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pediatric Dosing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Weight-based:</span>
                      <div className="text-sm mt-1">
                        {antibiotic.dosing.pediatric.mgPerKg} mg/kg {antibiotic.dosing.pediatric.interval}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Maximum dose:</span>
                      <div className="text-sm mt-1">
                        {antibiotic.dosing.pediatric.maxDose} mg
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Renal Adjustment */}
            {antibiotic.renalAdjustment.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Renal Dose Adjustments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {antibiotic.renalAdjustment.map((adjustment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium">GFR ≤ {adjustment.gfr} mL/min</span>
                        <span className="text-sm">{adjustment.adjustment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Routes of Administration */}
            <Card>
              <CardHeader>
                <CardTitle>Routes of Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {antibiotic.route.map((route) => (
                    <Badge key={route} variant="outline">
                      {route.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6">
            {/* Indications */}
            <Card>
              <CardHeader>
                <CardTitle>Common Indications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {antibiotic.commonIndications.map((indication, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Pill className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{indication}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Adverse Effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Common Side Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {antibiotic.adverseEffects.common.map((effect, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-700">Serious Side Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {antibiotic.adverseEffects.serious.map((effect, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Rare Side Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {antibiotic.adverseEffects.rare.map((effect, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contraindications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Contraindications & Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {antibiotic.contraindications.map((contraindication, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{contraindication}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resistance" className="space-y-6">
            {/* Regional Resistance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Regional Resistance Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {antibiotic.regionalResistance.local}%
                    </div>
                    <div className="text-sm text-gray-600">Local Resistance</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl">
                      {getResistanceTrendIcon(antibiotic.regionalResistance.trend)}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {antibiotic.regionalResistance.trend} Trend
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {antibiotic.interactions}
                    </div>
                    <div className="text-sm text-gray-600">Known Interactions</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Regional Notes:
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    {antibiotic.regionalResistance.notes}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Products ({antibiotic.availableProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {antibiotic.availableProducts.length > 0 ? (
                  <div className="space-y-4">
                    {antibiotic.availableProducts.map((product, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{product.name}</h4>
                          <Badge variant="outline">{product.manufacturer}</Badge>
                        </div>
                        <div className="space-y-2">
                          {product.forms.map((form, formIndex) => (
                            <div key={formIndex} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <span>{form.type} - {form.strength}</span>
                              <span className="text-gray-600">{form.packaging}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No specific product information available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Monitoring Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {antibiotic.monitoringParameters.map((parameter, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{parameter}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Last Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {new Date(antibiotic.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evidence Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Based on {antibiotic.studies} clinical studies</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
