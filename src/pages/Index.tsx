
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Store in localStorage that form was submitted
    localStorage.setItem('contactFormSubmitted', 'true');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        <AnalyticsDashboard />
        <Features />
        
        {/* About Section */}
        <section id="about" className="py-20 md:py-32 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 }
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-secondary/30 p-8 rounded-xl border border-secondary relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                        <div className="font-semibold text-primary mb-1">Farmers</div>
                        <div className="text-3xl font-bold">3,240+</div>
                        <div className="text-muted-foreground text-sm mt-2">Registered users</div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                        <div className="font-semibold text-green-500 mb-1">Land Parcels</div>
                        <div className="text-3xl font-bold">12,758</div>
                        <div className="text-muted-foreground text-sm mt-2">Registered hectares</div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                        <div className="font-semibold text-yellow-500 mb-1">Schemes</div>
                        <div className="text-3xl font-bold">48</div>
                        <div className="text-muted-foreground text-sm mt-2">Active programs</div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                        <div className="font-semibold text-purple-500 mb-1">Analysis</div>
                        <div className="text-3xl font-bold">5,429</div>
                        <div className="text-muted-foreground text-sm mt-2">Aerial images processed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div>
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground">
                  About Agri-Trek
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Empowering Indian Agricultural Management Through Technology
                </h2>
                <p className="text-muted-foreground mb-6">
                  Agri-Trek is a comprehensive agricultural management system designed to streamline the administration of farmer data, land parcels, and government schemes while providing cutting-edge aerial image analysis for precision farming.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our platform helps agricultural officers maintain detailed records of farmers and their lands, track scheme eligibility and applications, and extract valuable insights from aerial imagery using advanced machine learning algorithms.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground">Simple and intuitive user interface designed for ease of use in rural areas of India</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground">Comprehensive data management system for all agricultural information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground">Advanced machine learning algorithms for aerial image analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-xl mx-auto text-center mb-16">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground">
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to Transform Your Agricultural Management?
              </h2>
              <p className="text-muted-foreground text-lg">
                Reach out to our team to learn more about how Agri-Trek can benefit your operations.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="glassmorphism backdrop-blur-sm rounded-xl overflow-hidden card-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                      <p className="mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                      
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                            <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-primary-foreground/70">Phone</p>
                            <p className="text-primary-foreground">+91 80-2356-7890</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                            <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-primary-foreground/70">Email</p>
                            <p className="text-primary-foreground">info@agritrek.in</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                            <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-primary-foreground/70">Address</p>
                            <p className="text-primary-foreground">123 MG Road, Indiranagar, Bengaluru 560038</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 mt-8">
                      <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-12 bg-white">
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-foreground mb-2">First Name</label>
                            <input
                              type="text"
                              id="first-name"
                              className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              placeholder="Rajesh"
                            />
                          </div>
                          <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                            <input
                              type="text"
                              id="last-name"
                              className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              placeholder="Kumar"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="rajesh@example.com"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="How can we help you?"
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                        >
                          Send Message
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-12">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2">Thank You!</h3>
                        <p className="text-muted-foreground text-center mb-6">
                          Your message has been received. We'll contact you within 24 hours.
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 bg-secondary/50 rounded-md hover:bg-secondary transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
