
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Truck, 
  Award, 
  Clock,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Initialize products if empty
    if (state.products.length === 0) {
      // This would normally come from an API
      console.log('Initializing products...');
    }
  }, [state.products]);

  const featuredProducts = mockProducts.slice(0, 4);
  const topCategories = [
    { 
      name: 'Power Tools', 
      image: 'https://images.unsplash.com/photo-1504148455328-d4b372b4d7a6?w=300&h=200&fit=crop',
      count: '120+ items'
    },
    { 
      name: 'Hand Tools', 
      image: 'https://images.unsplash.com/photo-1609603885884-4e7f689d2a28?w=300&h=200&fit=crop',
      count: '85+ items'
    },
    { 
      name: 'Safety Equipment', 
      image: 'https://images.unsplash.com/photo-1605812830455-987ec987469a?w=300&h=200&fit=crop',
      count: '95+ items'
    },
    { 
      name: 'Heavy Machinery', 
      image: 'https://images.unsplash.com/photo-1581092580204-61b8dff4e456?w=300&h=200&fit=crop',
      count: '45+ items'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'All products come with manufacturer warranty and our quality promise'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $100 with next-day delivery available'
    },
    {
      icon: Award,
      title: 'Expert Support',
      description: '24/7 customer support from construction industry professionals'
    },
    {
      icon: Clock,
      title: 'Easy Returns',
      description: '30-day return policy with no questions asked guarantee'
    }
  ];

  const testimonials = [
    {
      name: 'Mike Rodriguez',
      role: 'General Contractor',
      content: 'Everest Evolution has been my go-to supplier for 5+ years. Quality tools, fair prices, and excellent service.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Construction Manager',
      content: 'The variety and quality of their industrial equipment is unmatched. Fast delivery too!',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Electrician',
      content: 'Best place to find specialized tools. Their expert recommendations have saved me time and money.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Build the Future
            <span className="block text-construction-400">One Tool at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in delay-200">
            Premium construction tools and industrial equipment for professionals who demand excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400">
            <Link to="/products">
              <Button size="lg" className="btn-primary text-lg px-8 py-3">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float hidden lg:block">
          <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-32 left-16 animate-float delay-1000 hidden lg:block">
          <div className="w-16 h-16 bg-construction-500/20 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular construction tools and equipment, trusted by professionals worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">
              Find exactly what you need from our comprehensive selection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => (
              <Link key={index} to={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="group overflow-hidden card-hover">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.count}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Everest Evolution</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're more than just a supplier - we're your trusted partner in building excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-everest-100 rounded-full mb-4 group-hover:bg-everest-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-everest-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg">
              Trusted by thousands of professionals across the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-everest-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 construction-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of professionals who trust Everest Evolution for their construction needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-construction-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-construction-600 text-lg px-8 py-3">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
