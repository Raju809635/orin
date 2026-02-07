import React from 'react';
import Link from 'next/link';
import { GraduationCap, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
             <Link href="/" className="flex items-center space-x-2">
                <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold font-headline text-2xl tracking-tighter">ORIN</span>
            </Link>
            <p className="text-muted-foreground text-sm">Unlock your potential with the best mentors.</p>
            <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Browse Mentors</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Become a Mentor</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Categories</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="font-semibold mb-4 font-headline">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
           <div>
             <h3 className="font-semibold mb-4 font-headline">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ORIN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
