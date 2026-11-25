export type DietaryType = 'veg' | 'non-veg' | 'seafood';

export type SpiceLevel = 'mild' | 'medium' | 'kolkata-fiery';

export interface MenuItem {
  id: string;
  name: string;
  bengaliName: string;
  category: 'bengali-specials' | 'seafood' | 'kebabs' | 'main-course' | 'desserts' | 'beverages';
  description: string;
  price: number;
  originalPrice?: number;
  dietary: DietaryType;
  spiceLevel: SpiceLevel;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  isAvailable: boolean;
  image: string;
  portion: string;
  calories?: string;
  pairingSuggestion?: string;
  tags: string[];
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type ReservationStatus = 'confirmed' | 'pending' | 'seated' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  branch: 'park-street' | 'salt-lake';
  seatingArea: 'royal-baithak' | 'window-terrace' | 'family-hall' | 'private-dining';
  occasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  advanceDepositPaid: boolean;
  advanceAmount: number;
  paymentMethod?: 'razorpay-upi' | 'razorpay-card' | 'pay-at-venue';
  paymentId?: string;
  createdAt: string;
  tableNumber?: number;
}

export interface DiningTable {
  id: number;
  name: string;
  capacity: number;
  status: 'available' | 'reserved' | 'occupied' | 'billing';
  assignedReservationId?: string;
  currentGuestName?: string;
  timeRemaining?: string;
  zone: 'Royal Baithak' | 'Window Terrace' | 'Courtyard' | 'Private Chamber';
}

export interface SocialReel {
  id: string;
  creatorName: string;
  handle: string;
  avatar: string;
  followers: string;
  thumbnail: string;
  dishFeatured: string;
  quote: string;
  likes: string;
  views: string;
  verified: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  review: string;
  dishRecommended: string;
  source: 'Instagram' | 'Google Reviews' | 'Telegraph Food' | 'Times Food Guide';
  date: string;
}

export interface BranchLocation {
  id: 'park-street' | 'salt-lake';
  name: string;
  bengaliName: string;
  address: string;
  landmark: string;
  phone: string;
  timings: string;
  image: string;
  mapEmbedUrl: string;
  seatingCapacity: number;
  features: string[];
}

export interface BirthdayClubMember {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  birthMonth: string;
  anniversaryMonth?: string;
  favoriteDish: string;
  preferredBranch: string;
  joinedDate: string;
  voucherCode: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
