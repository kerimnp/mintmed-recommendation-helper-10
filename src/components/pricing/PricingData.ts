
export const hospitalCreditBundles = [
  {
    name: 'Starter',
    credits: 100,
    price: 38,
    costPerCredit: 0.75,
    popular: false,
    bestValue: false
  },
  {
    name: 'Basic',
    credits: 500,
    price: 153,
    costPerCredit: 0.60,
    popular: false,
    bestValue: false
  },
  {
    name: 'Pro',
    credits: 1000,
    price: 268,
    costPerCredit: 0.53,
    popular: true,
    bestValue: false
  },
  {
    name: 'Growth',
    credits: 2500,
    price: 574,
    costPerCredit: 0.45,
    popular: false,
    bestValue: true
  },
  {
    name: 'Scale',
    credits: 5000,
    price: 1052,
    costPerCredit: 0.41,
    popular: false,
    bestValue: false
  }
];

export const individualPlans = [
  {
    name: 'Basic',
    price: 41,
    credits: 200,
    extraCreditCost: 0.80,
    features: ['Roll over unused credits', 'Basic support', 'Standard guidelines access'],
    popular: false
  },
  {
    name: 'Pro',
    price: 82,
    credits: 500,
    extraCreditCost: 0.64,
    features: ['Roll over unused credits', 'Priority support', 'Advanced guidelines access'],
    popular: true
  },
  {
    name: 'Elite',
    price: 143,
    unlimited: true,
    features: ['Unlimited usage', 'Premium support', 'Full guidelines access', 'Real-time updates', 'Advanced analytics'],
    popular: false
  }
];

export const seatFeePerMonth = 19;
