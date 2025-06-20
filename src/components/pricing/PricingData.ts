
// Updated pricing data to reflect subscription-only model
export const individualPlans = [
  {
    name: 'Basic',
    price: 224,
    credits: 500,
    features: ['500 credits per month', 'Priority support', 'Advanced analytics'],
    popular: false
  },
  {
    name: 'Pro',
    price: 392,
    credits: 1000,
    features: ['1000 credits per month', 'Premium support', 'Advanced analytics'],
    popular: true
  },
  {
    name: 'Elite',
    price: 840,
    credits: 2500,
    features: ['2500 credits per month', 'Premium support', 'Advanced analytics', 'Volume discount'],
    popular: false
  }
];

export const hospitalPlans = [
  {
    name: 'Starter',
    price: 56,
    credits: 100,
    doctorSeats: 3,
    features: ['100 credits per month', '3 doctor seats', 'Hospital dashboard', 'Basic support', 'Multi-user management'],
    popular: false
  },
  {
    name: 'Basic',
    price: 224,
    credits: 500,
    doctorSeats: 5,
    features: ['500 credits per month', '5 doctor seats', 'Hospital dashboard', 'Priority support', 'Multi-user management'],
    popular: false
  },
  {
    name: 'Pro',
    price: 392,
    credits: 1000,
    doctorSeats: 10,
    features: ['1000 credits per month', '10 doctor seats', 'Advanced analytics', 'Premium support', 'Multi-user management', 'Custom reporting'],
    popular: true
  },
  {
    name: 'Growth',
    price: 840,
    credits: 2500,
    doctorSeats: 15,
    features: ['2500 credits per month', '15 doctor seats', 'Advanced analytics', 'Premium support', 'Multi-user management', 'Custom reporting', 'Volume discount'],
    popular: false
  },
  {
    name: 'Scale',
    price: 1540,
    credits: 5000,
    doctorSeats: 25,
    features: ['5000 credits per month', '25 doctor seats', 'Dedicated support', 'Custom integrations', 'Advanced analytics', 'Custom reporting', 'Priority processing'],
    popular: false
  }
];
