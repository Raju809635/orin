import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center space-x-2">
                <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold font-headline text-2xl tracking-tighter text-white">Orin</span>
            </Link>
            <p className="text-sm mt-4">Empowering students with expert mentorship for academic and career success.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 font-headline">For Students</h3>
            <ul className="space-y-3">
              <li><Link href="/mentors" className="text-sm hover:text-white transition-colors">Find Mentors</Link></li>
              <li><Link href="/categories" className="text-sm hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="font-semibold text-white mb-4 font-headline">For Mentors</h3>
            <ul className="space-y-3">
              <li><Link href="/become-a-mentor" className="text-sm hover:text-white transition-colors">Become a Mentor</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Guidelines</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
           <div>
             <h3 className="font-semibold text-white mb-4 font-headline">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Orin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
