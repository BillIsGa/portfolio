export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Translation' | 'Development' | '3D Modelling' | 'Photography';
  tags: string[];
  imageUrl?: string;
  link?: string;
  author?: string;
  visits?: string;
  placeId?: string;
  isLive?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}
