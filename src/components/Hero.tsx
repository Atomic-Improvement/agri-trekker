
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-6 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground animate-fade-down">
              Revolutionizing Agricultural Management
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6 md:mb-8 text-foreground animate-fade-down" style={{ animationDelay: '0.1s' }}>
              Precision Clustering of Aerial Objects Using
              <span className="text-gradient"> Trajectory Analysis</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 text-balance animate-fade-down" style={{ animationDelay: '0.2s' }}>
              A sophisticated agricultural management system that combines detailed farmer
              and land information with advanced aerial imagery analysis for precision farming.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-down" style={{ animationDelay: '0.3s' }}>
              <Button className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground text-md font-medium shadow-md hover:shadow-lg transition-all">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 border-primary/20 bg-white hover:bg-secondary text-md font-medium transition-all">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={`mt-16 md:mt-20 relative rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ animationDelay: '0.4s' }}>
            <div className="aspect-[16/9] bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6 md:p-12 rounded-xl border border-secondary/80">
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="glassmorphism backdrop-blur-md p-8 rounded-xl card-shadow animate-floating">
                  <div className="h-8 flex items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1">
                      <div className="space-y-4">
                        <div className="w-full h-4 bg-secondary/80 rounded-md"></div>
                        <div className="w-3/4 h-4 bg-secondary/80 rounded-md"></div>
                        <div className="w-5/6 h-4 bg-secondary/60 rounded-md"></div>
                        <div className="w-4/5 h-4 bg-secondary/60 rounded-md"></div>
                        <div className="w-full h-4 bg-secondary/40 rounded-md"></div>
                        <div className="w-3/4 h-4 bg-secondary/40 rounded-md"></div>
                      </div>
                    </div>
                    <div className="col-span-2 bg-blue-50/50 rounded-lg p-4 border border-blue-100/50">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30">
                          <div className="w-1/2 h-3 bg-blue-200/50 rounded-md mb-2"></div>
                          <div className="w-full h-8 bg-secondary/60 rounded-md"></div>
                        </div>
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30">
                          <div className="w-1/2 h-3 bg-blue-200/50 rounded-md mb-2"></div>
                          <div className="w-full h-8 bg-secondary/60 rounded-md"></div>
                        </div>
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30">
                          <div className="w-1/2 h-3 bg-blue-200/50 rounded-md mb-2"></div>
                          <div className="w-full h-8 bg-secondary/60 rounded-md"></div>
                        </div>
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30">
                          <div className="w-1/2 h-3 bg-blue-200/50 rounded-md mb-2"></div>
                          <div className="w-full h-8 bg-secondary/60 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
