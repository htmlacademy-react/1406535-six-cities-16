export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Point = Location & {
  id: string;
}

export type City = {
  name: string;
  location: Location;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CompleteOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: [string];
  host: User;
  images: [string];
  maxAdults: number;
}

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
