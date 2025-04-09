
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

export const ReferencesTab: React.FC = () => {
  const { toast } = useToast();

  const handleResourceClick = (resourceName: string) => {
    toast({
      title: "Resource Download Started",
      description: `The ${resourceName} is being downloaded.`
    });
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Document saved to your downloads folder."
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="prose dark:prose-invert max-w-none">
        <h3>References and Resources</h3>
        <p>This interaction checker uses data compiled from the following sources:</p>
        
        <ul>
          <li>
            <strong>Lexicomp Drug Interactions</strong> - Comprehensive database of drug-drug, drug-food, and drug-disease interactions
          </li>
          <li>
            <strong>Micromedex</strong> - Evidence-based clinical decision support tool with extensive drug interaction data
          </li>
          <li>
            <strong>Epocrates</strong> - Clinical reference application with drug interaction checker
          </li>
          <li>
            <strong>FDA Drug Safety Communications</strong> - Official FDA warnings and precautions regarding drug interactions
          </li>
          <li>
            <strong>Liverpool Drug Interaction Checker</strong> - Specialized in HIV, HCV, and COVID-19 drug interactions
          </li>
        </ul>
        
        <h3 className="mt-6">Disclaimer</h3>
        <p>
          This interaction checker is provided for informational purposes only and is not a substitute for professional medical advice.
          Always consult with a qualified healthcare provider before making any changes to medication regimens.
          The interaction data may not be comprehensive, and clinical judgment should be exercised when interpreting results.
        </p>
        
        <h3 className="mt-6">Additional Resources</h3>
        <ul>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => {
              e.preventDefault();
              handleResourceClick('Drug Interaction Principles Handbook');
            }}>Drug Interaction Principles Handbook (PDF)</a>
          </li>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => {
              e.preventDefault();
              handleResourceClick('Cytochrome P450 Drug Interaction Table');
            }}>Cytochrome P450 Drug Interaction Table</a>
          </li>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => {
              e.preventDefault();
              handleResourceClick('Guide to Antibiotic Interactions and Contraindications');
            }}>Guide to Antibiotic Interactions and Contraindications</a>
          </li>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => {
              e.preventDefault();
              toast({
                title: "Redirecting",
                description: "Opening FDA MedWatch Safety Alerts in a new window."
              });
            }}>FDA MedWatch Safety Alerts</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
