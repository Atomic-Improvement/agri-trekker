
import React from 'react';
import Card from './Card';
import { cn } from '@/lib/utils';
import { Users, Map, FileSpreadsheet, BarChart3, ShieldCheck, Layers } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: 'Farmer Management',
    description: 'Comprehensive CRUD operations for farmer records with detailed personal and financial information.'
  },
  {
    icon: <Map className="h-10 w-10 text-green-500" />,
    title: 'Land Management',
    description: 'Detailed land record keeping with location mapping, soil type analysis and crop history tracking.'
  },
  {
    icon: <FileSpreadsheet className="h-10 w-10 text-yellow-500" />,
    title: 'Scheme Management',
    description: 'Full workflow for agricultural schemes from application to approval with eligibility tracking.'
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
    title: 'Aerial Analytics',
    description: 'Advanced image processing for aerial farm images using clustering algorithms to identify field patterns.'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-red-500" />,
    title: 'Role-Based Access',
    description: 'Secure multi-level authentication system with specific permissions for admins, officers and farmers.'
  },
  {
    icon: <Layers className="h-10 w-10 text-indigo-500" />,
    title: 'Dashboards',
    description: 'Intuitive visual dashboards with relevant statistics and data for each user type in the system.'
  }
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <Card index={index} className="h-full">
      <div className="p-2 rounded-full inline-flex items-center justify-center bg-secondary mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-64 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground">
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Comprehensive Agricultural Management
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines detailed record keeping with advanced analytics to provide a complete solution for modern farming operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
