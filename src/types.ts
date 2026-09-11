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



