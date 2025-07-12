import React from 'react';
import ProductionVerification from '@/components/production/ProductionVerification';
import { Helmet } from 'react-helmet';

const ProductionVerificationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Production Verification - Horalix</title>
        <meta name="description" content="Comprehensive production readiness verification for Horalix medical application" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <ProductionVerification />
      </div>
    </>
  );
};

export default ProductionVerificationPage;