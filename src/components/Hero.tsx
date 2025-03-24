
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
              Revolutionizing Agricultural Management in India
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6 md:mb-8 text-foreground animate-fade-down" style={{ animationDelay: '0.1s' }}>
              Precision Clustering of Aerial Objects Using
              <span className="text-gradient"> Trajectory Analysis</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 text-balance animate-fade-down" style={{ animationDelay: '0.2s' }}>
              An advanced agricultural management system designed for Indian farmers that combines detailed farmer
              and land information with cutting-edge aerial imagery analysis for precision farming.
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
          
          {/* Interactive Analytics Example */}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 bg-white/70 p-4 rounded-lg shadow-sm border border-blue-50">
                      <h3 className="font-semibold text-primary">Karnataka Region</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Farmers:</span>
                          <span className="font-medium">3,240</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Land Area:</span>
                          <span className="font-medium">12,758 hectares</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Active Schemes:</span>
                          <span className="font-medium">48</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Scheme Applications:</span>
                          <span className="font-medium">1,235</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 bg-blue-50/50 rounded-lg p-4 border border-blue-100/50">
                      <h3 className="font-semibold mb-3 text-primary">Recent Farmer Applications</h3>
                      <div className="space-y-2">
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Rajesh Kumar</div>
                            <div className="text-xs text-gray-500">Crop Insurance Scheme</div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approved</span>
                        </div>
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Priya Sharma</div>
                            <div className="text-xs text-gray-500">Seed Distribution Program</div>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                        </div>
                        <div className="bg-white/70 p-3 rounded-md border border-blue-100/30 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Amit Patel</div>
                            <div className="text-xs text-gray-500">Irrigation Support</div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approved</span>
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
