export type Language = 'en' | 'ar';

export interface Discipline {
  id: string;
  number: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  summaryEn: string;
  summaryAr: string;
  detailsEn: string[];
  detailsAr: string[];
  leadDoctorEn: string;
  leadDoctorAr: string;
  technologyEn: string;
  technologyAr: string;
  image: string;
}

export interface BookingData {
  clientName: string;
  clientPhone: string;
  discipline: string;
  preferredTime: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'suites' | 'technology' | 'sanctuary' | 'artistry';
  categoryEn: string;
  categoryAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
}

export interface Product {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  // Optional display price as a ready-to-render string, e.g. '18 KWD'.
  // Omitted when a catalog item has no listed price.
  price?: string;
  image: string;
  categoryEn?: string;
  categoryAr?: string;
  // Optional bullet points shown in the detailed view popup.
  featuresEn?: string[];
  featuresAr?: string[];
}

export interface ReviewItem {
  id: string;
  authorEn: string;
  authorAr: string;
  roleEn?: string;
  roleAr?: string;
  handle?: string;
  avatar?: string;
  treatmentEn: string;
  treatmentAr: string;
  rating: number;
  dateEn: string;
  dateAr: string;
  contentEn: string;
  contentAr: string;
  verified: boolean;
}



