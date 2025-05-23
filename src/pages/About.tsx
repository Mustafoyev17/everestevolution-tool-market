
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Globe, 
  TrendingUp, 
  Shield,
  Heart,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Globe, label: 'Countries Served', value: '25+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: TrendingUp, label: 'Products Sold', value: '1M+' }
  ];

  const timeline = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'Started as a small tool shop with a vision to provide quality construction equipment'
    },
    {
      year: '2012',
      title: 'Online Expansion',
      description: 'Launched our e-commerce platform, reaching customers nationwide'
    },
    {
      year: '2016',
      title: 'International Growth',
      description: 'Expanded operations to serve customers across North America'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Introduced AR tools and digital catalogs for enhanced customer experience'
    },
    {
      year: '2024',
      title: 'Sustainable Future',
      description: 'Leading the industry in eco-friendly tools and sustainable practices'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards.'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Our customers are at the heart of everything we do. We listen, adapt, and evolve to serve you better.'
    },
    {
      icon: Award,
      title: 'Expert Knowledge',
      description: 'Our team consists of industry professionals who understand the real needs of construction workers.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building Excellence
            <span className="block text-construction-400">Since 2009</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're more than just a tool supplier. We're your partners in construction, 
            committed to providing the highest quality equipment and unmatched service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-everest-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-everest-600" />
                </div>
                <div className="text-3xl font-bold text-everest-600 mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                Empowering builders and contractors with the tools they need to shape our world
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Committed to Excellence</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  At Everest Evolution, we believe that the right tools can transform not just projects, 
                  but entire communities. Our mission is to provide construction professionals with 
                  access to the highest quality equipment, backed by expert knowledge and unparalleled service.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We're not just selling tools – we're building relationships, supporting dreams, 
                  and helping create the infrastructure that shapes our future.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581092580204-61b8dff4e456?w=600&h=400&fit=crop"
                  alt="Construction team"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-construction-100 rounded-full mb-6">
                    <value.icon className="h-8 w-8 text-construction-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From humble beginnings to industry leader
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-everest-300"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-everest-600 rounded-full border-4 border-background"></div>
                    
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}>
                      <Card className="p-6">
                        <CardContent className="p-0">
                          <div className="text-everest-600 font-bold text-lg mb-2">{item.year}</div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 construction-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build With Us?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of professionals who trust Everest Evolution for their construction needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-construction-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-construction-600 text-lg px-8 py-3">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
