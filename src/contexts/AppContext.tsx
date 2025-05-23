
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  products: Product[];
  categories: string[];
  cart: CartItem[];
  likedItems: string[];
  darkMode: boolean;
  isAuthenticated: boolean;
  user: any;
}

type AppAction = 
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'SET_AUTH'; payload: { isAuthenticated: boolean; user: any } }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  products: [],
  categories: ['Power Tools', 'Hand Tools', 'Measuring Tools', 'Safety Equipment', 'Heavy Machinery', 'Welding Equipment'],
  cart: [],
  likedItems: [],
  darkMode: false,
  isAuthenticated: false,
  user: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'TOGGLE_LIKE':
      const isLiked = state.likedItems.includes(action.payload);
      return {
        ...state,
        likedItems: isLiked
          ? state.likedItems.filter(id => id !== action.payload)
          : [...state.likedItems, action.payload]
      };
    
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
