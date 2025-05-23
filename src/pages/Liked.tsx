
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, ArrowLeft } from 'lucide-react';

const Liked = () => {
  const { state } = useApp();

  const likedProducts = mockProducts.filter(product => 
    state.likedItems.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold">Liked Items</h1>
          <p className="text-muted-foreground">
            {likedProducts.length} {likedProducts.length === 1 ? 'item' : 'items'} in your favorites
          </p>
        </div>

        {likedProducts.length === 0 ? (
          <div className="text-center max-w-md mx-auto py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">No liked items yet</h2>
            <p className="text-muted-foreground mb-8">
              Start browsing and like items to save them for later
            </p>
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Liked;
