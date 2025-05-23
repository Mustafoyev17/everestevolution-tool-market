
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, ChevronLeft, Truck } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "ZIP code must be at least 5 characters.",
  }),
  paymentMethod: z.enum(["credit", "debit", "paypal"], {
    required_error: "Please select a payment method.",
  }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Calculate order summary
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      paymentMethod: "credit",
    },
  });

  function onSubmit(values: CheckoutFormValues) {
    // Simulate order placement - in a real app, you'd send this to your backend
    console.log("Order submitted", values);
    setOrderPlaced(true);
    
    // Clear the cart
    dispatch({ type: 'CLEAR_CART' });
    
    // Show success toast
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your order. A confirmation email has been sent.",
    });
    
    // In a real app, you might redirect to an order confirmation page
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }

  // If the cart is empty and no order has been placed, redirect to cart
  if (state.cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Please add items to your cart before proceeding to checkout
            </p>
            <Button onClick={() => navigate('/products')} size="lg" className="btn-primary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6 mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl mb-2">Your order has been placed successfully</p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to your email address
            </p>
            <div className="mb-8 p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-bold">{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <Button onClick={() => navigate('/')} size="lg" className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/cart')} className="mb-4 text-muted-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to cart
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Shipping</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="123 Main St, Apt 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 rounded-md border p-4">
                                <RadioGroupItem value="credit" id="credit" />
                                <Label htmlFor="credit" className="flex-1 cursor-pointer">
                                  <div className="font-semibold">Credit Card</div>
                                  <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</div>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-3 rounded-md border p-4">
                                <RadioGroupItem value="debit" id="debit" />
                                <Label htmlFor="debit" className="flex-1 cursor-pointer">
                                  <div className="font-semibold">Debit Card</div>
                                  <div className="text-sm text-muted-foreground">Pay directly from your bank account</div>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-3 rounded-md border p-4">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                                  <div className="font-semibold">PayPal</div>
                                  <div className="text-sm text-muted-foreground">Fast, secure payment with PayPal</div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="hidden md:block">
                  <Button type="submit" className="w-full btn-primary" size="lg">
                    Place Order (${total.toFixed(2)})
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <div className="flex gap-2">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[150px]">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    ) : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {shipping > 0 && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Add ${(100 - subtotal).toFixed(2)} more for free shipping!</span>
                  </div>
                )}
                
                <div className="md:hidden mt-6">
                  <Button 
                    onClick={form.handleSubmit(onSubmit)} 
                    className="w-full btn-primary" 
                    size="lg"
                  >
                    Place Order (${total.toFixed(2)})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
