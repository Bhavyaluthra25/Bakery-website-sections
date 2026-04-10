import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import HamperSection from './components/HamperSection';
import GiftSection from './components/GiftSection';
import CakeSection from './components/CakeSection';
import { Footer } from './components/Footer';
import { CustomizeModal } from './components/CustomizeModal';

export default function App() {
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState('');

  const handleCustomize = (cakeName: string) => {
    setSelectedCake(cakeName);
    setCustomizeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <main>
        <HamperSection />
        <GiftSection />
        {/* Pass the onCustomize handler to CakeSection */}
        <CakeSection onCustomize={handleCustomize} />
      </main>

      <Footer />

      <CustomizeModal
        isOpen={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
        cakeName={selectedCake}
      />
    </div>
  );
}