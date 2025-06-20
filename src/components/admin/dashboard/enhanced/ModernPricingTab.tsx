
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  CreditCard,
  Crown,
  Zap,
  Shield,
  Star,
  Building,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  Award,
  Briefcase,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernMetricCard, ModernBadge, ModernGlassCard, ModernFloatingButton, ModernProgressBar, modernDesignSystem } from './ModernDesignSystem';
import { useToast } from '@/hooks/use-toast';

// Enhanced real-time pricing data
const generateRevenueData = () => {
  const baseData = [
    { month: 'Jan', revenue: 42580, subscriptions: 156, churn: 3.2, ltv: 2840 },
    { month: 'Feb', revenue: 48720, subscriptions: 178, churn: 2.8, ltv: 2950 },
    { month: 'Mar', revenue: 45360, subscriptions: 165, churn: 3.5, ltv: 2780 },
    { month: 'Apr', revenue: 52180, subscriptions: 189, churn: 2.1, ltv: 3120 },
    { month: 'May', revenue: 49630, subscriptions: 182, churn: 2.6, ltv: 3040 },
    { month: 'Jun', revenue: 56890, subscriptions: 201, churn: 1.9, ltv: 3280 }
  ];
  
  return baseData.map(item => ({
    ...item,
    revenue: Math.max(30000, Math.min(70000, item.revenue + (Math.random() - 0.5) * 3000)),
    subscriptions: Math.max(120, Math.min(250, item.subscriptions + Math.round((Math.random() - 0.5) * 10))),
    churn: Math.max(1, Math.min(5, item.churn + (Math.random() - 0.5) * 0.5)),
    ltv: Math.max(2000, Math.min(4000, item.ltv + (Math.random() - 0.5) * 200))
  }));
};

const subscriptionPlans = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    subscribers: 87,
    growth: '+12%',
    features: ['Basic Recommendations', '50 Queries/month', 'Email Support', 'Basic Analytics'],
    color: '#10b981',
    gradient: 'from-emerald-400 to-green-600',
    icon: <Zap className="h-6 w-6" />,
    badge: 'Most Popular'
  },
  {
    name: 'Professional',
    price: 89,
    period: 'month',
    subscribers: 142,
    growth: '+18%',
    features: ['Advanced AI Analysis', 'Unlimited Queries', 'Priority Support', 'Advanced Analytics', 'API Access'],
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-600',
    icon: <Crown className="h-6 w-6" />,
    badge: 'Recommended'
  },
  {
    name: 'Enterprise',
    price: 299,
    period: 'month',
    subscribers: 45,
    growth: '+24%',
    features: ['Custom Integration', 'Dedicated Support', 'Advanced Security', 'Custom Training', 'SLA Guarantee'],
    color: '#8b5cf6',
    gradient: 'from-purple-400 to-violet-600',
    icon: <Building className="h-6 w-6" />,
    badge: 'Enterprise'
  },
  {
    name: 'Academic',
    price: 19,
    period: 'month',
    subscribers: 28,
    growth: '+8%',
    features: ['Educational Discount', 'Research Tools', 'Academic Resources', 'Student Access'],
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-600',
    icon: <Award className="h-6 w-6" />,
    badge: 'Education'
  }
];

const customerSegments = [
  { name: 'Hospitals', value: 45, revenue: 180000, color: '#3b82f6' },
  { name: 'Clinics', value: 32, revenue: 95000, color: '#10b981' },
  { name: 'Research', value: 15, revenue: 42000, color: '#f59e0b' },
  { name: 'Individual', value: 8, revenue: 18000, color: '#8b5cf6' }
];

const geographicData = [
  { region: 'North America', revenue: 185000, growth: 15.2, customers: 127 },
  { region: 'Europe', revenue: 142000, growth: 22.8, customers: 89 },
  { region: 'Asia Pacific', revenue: 98000, growth: 31.5, customers: 56 },
  { region: 'Latin America', revenue: 35000, growth: 18.7, customers: 23 },
  { region: 'Middle East', revenue: 28000, growth: 25.1, customers: 18 }
];

export const ModernPricingTab: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    monthlyRevenue: 56890,
    totalSubscribers: 274,
    avgRevPerUser: 207.6,
    churnRate: 1.9,
    growthRate: 18.5
  });
  const { toast } = useToast();

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueData(generateRevenueData());
      setRealTimeMetrics(prev => ({
        monthlyRevenue: Math.max(45000, Math.min(65000, prev.monthlyRevenue + (Math.random() - 0.5) * 1000)),
        totalSubscribers: Math.max(250, Math.min(300, prev.totalSubscribers + Math.round((Math.random() - 0.5) * 2))),
        avgRevPerUser: Math.max(180, Math.min(250, prev.avgRevPerUser + (Math.random() - 0.5) * 5)),
        churnRate: Math.max(1, Math.min(4, prev.churnRate + (Math.random() - 0.5) * 0.2)),
        growthRate: Math.max(10, Math.min(25, prev.growthRate + (Math.random() - 0.5) * 1))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExportReport = () => {
    toast({
      title: "Exporting Revenue Report",
      description: "Your comprehensive pricing analytics report is being generated...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
              Revenue Analytics & Pricing Intelligence
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Real-time subscription metrics, customer insights, and revenue optimization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32 bg-white/50 border-white/20 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <ModernFloatingButton onClick={handleExportReport} variant="primary">
              <DollarSign className="h-4 w-4" />
              Export Report
            </ModernFloatingButton>
          </div>
        </motion.div>

        {/* Enhanced KPI Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <ModernMetricCard
            title="Monthly Revenue"
            value={`$${Math.round(realTimeMetrics.monthlyRevenue).toLocaleString()}`}
            subtitle="Recurring subscription revenue"
            trend="up"
            trendValue="+18.5%"
            icon={<DollarSign className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.success}
            realTime={true}
          />
          <ModernMetricCard
            title="Total Subscribers"
            value={realTimeMetrics.totalSubscribers}
            subtitle="Active paying customers"
            trend="up"
            trendValue="+12"
            icon={<Users className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.primary}
            realTime={true}
          />
          <ModernMetricCard
            title="ARPU"
            value={`$${realTimeMetrics.avgRevPerUser.toFixed(0)}`}
            subtitle="Average Revenue Per User"
            trend="up"
            trendValue="+$8"
            icon={<Target className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.medical}
            realTime={true}
          />
          <ModernMetricCard
            title="Churn Rate"
            value={`${realTimeMetrics.churnRate.toFixed(1)}%`}
            subtitle="Monthly subscriber churn"
            trend="down"
            trendValue="-0.3%"
            icon={<Shield className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.warning}
            realTime={true}
          />
          <ModernMetricCard
            title="Growth Rate"
            value={`${realTimeMetrics.growthRate.toFixed(1)}%`}
            subtitle="Month-over-month growth"
            trend="up"
            trendValue="+2.1%"
            icon={<TrendingUp className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.premium}
            realTime={true}
          />
        </motion.div>

        {/* Enhanced Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="revenue" className="rounded-xl">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="plans" className="rounded-xl">Subscription Plans</TabsTrigger>
              <TabsTrigger value="customers" className="rounded-xl">Customer Segments</TabsTrigger>
              <TabsTrigger value="geographic" className="rounded-xl">Geographic Data</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Revenue Growth Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }} 
                          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorRevenue)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-600" />
                      Subscription Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="subscriptions" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>
              </div>

              {/* Revenue Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-amber-600 mb-2">$2.8M</div>
                    <div className="text-sm text-amber-700 mb-2">Annual Recurring Revenue</div>
                    <ModernBadge variant="warning" size="sm">+22% YoY</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Star className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-purple-600 mb-2">$3,280</div>
                    <div className="text-sm text-purple-700 mb-2">Customer Lifetime Value</div>
                    <ModernBadge variant="medical" size="sm">+15% vs last month</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-green-600 mb-2">92.1%</div>
                    <div className="text-sm text-green-700 mb-2">Payment Success Rate</div>
                    <ModernBadge variant="success" size="sm">Excellent</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subscriptionPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ModernGlassCard className="h-full">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white`}>
                            {plan.icon}
                          </div>
                          <ModernBadge variant="glass" size="sm">
                            {plan.badge}
                          </ModernBadge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-3xl font-bold">${plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{plan.subscribers} subscribers</span>
                          <ModernBadge variant="success" size="sm">
                            {plan.growth}
                          </ModernBadge>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 flex-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <ModernProgressBar 
                          value={plan.subscribers} 
                          max={200} 
                          variant="primary"
                          className="mt-4"
                          showValue={true}
                        />
                      </CardContent>
                    </ModernGlassCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Customer Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={customerSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}%`, 'Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Revenue by Segment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customerSegments.map((segment, index) => (
                        <motion.div
                          key={segment.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            />
                            <div>
                              <div className="font-medium">{segment.name}</div>
                              <div className="text-sm text-gray-600">{segment.value}% of customers</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${segment.revenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Monthly Revenue</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6">
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Geographic Revenue Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicData.map((region, index) => (
                      <motion.div
                        key={region.region}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-gradient-to-r from-white/60 to-white/30 rounded-2xl backdrop-blur-sm border border-white/20"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{region.region}</h4>
                            <p className="text-sm text-gray-600">{region.customers} active customers</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${region.revenue.toLocaleString()}</div>
                            <div className="flex items-center gap-1 text-green-600">
                              <ArrowUp className="h-4 w-4" />
                              <span className="text-sm">+{region.growth}%</span>
                            </div>
                          </div>
                        </div>
                        <ModernProgressBar 
                          value={region.revenue} 
                          max={200000} 
                          variant="success"
                          animated={true}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
