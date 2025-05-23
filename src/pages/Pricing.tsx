
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Truck, Shield, Clock, Star } from 'lucide-react';

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Standard',
      description: 'Perfect for small projects and individual contractors',
      price: 'Free',
      priceDetail: 'Basic membership',
      features: [
        'Access to all products',
        'Standard customer support',
        'Basic product information',
        'Email notifications',
        '30-day return policy'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Professional',
      description: 'Ideal for contractors and small construction companies',
      price: '$29',
      priceDetail: 'per month',
      features: [
        'Everything in Standard',
        'Priority customer support',
        'Bulk pricing discounts',
        'Extended product warranties',
        'Fast delivery options',
        'Technical consultations',
        'Monthly tool maintenance guides'
      ],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for large construction companies',
      price: '$99',
      priceDetail: 'per month',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom pricing negotiations',
        'On-site training programs',
        'Equipment rental options',
        'Priority product access',
        'Quarterly business reviews',
        'Custom invoicing solutions'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const
    }
  ];

  const deliveryOptions = [
    {
      icon: Truck,
      title: 'Standard Delivery',
      time: '5-7 business days',
      price: 'Free on orders over $100',
      description: 'Regular shipping for most products'
    },
    {
      icon: Clock,
      title: 'Express Delivery',
      time: '2-3 business days',
      price: '$15.99',
      description: 'Faster delivery for urgent projects'
    },
    {
      icon: Star,
      title: 'Next Day Delivery',
      time: '1 business day',
      price: '$29.99',
      description: 'Emergency delivery service'
    }
  ];

  const warranties = [
    {
      category: 'Hand Tools',
      period: 'Lifetime Warranty',
      coverage: 'Manufacturing defects, normal wear excluded'
    },
    {
      category: 'Power Tools',
      period: '3-5 Years',
      coverage: 'Full repair or replacement for defects'
    },
    {
      category: 'Heavy Machinery',
      period: '2-3 Years',
      coverage: 'Comprehensive coverage including parts and labor'
    },
    {
      category: 'Safety Equipment',
      period: '1-2 Years',
      coverage: 'Replacement guarantee for safety-related failures'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include access to our full catalog of construction tools.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative ${
                tier.popular 
                  ? 'border-everest-500 shadow-lg scale-105' 
                  : 'border-border'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-everest-600 hover:bg-everest-700">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <p className="text-muted-foreground">{tier.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.priceDetail && (
                    <span className="text-muted-foreground ml-2">{tier.priceDetail}</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={tier.buttonVariant}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delivery Options */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Delivery Options</h2>
            <p className="text-muted-foreground text-lg">
              Choose the delivery speed that works for your project timeline
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {deliveryOptions.map((option, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-everest-100 rounded-full mb-4">
                    <option.icon className="h-8 w-8 text-everest-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-everest-600 font-semibold mb-2">{option.time}</p>
                  <p className="text-lg font-bold mb-3">{option.price}</p>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warranty Information */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warranty Coverage</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive warranty protection on all our products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warranties.map((warranty, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="font-bold">{warranty.category}</h3>
                  </div>
                  <p className="text-everest-600 font-semibold mb-2">{warranty.period}</p>
                  <p className="text-sm text-muted-foreground">{warranty.coverage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Can I change my plan at any time?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'Do you offer volume discounts?',
                answer: 'Professional and Enterprise plans include automatic volume discounts. Contact our sales team for custom pricing on large orders.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, bank transfers, and offer net payment terms for Enterprise customers.'
              },
              {
                question: 'Is there a minimum order requirement?',
                answer: 'No minimum order for Standard plans. Professional and Enterprise plans may have preferred order minimums for best pricing.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-12 hero-gradient">
            <CardContent className="p-0 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of professionals who trust Everest Evolution for their construction needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-everest-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-everest-600">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
