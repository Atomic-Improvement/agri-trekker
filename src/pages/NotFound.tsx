
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-[10rem] font-bold text-primary/10">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary">404</div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page not found</h1>
        
        <p className="text-muted-foreground mb-8">
          We're sorry, the page you requested could not be found. Please go back to the homepage.
        </p>
        
        <Link to="/">
          <Button className="rounded-full px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
