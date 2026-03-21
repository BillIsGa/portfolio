export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Roblox' | 'Engineering' | 'Photography' | 'Translation' | 'Development' | '3D Modelling' | 'Leaving Cert';
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
