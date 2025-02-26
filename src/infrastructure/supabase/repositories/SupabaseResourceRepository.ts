import { supabaseClient } from '../../../config/application';
import { ImageResource } from '../../../domain/entities/Resource';
import { IResourceRepository } from '../../../domain/repositories/IResourceRepository';
import { config } from '../../../config/application';

export class SupabaseResourceRepository implements IResourceRepository {
  private readonly bucketName = config.supabase.storage.buckets.resources;

  async uploadImage(file: File): Promise<ImageResource> {
    const fileName = `${Date.now()}-${file.name}`;
    const path = `${config.supabase.storage.paths.images}/${fileName}`;

    const { data, error } = await supabaseClient.storage
      .from(this.bucketName)
      .upload(path, file, {
        contentType: file.type,
        upsert: true
      });

    if (error) throw error;

    return {
      id: data.path,
      url: this.getPublicUrl(data.path),
      filename: fileName,
      type: 'image'
    };
  }

  async uploadImageFromUrl(url: string, filename: string): Promise<ImageResource> {
    const response = await fetch(url);
    const blob = await response.blob();
    const path = `${config.supabase.storage.paths.images}/${filename}`;

    const { data, error } = await supabaseClient.storage
      .from(this.bucketName)
      .upload(path, blob, {
        contentType: blob.type,
        upsert: true
      });

    if (error) throw error;

    return {
      id: data.path,
      url: this.getPublicUrl(data.path),
      filename,
      type: 'image'
    };
  }

  getPublicUrl(path: string): string {
    const { data: { publicUrl } } = supabaseClient.storage
      .from(this.bucketName)
      .getPublicUrl(path);
    return publicUrl;
  }

  async getAllImages(): Promise<ImageResource[]> {
    const { data, error } = await supabaseClient.storage
      .from(this.bucketName)
      .list(config.supabase.storage.paths.images);

    if (error) throw error;

    return data
      .filter(item => !item.metadata.isDirectory)
      .map(item => ({
        id: item.id,
        url: this.getPublicUrl(`${config.supabase.storage.paths.images}/${item.name}`),
        filename: item.name,
        type: 'image'
      }));
  }
}