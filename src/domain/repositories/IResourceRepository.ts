import { ImageResource } from '../entities/Resource';

export interface IResourceRepository {
  uploadImage(file: File): Promise<ImageResource>;
  uploadImageFromUrl(url: string, filename: string): Promise<ImageResource>;
  getPublicUrl(path: string): string;
  getAllImages(): Promise<ImageResource[]>;
}