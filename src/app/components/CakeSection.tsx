import { ProductCard } from './ProductCard';
import CakeSelector from './CakeSelector';

interface CakeSectionProps {
  onCustomize: (cakeName: string) => void;
}

export default function CakeSection({ onCustomize }: CakeSectionProps) {
  const cakes = [
    {
      name: 'Chocolate Elegance',
      description: 'Rich dark chocolate layers with velvet frosting',
      price: 'From ₹999',
      image: 'https://images.unsplash.com/photo-1594403759538-5141d2cc452a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Vanilla Dream',
      description: 'Classic vanilla sponge with buttercream',
      price: 'From ₹899',
      image: 'https://images.unsplash.com/photo-1557776959-f066eb37857f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Red Velvet',
      description: 'Smooth cream cheese frosting on red velvet',
      price: 'From ₹1199',
      image: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Strawberry Delight',
      description: 'Fresh strawberries and light cream',
      price: 'From ₹1099',
      image: 'https://images.unsplash.com/photo-1726828952313-385d63df2514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Lemon Citrus',
      description: 'Fresh lemon zest with tangy glaze',
      price: 'From ₹949',
      image: 'https://images.unsplash.com/photo-1552958492-9cb8e9446673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Caramel Delight',
      description: 'Salted caramel buttercream perfection',
      price: 'From ₹1049',
      image: 'https://images.unsplash.com/photo-1658413381696-e75f942aa3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Raspberry Rose',
      description: 'Delicate rose water with fresh raspberries',
      price: 'From ₹1299',
      image: 'https://images.unsplash.com/photo-1670225078962-0c3490641003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Pistachio Bliss',
      description: 'Ground pistachios with white chocolate',
      price: 'From ₹1399',
      image: 'https://images.unsplash.com/photo-1701944578045-dc3f7fd28335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Matcha Green Tea',
      description: 'Japanese matcha with honey glaze',
      price: 'From ₹1199',
      image: 'https://images.unsplash.com/photo-1672504015204-07372bd02933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Tiramisu Supreme',
      description: 'Coffee-soaked layers with mascarpone',
      price: 'From ₹1499',
      image: 'https://images.unsplash.com/photo-1671721100511-4cb82346d66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    }
  ];

  return (
    <section id="cakes" className="max-w-7xl mx-auto px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Custom Cakes</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Choose your favorite flavor and size. Each cake is handcrafted with love and premium ingredients.
        </p>
      </div>

      <div className="mb-24">
        <CakeSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cakes.map((cake, index) => (
          <ProductCard
            key={cake.name}
            {...cake}
            index={index}
            onCustomize={() => onCustomize(cake.name)}
          />
        ))}
      </div>
    </section>
  );
}
