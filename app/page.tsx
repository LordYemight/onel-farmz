'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Truck, 
  CheckCircle, 
  Handshake, 
  Users, 
  CalendarCheck, 
  Star, 
  Quote, 
  ArrowRight, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone,
  Menu,
  X,
  ImageOff,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

// --- DATA ---
const BRAND = {
  name: "Onel Farmz",
  tagline: "80% Organic Broiler Chickens.",
  description: "The premier source for ethically-raised, premium organic broiler chickens, serving the Minna community with unparalleled freshness and quality.",
  industry: "food",
  region: "nigeria",
  currency: "₦",
  contact: {
    whatsapp: "https://wa.me/234XXXXXXXXXX",
    instagram: "https://instagram.com/onelfarmz",
    email: "orders@onelfarmz.ng",
    address: "David mark road, Minna, Niger state, Nigeria"
  }
};

const PRODUCTS = [
  {
    name: "Whole Organic Broiler (1.5kg)",
    description: "A full, pasture-raised organic broiler, perfect for family feasts. Ready for delivery within Minna.",
    price: "₦5,500",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80"
  },
  {
    name: "Organic Chicken Thighs (Pack of 4)",
    description: "Juicy, flavorful thighs, ideal for grilling or stewing. Ethically sourced and packed fresh.",
    price: "₦3,200",
    image: "https://images.unsplash.com/photo-1617636423451-0db0119c14cd?auto=format&fit=crop&q=80"
  },
  {
    name: "Organic Chicken Breast (1kg)",
    description: "Lean, tender, premium-grade breast meat. Excellent for healthy meal preparation.",
    price: "₦3,850",
    image: "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?auto=format&fit=crop&q=80"
  },
  {
    name: "Minna Bulk Box (5 Birds)",
    description: "A curated box of 5 whole organic broilers, optimized for local restaurants and caterers.",
    price: "₦25,000",
    image: "https://images.unsplash.com/photo-1672787153652-b3b9d92f3e8c?auto=format&fit=crop&q=80"
  }
];

const FEATURES = [
  { title: "Ethically Raised", description: "Birds raised on non-GMO feed with ample space for premium flavor.", icon: Leaf },
  { title: "Minna Delivery", description: "Reliable, rapid farm-to-table delivery across Niger State.", icon: Truck },
  { title: "7-Point Quality", description: "Rigorous safety checks before any bird leaves our facility.", icon: CheckCircle }
];

const TESTIMONIALS = [
  { name: "Aisha Bello", text: "The quality difference is visible. We switched our entire menu to Onel Farmz for our suya specialty.", role: "Owner, Mama J Kitchen" },
  { name: "City Grill Co.", text: "Reliable bulk supply and consistent freshness. They understand hospitality needs in Minna.", role: "Procurement Manager" },
  { name: "Dr. Emeka Nwanze", text: "As a nutritionist, I trust their organic claims. The meat is cleaner and tastes better.", role: "Local Health Advocate" }
];

const STATS = [
  { number: "100%", label: "Ethical Raising", icon: Handshake },
  { number: "18K+", label: "Local Followers", icon: Users },
  { number: "3+", label: "Years in Minna", icon: CalendarCheck }
];

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
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
}

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

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: productRef, isVisible: productVisible } = useScrollReveal();
  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  return (
    <main className="relative bg-zinc-950">
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="font-heading text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-primary">ONEL</span>
            <span className="text-white">FARMZ</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Products', 'Farm', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-primary transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">
              ORDER NOW
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] bg-zinc-950 p-8 flex flex-col">
          <button onClick={() => setIsMenuOpen(false)} className="self-end mb-12 text-white">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Products', 'Farm', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-heading font-black text-white">
                {link.toUpperCase()}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-4 bg-primary text-white text-center py-5 rounded-2xl font-black text-lg">
              ORDER NOW
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Pattern HR-C */}
      <section 
        id="home"
        ref={heroRef}
        className="min-h-screen grid lg:grid-cols-2 items-center bg-zinc-950 overflow-hidden relative"
      >
        <div className={`px-6 md:px-16 pt-32 pb-20 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="w-20 h-1 bg-primary mb-8" />
          <h1 className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8">
            FARM FRESH,<br />MINNA FOCUSED.
          </h1>
          <p className="text-white/60 text-xl md:text-2xl max-w-xl mb-12 font-light leading-relaxed">
            Experience the difference of truly organic, premium broiler chicken, raised right here in Niger State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-primary text-white px-10 py-5 rounded-full font-black text-lg hover:brightness-110 transition-all text-center flex items-center justify-center gap-2">
              ORDER FRESH POULTRY <ArrowRight size={20} />
            </a>
            <a href="#products" className="border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/5 transition-all text-center">
              SEE PRODUCTS
            </a>
          </div>
        </div>
        
        <div className={`relative h-full min-h-[500px] transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage 
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80"
            alt="Organic Chicken Farm Fresh"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>
      </section>

      {/* STATS STRIP - Pattern A6c */}
      <div className="bg-primary py-12 relative z-10 -mt-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <stat.icon className="text-white" size={24} />
              </div>
              <p className="text-5xl font-heading font-black text-white">{stat.number}</p>
              <p className="text-white/80 font-medium uppercase tracking-widest text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="farm" ref={aboutRef} className="py-24 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 ${aboutVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <SafeImage 
                  src="https://images.unsplash.com/photo-1642102904019-2eb4c4d2b492?auto=format&fit=crop&q=80"
                  alt="Farm commitment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-6">Local Supply Chain Excellence</span>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                The Minna Farm Commitment
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                At Onel Farmz, our mission is simple: provide Minna with the healthiest, most flavorful chicken possible. We manage every aspect of the raising process, from feed to dispatch, ensuring that when you cook with Onel Farmz, you are cooking with trust and transparency.
              </p>
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest">
                Quality wey go loud — supporting local growth in Niger State.
              </p>
              <div className="mt-12 h-px bg-white/10 w-full" />
              <div className="mt-12 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                   <Handshake size={32} />
                 </div>
                 <div>
                   <h4 className="font-bold text-white text-xl">100% Transparency</h4>
                   <p className="text-white/40">From our farm gates to your kitchen table.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" ref={productRef} className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">Premium Poultry</h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Fresh, pasture-raised, and ethically sourced. Ready for your favorite local recipes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <div 
                key={idx}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`group bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 ${productVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <SafeImage 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white px-4 py-2 rounded-full font-bold text-sm">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl font-black text-white mb-4 leading-tight">{product.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3">
                    {product.description}
                  </p>
                  <a href="#contact" className="flex items-center justify-between w-full group/btn">
                    <span className="text-white font-bold group-hover/btn:text-primary transition-colors uppercase tracking-widest text-xs">ORDER VIA WHATSAPP</span>
                    <ChevronRight size={18} className="text-primary group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section ref={featRef} className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {FEATURES.map((feature, i) => (
              <div 
                key={i} 
                className={`transition-all duration-1000 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-heading text-2xl font-black text-white mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Masonry Grid Style */}
      <section ref={testRef} className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">Trusted by Minna</h2>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(n => <Star key={n} fill="#E2725B" className="text-primary" size={20} />)}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i}
                className={`break-inside-avoid bg-zinc-950 border border-white/5 p-10 rounded-3xl relative transition-all duration-1000 ${testVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <Quote size={40} className="text-primary/10 absolute top-8 right-8" />
                <p className="text-white/80 text-xl font-light italic leading-relaxed mb-10 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-black text-primary border border-primary/30">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-primary/70 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Pattern C2 */}
      <section id="contact" ref={contactRef} className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary rounded-[3rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl shadow-primary/10">
            <div className={`p-10 md:p-20 transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                Ready to Taste the Best in Minna?
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white transition-colors group-hover:bg-white group-hover:text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">WhatsApp Orders</p>
                    <a href={BRAND.contact.whatsapp} className="text-2xl font-black text-white hover:underline transition-all underline-offset-4">+234 XXXXXXXXXX</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white transition-colors group-hover:bg-white group-hover:text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Email Us</p>
                    <a href={`mailto:${BRAND.contact.email}`} className="text-2xl font-black text-white hover:underline transition-all underline-offset-4">{BRAND.contact.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white transition-colors group-hover:bg-white group-hover:text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Visit Farm</p>
                    <p className="text-2xl font-black text-white">{BRAND.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white/5 backdrop-blur-md p-10 md:p-20 transition-all duration-1000 delay-300 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-scale-in">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 text-primary">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Message Sent!</h3>
                  <p className="text-white/80 text-lg">We'll get back to you shortly to confirm your farm fresh order.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-8 text-white font-bold border-b-2 border-white pb-1">SEND ANOTHER</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-6">
                  <div>
                    <label className="block text-white/80 font-bold uppercase tracking-widest text-xs mb-3">Full Name</label>
                    <input required className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors" placeholder="e.g. Samuel Okafor" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-bold uppercase tracking-widest text-xs mb-3">Email</label>
                      <input required type="email" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors" placeholder="samuel@minna.com" />
                    </div>
                    <div>
                      <label className="block text-white/80 font-bold uppercase tracking-widest text-xs mb-3">Phone</label>
                      <input required type="tel" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors" placeholder="080 000 0000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 font-bold uppercase tracking-widest text-xs mb-3">Your Order / Inquiry</label>
                    <textarea rows={4} required className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors" placeholder="Tell us what you need..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-white text-primary font-black text-lg py-5 rounded-2xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-3">
                    SEND ORDER <ShoppingBag size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Pattern F2 */}
      <footer className="bg-zinc-950 border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <a href="#home" className="font-heading text-3xl font-black tracking-tight flex items-center gap-2 mb-6">
                <span className="text-primary">ONEL</span>
                <span className="text-white">FARMZ</span>
              </a>
              <p className="text-white/40 leading-relaxed mb-8">
                Premium organic poultry raised with care in the heart of Minna, Niger State. Freshness guaranteed.
              </p>
              <div className="flex gap-4">
                <a href={BRAND.contact.instagram} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {['Products', 'Farm', 'Contact', 'Orders'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm mb-8">Support</h4>
              <ul className="space-y-4">
                {['FAQ', 'Bulk Supply', 'Privacy Policy', 'Terms'].map(item => (
                  <li key={item}><a href="#" className="text-white/50 hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-sm mb-8">Newsletter</h4>
              <p className="text-white/40 text-sm mb-6">Get updates on our weekly harvests.</p>
              <div className="flex">
                <input className="bg-white/5 border border-white/10 px-4 py-3 rounded-l-xl text-white w-full focus:outline-none" placeholder="Email" />
                <button className="bg-primary text-white px-4 py-3 rounded-r-xl font-bold">JOIN</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-center">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Onel Farmz. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-white/30 text-sm">
              <p>Minna, Niger State, Nigeria</p>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p>Organic Certified Standard</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}