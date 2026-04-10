import CakeSelector from './CakeSelector';

interface CakeSectionProps {
  onCustomize: (cakeName: string) => void;
}

export default function CakeSection({ onCustomize }: CakeSectionProps) {
  return (
    <section id="cakes" className="max-w-7xl mx-auto px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Custom Cakes</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Choose your favorite flavor and size. Each cake is handcrafted with love and premium ingredients.
        </p>
      </div>

      <CakeSelector />
    </section>
  );
}
