'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Truck, 
  ChefHat, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  Star, 
  Menu, 
  X, 
  CheckCircle2, 
  ImageOff,
  Sun,
  Calendar,
  Trophy,
  Clock,
  Percent,
  Map
} from 'lucide-react';

// --- Types ---
interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

// --- Components ---
const SafeImage = ({ src, alt, fill, width, height, className, priority }: SafeImageProps) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={32} className="text-zinc-600" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Data ---
const BRAND = {
  name: "Onel Farmz",
  tagline: "80% Organic Broiler Chickens.",
  description: "Premium, ethically-raised poultry delivered fresh from our sustainable farms in Minna directly to your kitchen in Lagos. We champion animal welfare, offering superior flavor and nutrition for discerning chefs and families.",
  colors: { primary: "#2D5A27", secondary: "#FF8C00", accent: "#FFFFF0" }
};

const PRODUCTS = [
  { name: "Whole Organic Broiler (1.8kg)", desc: "Slow-grown, free-range broiler, perfectly dressed for whole roasting.", price: "₦9,500", img: "https://images.unsplash.com/photo-1642497394469-188b0f4bcae6?auto=format&fit=crop&q=80" },
  { name: "Organic Chicken Thighs (1kg Pack)", desc: "Juicy, flavor-packed thighs, ideal for stews and grilling.", price: "₦6,200", img: "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?auto=format&fit=crop&q=80" },
  { name: "Premium Chicken Breast Fillets (500g)", desc: "Lean, tender breast meat, perfect for delicate culinary applications.", price: "₦4,800", img: "https://images.unsplash.com/photo-1720960648298-98d21369ddf2?auto=format&fit=crop&q=80" },
  { name: "Farm-Choice Cut Box (Mixed)", desc: "A curated selection of organs, wings, and cuts for diverse culinary needs.", price: "₦15,000", img: "https://images.unsplash.com/photo-1617636423451-0db0119c14cd?auto=format&fit=crop&q=80" }
];

const FEATURES = [
  { title: "Ethically Raised Standards", desc: "Our birds are raised with 80% organic feed and ample space, ensuring superior welfare.", icon: <Leaf className="text-secondary" /> },
  { title: "Cold Chain Integrity", desc: "From Minna to your door in Lagos, guaranteed temperature-controlled delivery.", icon: <Truck className="text-secondary" /> },
  { title: "Chef Bulk Rates", desc: "Exclusive wholesale pricing tiers for Lagos's top kitchens and caterers.", icon: <ChefHat className="text-secondary" /> }
];

const STATS = [
  { number: "80%", label: "Organic Feed", icon: <Percent size={20} /> },
  { number: "50%", label: "Wait Reduction", icon: <Clock size={20} /> },
  { number: "100%", label: "Traceability", icon: <Map size={20} /> }
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const diffReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const socialReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-primary font-black text-xl">O</span>
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-accent">ONEL FARMZ</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Quality', 'Cuts', 'Partners', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2">
              ORDER NOW <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden text-accent" onClick={() => setMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto h-full w-[80%] max-w-sm bg-primary p-8 shadow-2xl flex flex-col">
            <button className="self-end mb-8 text-accent" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Home', 'Quality', 'Cuts', 'Partners', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Home' ? '#home' : `#${item.toLowerCase()}`} 
                  className="text-2xl font-heading font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section (HR-C Split) */}
      <section 
        id="home"
        ref={heroReveal.ref}
        className="min-h-screen grid md:grid-cols-2 pt-20 overflow-hidden"
      >
        <div className={`flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <h1 className="font-heading text-6xl md:text-8xl font-black leading-[0.9] text-accent mt-6">
            Farm-Fresh <br /> <span className="text-secondary italic">Poultry.</span>
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-md leading-relaxed">
            {BRAND.tagline} {BRAND.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-12">
            <a href="#contact" className="bg-secondary text-primary px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
              ORDER VIA WHATSAPP <MessageCircle size={22} />
            </a>
          </div>
          <div className="mt-16 flex items-center gap-4 text-white/50 border-t border-white/10 pt-8 max-w-sm">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-zinc-700" />)}
            </div>
            <p className="text-sm font-medium italic">Join 500+ Lagos families eating fresh today.</p>
          </div>
        </div>
        <div className="relative min-h-[500px] h-full">
          <SafeImage 
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80"
            alt="Premium Broiler"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent md:hidden block" />
        </div>
      </section>

      {/* Feature Section Grid */}
      <section id="quality" ref={featuresReveal.ref} className="py-32 px-6 bg-accent text-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-heading font-black">Our Commitment to Quality</h2>
            <p className="text-primary/60 mt-4 text-lg">Why Chefs Choose Onel Farmz Over Conventional Suppliers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl bg-primary text-white transition-all duration-1000 delay-${i * 200} ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{f.title}</h3>
                <p className="text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Divider (A6b) */}
      <div className="py-16 flex items-center gap-6 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        <span className="text-secondary font-mono text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          Minna Soil • Lagos Kitchens
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      </div>

      {/* Stats/Difference Section (A2) */}
      <section ref={diffReveal.ref} className="py-24 px-6 relative">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${diffReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">The Onel Farmz Difference</h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
            We adhere to strict protocols that go beyond industry standards, focusing on animal happiness which directly translates to better taste and texture for your patrons. Sharp delivery guaranteed across Lagos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="mb-4 text-secondary">{stat.icon}</div>
                <span className="text-5xl font-black text-accent">{stat.number}</span>
                <span className="text-sm text-white/40 uppercase tracking-widest mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="cuts" ref={productsReveal.ref} className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-heading font-black">Our Premium Cuts</h2>
              <p className="text-white/40 mt-4 text-lg">Available for Immediate Delivery or Scheduled Supply</p>
            </div>
            <a href="#contact" className="text-secondary font-bold flex items-center gap-2 group border-b border-secondary pb-1">
              VIEW WHOLESALE PRICING <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <div 
                key={i} 
                className={`group bg-white/5 border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full font-bold text-sm">
                    {p.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-heading font-bold mb-3">{p.name}</h3>
                  <p className="text-white/50 text-sm line-clamp-3 mb-6">{p.desc}</p>
                  <a href="#contact" className="w-full bg-white/10 hover:bg-secondary hover:text-primary py-3 rounded-xl font-bold transition-all text-center block text-sm">
                    ORDER NOW
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Split) */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-5xl font-heading font-bold mb-8">From Minna Soil to Your Table</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Onel Farmz was founded on the principle that high-quality poultry shouldn't be a luxury. By managing our supply chain meticulously from our green fields near Minna, we ensure every piece of chicken delivered to Lagos meets our promise of premium farm-fresh quality you can trust.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-4 items-center">
                <Sun className="text-secondary" />
                <div>
                  <p className="font-bold text-accent">Minna</p>
                  <p className="text-xs text-white/40">FARM LOCATION</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Calendar className="text-secondary" />
                <div>
                  <p className="font-bold text-accent">365 Days</p>
                  <p className="text-xs text-white/40">FRESH SUPPLY</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <SafeImage 
              src="https://images.unsplash.com/photo-1509906531371-968f5ae32343?auto=format&fit=crop&q=80" 
              alt="The Farm" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Contact Section (C1 Pattern) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="p-12 md:p-16 flex-1 bg-primary border-r border-white/5">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Taste the Difference?</h2>
            <p className="text-white/60 mb-12">Reach out for home delivery or wholesale restaurant supply across Lagos.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">WhatsApp / Call</p>
                  <p className="text-lg font-bold">+234-XXX-XXXX-XXX</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold">orders@onelfarmz.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Headquarters</p>
                  <p className="text-lg font-bold">Lagos Hub, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 md:p-16 flex-1 bg-white/5">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/60">We'll get back to you shortly with availability.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-secondary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 block mb-2">Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary transition-colors outline-none" placeholder="John D." />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 block mb-2">Phone</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary transition-colors outline-none" placeholder="080..." />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 block mb-2">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary transition-colors outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 block mb-2">Message / Order Details</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary transition-colors outline-none resize-none" placeholder="Tell us what you need..."></textarea>
                </div>
                <button type="submit" className="w-full bg-secondary text-primary font-black py-4 rounded-xl hover:brightness-110 transition-all">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer (F2) */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
                  <span className="text-primary font-black text-xl">O</span>
                </div>
                <span className="font-heading font-bold text-2xl tracking-tight text-accent uppercase">ONEL FARMZ</span>
              </a>
              <p className="text-white/40 max-w-sm mb-8">
                Ethically raised, farm-fresh poultry delivered from the soil of Minna to the plates of Lagos.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent">Links</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#quality" className="hover:text-secondary transition-colors">Quality Process</a></li>
                <li><a href="#cuts" className="hover:text-secondary transition-colors">Our Cuts</a></li>
                <li><a href="#about" className="hover:text-secondary transition-colors">About Our Farm</a></li>
                <li><a href="#contact" className="hover:text-secondary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent">Availability</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li>Minna, Niger State</li>
                <li>Ikeja, Lagos Hub</li>
                <li>Lekki/Ajah Delivery</li>
                <li>Surulere Hub</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-white/30 text-xs font-mono">
            <p>© {new Date().getFullYear()} ONEL FARMZ. ALL RIGHTS RESERVED.</p>
            <p>Sustainably Raised in Minna, Nigeria.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}