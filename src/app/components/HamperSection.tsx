import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CustomizeModal } from './CustomizeModal';

export default function HamperSection() {
  const [selectedHamper, setSelectedHamper] = useState<string | null>(null);

  const hampers = [
    {
      name: 'Starter Birthday Hamper',
      description: 'A delightful starter birthday hamper with sweet treats',
      price: '₹500',
      image: '/500birthday.jpeg'
    },
    {
      name: 'Classic Birthday Hamper',
      description: 'A classic birthday hamper featuring our signature assortment',
      price: '₹700',
      image: '/700birthday.jpeg'
    },
    {
      name: 'Premium Birthday Hamper',
      description: 'Our premium birthday hamper for the ultimate celebration',
      price: '₹1500',
      image: '/1500birthday.jpg'
    },
    {
      name: 'Twix Balloon Hamper',
      description: 'A customizable twix balloon hamper tailored to your needs',
      price: '₹1200',
      image: '/Twix-Bunny-Balloon-Hamper.jpg',
      customizable: true
    },
    {
      name: 'Birthday Celebration',
      description: 'Balloons, cupcakes, and party treats',
      price: '₹1599',
      image: 'https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Anniversary Bliss',
      description: 'Champagne truffles, rose petals, and balloons',
      price: '₹2199',
      image: 'https://images.unsplash.com/photo-1644890916891-5a595c8c098f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Sweet Surprise',
      description: 'Assorted pastries with celebration balloons',
      price: '₹1299',
      image: 'https://images.unsplash.com/photo-1644890916875-65f1254ef092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    }
  ];

  return (
    <section id="hampers" className="max-w-7xl mx-auto px-6 py-32 border-t border-border">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Celebration Hampers</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Perfect for birthdays and anniversaries. Each hamper includes festive balloons and sweet treats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hampers.map((hamper, index) => (
          <ProductCard 
            key={hamper.name} 
            {...hamper} 
            index={index} 
            onCustomize={() => setSelectedHamper(hamper.name)}
          />
        ))}
      </div>

      <CustomizeModal
        isOpen={!!selectedHamper}
        onClose={() => setSelectedHamper(null)}
        cakeName={selectedHamper || ''}
      />
    </section>
  );
}
