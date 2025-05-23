
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const { state } = useApp();

  const categoryData = state.categories.map(category => {
    const categoryProducts = mockProducts.filter(p => p.category === category);
    const images = [
      'https://images.unsplash.com/photo-1504148455328-d4b372b4d7a6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1609603885884-4e7f689d2a28?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605812830455-987ec987469a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581092580204-61b8dff4e456?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop'
    ];
    
    return {
      name: category,
      count: categoryProducts.length,
      image: images[state.categories.indexOf(category) % images.length],
      description: getCategoryDescription(category),
      topBrands: getTopBrands(categoryProducts),
      priceRange: getPriceRange(categoryProducts)
    };
  });

  function getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      'Power Tools': 'Electric and battery-powered tools for efficient construction work',
      'Hand Tools': 'Manual tools for precision work and detailed craftsmanship',
      'Measuring Tools': 'Precision instruments for accurate measurements and layout',
      'Safety Equipment': 'Personal protective equipment to keep workers safe',
      'Heavy Machinery': 'Large equipment for heavy-duty construction projects',
      'Welding Equipment': 'Professional welding tools and accessories'
    };
    return descriptions[category] || 'Professional construction equipment and tools';
  }

  function getTopBrands(products: typeof mockProducts): string[] {
    const brandCounts = products.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    return Object.entries(brandCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([brand]) => brand);
  }

  function getPriceRange(products: typeof mockProducts): { min: number; max: number } {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive selection of construction tools and equipment, 
            organized by category for easy browsing
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.map((category, index) => (
            <Link 
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-everest-600 hover:bg-everest-700">
                      {category.count} items
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3">
                    {/* Price Range */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price Range:</span>
                      <span className="font-semibold">
                        ${category.priceRange.min} - ${category.priceRange.max}
                      </span>
                    </div>
                    
                    {/* Top Brands */}
                    {category.topBrands.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-2">Top Brands:</span>
                        <div className="flex flex-wrap gap-1">
                          {category.topBrands.map(brand => (
                            <Badge key={brand} variant="outline" className="text-xs">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <span className="text-sm font-medium text-everest-600 group-hover:text-everest-700 transition-colors">
                      Browse Category
                    </span>
                    <ArrowRight className="h-4 w-4 text-everest-600 group-hover:text-everest-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Most Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryData
              .sort((a, b) => b.count - a.count)
              .slice(0, 4)
              .map(category => (
                <Link
                  key={category.name}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <div className="text-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:border-everest-300">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-everest-100 flex items-center justify-center group-hover:bg-everest-200 transition-colors">
                      <span className="text-everest-600 font-bold text-lg">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
