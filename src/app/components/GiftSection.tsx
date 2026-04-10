import { ProductCard } from './ProductCard';

export default function GiftSection() {
  const gifts = [
    {
      name: 'Custom Printed T-Shirt',
      description: 'Personalized design of your choice',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Personalized Mug',
      description: 'Custom printed coffee cup with your message',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1668697753062-8a2a5a09d8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Custom Cushion',
      description: 'Soft cushion with your photo or text',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1629949009710-2df14c41a72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    }
  ];

  return (
    <section id="gifts" className="max-w-7xl mx-auto px-6 py-32 border-t border-border">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Personalized Gifts</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Custom printed t-shirts, mugs, and cushions. Add your personal touch to every gift.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gifts.map((gift, index) => (
          <ProductCard key={gift.name} {...gift} index={index} />
        ))}
      </div>
    </section>
  );
}
