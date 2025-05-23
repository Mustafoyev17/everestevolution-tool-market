
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
      });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeItem = (id: string, name: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast({
      title: 'Item removed',
      description: `${name} has been removed from your cart.`,
    });
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
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
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {state.cart.length} {state.cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="hover:text-everest-600">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm">{item.brand}</p>
                      <p className="text-everest-600 font-bold text-lg">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center h-8"
                        min="1"
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 btn-primary" 
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Secure checkout with SSL encryption
                  </p>
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

export default Cart;
