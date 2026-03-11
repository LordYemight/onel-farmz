'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Heart, 
  Truck, 
  MapPin, 
  ArrowRight, 
  Star, 
  Shield, 
  Users, 
  Award, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone,
  ImageOff,
  ChevronRight,
  Quote
} from 'lucide-react';

// --- Components ---

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const SafeImage = ({ src, alt, fill, width, height, className, priority }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-stone-200 ${className}`}>
        <ImageOff size={32} className="text-stone-400" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { 
        setDisplay(prev => prev + text.charAt(i)); 
        i++; 
      } else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Data ---

const BRAND = {
  name: "Onel Farmz",
  tagline: "Nourishing Niger State, Organically.",
  description: "Onel Farmz is dedicated to raising the highest quality, ethically raised, and 100% organic poultry for discerning customers in Minna and beyond.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1771856060604-3a697f33ee2f?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1660224286794-fc173fa9295c?auto=format&fit=crop&w=1000&q=80",
  products: [
    "https://images.unsplash.com/photo-1559229873-383d75ba200f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1756361946794-d7976ff5f765?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1765252582326-d5768f3325aa?auto=format&fit=crop&w=800&q=80"
  ]
};

const FEATURES = [
  { title: "100% Organic Feed", description: "No hormones, no antibiotics, just pure, clean nutrition for our birds.", icon: Leaf },
  { title: "Ethically Raised", description: "Our poultry roams freely in healthy environments, ensuring superior taste.", icon: Heart },
  { title: "Minna Local Delivery", description: "Directly from our farm hub to your table in David Mark Road area.", icon: Truck },
  { title: "Farm Traceability", description: "Know exactly where your food comes from with our transparent sourcing.", icon: MapPin }
];

const PRODUCTS = [
  { name: "Organic Whole Chicken (1.5kg)", price: "₦4,500", desc: "Our signature free-range chicken, fed on organic feed. Ready for roasting.", image: IMAGES.products[0] },
  { name: "Premium Chicken Breast", price: "₦3,800", desc: "Lean, tender, and perfectly portioned for healthy meals. Vacuum-sealed.", image: IMAGES.products[1] },
  { name: "Farm Fresh Eggs (Dozen)", price: "₦1,800", desc: "Pasture-raised hens producing rich, deep-yolked eggs daily.", image: IMAGES.products[2] },
  { name: "Organic Chicken Parts Box", price: "₦6,200", desc: "A curated mix of thighs, wings, and drumsticks. Perfect for bulk orders.", image: IMAGES.products[3] }
];

const TESTIMONIALS = [
  { name: "Aisha Mohammed", role: "Chef", text: "The quality of Onel Farmz chicken is unmatched in Minna. You can taste the organic difference." },
  { name: "Emeka Obi", role: "Parent", text: "Finally, a reliable source for clean poultry. My kids love the eggs, and I trust the quality." },
  { name: "Sani Yusuf", role: "Restaurateur", text: "Consistency is key in my business. Onel Farmz delivers the best birds every single week." },
  { name: "Blessing Okoro", role: "Home Cook", text: "The delivery is always on time. Sharp delivery, no stories. Highly recommended!" },
  { name: "Abubakar Ibrahim", role: "Fitness Coach", text: "Clean protein is vital for my clients. This is the only poultry farm I endorse in Niger State." }
];

// --- Sections ---

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const typedHeadline = useTypewriter("The Purest Poultry in Minna.");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="font-heading text-2xl font-black text-secondary tracking-tighter">
              ONEL
            </span>
            <span className={`text-xs font-mono tracking-[0.2em] uppercase ${scrolled ? 'text-stone-500' : 'text-stone-700'}`}>
              FARMZ
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Produce', 'Our Story', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '')}`}
                className="text-sm font-bold uppercase tracking-widest text-stone-800 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition shadow-lg"
            >
              ORDER NOW
            </a>
          </div>

          <button className="md:hidden text-stone-800" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 flex flex-col">
            <button className="self-end mb-12 text-stone-800" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6">
              {['Home', 'Produce', 'Our Story', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="text-2xl font-heading font-bold text-stone-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-secondary text-white text-center py-4 rounded-xl font-bold mt-4"
                onClick={() => setMenuOpen(false)}
              >
                ORDER NOW
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="font-heading text-6xl md:text-8xl font-black text-stone-900 leading-[1.1] mb-8">
            {typedHeadline}<span className="text-accent animate-pulse">|</span>
          </h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/2348012345678" className="bg-secondary text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-secondary/20">
              Order via WhatsApp <ArrowRight size={20} />
            </a>
            <a href="#products" className="bg-white border-2 border-stone-200 text-stone-800 px-10 py-5 rounded-full font-bold text-lg hover:bg-stone-50 transition">
              See Our Produce
            </a>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <SectionWrapper id="features" className="bg-stone-50">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-stone-900">Our Commitment to Purity</h2>
          <p className="text-stone-500 mt-4 max-w-2xl mx-auto">Why Onel Farmz is the preferred choice for premium organic poultry in Niger State.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <f.icon size={28} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Divider */}
      <div className="py-12 border-y border-stone-100 bg-white overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex items-center gap-4 text-stone-400 font-bold uppercase tracking-widest text-sm">
              <Shield className="text-secondary" size={16} />
              100% Organic Certified
              <Award className="text-accent" size={16} />
              Ethically Raised
              <Leaf className="text-secondary" size={16} />
              Minna Fresh
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <SectionWrapper id="produce" className="bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-stone-900">Premium Produce</h2>
            <p className="text-stone-500 mt-4">Hand-selected cuts, delivered fresh to your door in Minna.</p>
          </div>
          <p className="text-secondary font-mono text-sm tracking-widest uppercase bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
            Sharp delivery, nationwide.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="group bg-primary/50 rounded-3xl overflow-hidden border border-stone-100 flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-stone-900 font-bold text-lg shadow-sm">
                    {p.price}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-heading font-bold text-xl mb-3 leading-tight group-hover:text-secondary transition-colors">{p.name}</h3>
                <p className="text-stone-500 text-sm mb-6 line-clamp-2">{p.desc}</p>
                <a href="#contact" className="mt-auto flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-stone-800 transition">
                  Order Now <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper id="ourstory" className="bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <SafeImage src={IMAGES.about} alt="Farm background" fill className="object-cover grayscale" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Legacy</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black mt-6 leading-tight">Nourishing Niger State Since Day One.</h2>
            <p className="text-stone-400 mt-8 text-lg leading-relaxed">
              Founded on the principle that local food should never compromise on quality or ethics, Onel Farmz transformed a section of Niger State into a model for sustainable organic poultry farming.
            </p>
            <p className="text-stone-400 mt-6 text-lg leading-relaxed">
              We believe in transparency, soil health, and the well-being of our birds, resulting in a product that is not only safer but significantly more flavorful.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { n: "5", l: "Years Organic", i: Award },
                { n: "1.5K", l: "Happy Clients", i: Users },
                { n: "100%", l: "No Chemicals", i: Shield }
              ].map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-secondary mx-auto mb-4">
                    <s.i size={20} />
                  </div>
                  <p className="text-3xl font-black font-heading text-white">{s.n}</p>
                  <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-1 font-bold">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square rounded-[2rem] overflow-hidden border-8 border-white/5">
            <SafeImage src={IMAGES.about} alt="The Farm" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <section className="py-24 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Loved by 18K+ Minna Locals</h2>
          <p className="text-stone-500 mt-4">Real feedback from our farm-to-table community.</p>
        </div>
        
        <div className="flex w-[200%] gap-8 animate-slide-left">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[400px] shrink-0 bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex flex-col">
              <div className="flex text-secondary mb-6">
                {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={16} />)}
              </div>
              <Quote className="text-stone-100 mb-4" size={40} />
              <p className="text-stone-700 italic text-lg leading-relaxed mb-8">"{t.text}"</p>
              <div className="mt-auto flex items-center gap-4 border-t border-stone-50 pt-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{t.name}</h4>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <SectionWrapper id="contact" className="bg-stone-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-5xl font-black text-stone-900 mb-8">Visit Our Hub or Place an Order</h2>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed">
              We’re located in the heart of Minna. Whether you want a single chicken or a bulk supply for your restaurant, we’re ready to serve you.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: MapPin, text: BRAND.region === "nigeria" ? "David mark road, Minna, Niger state, Nigeria" : "Main Street, Minna" },
                { icon: Phone, text: "+234 801 234 5678" },
                { icon: Mail, text: "order@onelfarmz.ng" },
                { icon: Instagram, text: "@onelfarmz" }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 text-stone-700">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary border border-stone-100">
                    <c.icon size={20} />
                  </div>
                  <span className="font-medium">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100">
            {formSuccess ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-stone-500">We'll get back to you within 24 hours.</p>
                <button onClick={() => setFormSuccess(false)} className="mt-8 text-secondary font-bold underline">Send another message</button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setFormSuccess(true); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                    <input required className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Phone</label>
                    <input required className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="080 123 4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email</label>
                  <input required type="email" className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Your Message</label>
                  <textarea required rows={4} className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="I'd like to order..." />
                </div>
                <button className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-accent/20">
                  SEND ENQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-stone-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-8">
              <span className="font-heading text-3xl font-black text-secondary tracking-tighter">ONEL</span>
              <span className="text-stone-500 text-xs font-mono tracking-[0.2em] uppercase">FARMZ</span>
            </a>
            <p className="text-stone-400 max-w-sm text-lg leading-relaxed">
              Nourishing Niger State with the finest organic poultry. Ethically raised, freshly delivered, transparently farmed.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-secondary">Quick Links</h4>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#produce" className="hover:text-white transition">Our Produce</a></li>
              <li><a href="#ourstory" className="hover:text-white transition">Our Story</a></li>
              <li><a href="#contact" className="hover:text-white transition">Order Now</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-secondary">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-6">Get organic recipes and farm updates directly in your inbox.</p>
            <div className="relative">
              <input className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-secondary" placeholder="Email address" />
              <button className="absolute right-2 top-2 bottom-2 bg-secondary text-white px-6 rounded-full font-bold text-xs">JOIN</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Onel Farmz. All rights reserved.
          </p>
          <div className="flex gap-8 text-stone-500 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionWrapper({ children, className, id }: { children: React.ReactNode, className?: string, id: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      id={id}
      ref={ref}
      className={`py-24 px-6 transition-all duration-1000 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}