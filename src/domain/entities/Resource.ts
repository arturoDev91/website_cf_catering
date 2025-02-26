export interface Resource {
  id: string;
  url: string;
  filename: string;
  type: 'image' | 'document' | 'video' | 'audio';
}

export interface ImageResource extends Resource {
  type: 'image';
  width?: number;
  height?: number;
  alt?: string;
}