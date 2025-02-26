import { supabaseClient } from '../../../config/application';
import { Contact, ContactSubmission } from '../../../domain/entities/Contact';
import { IContactRepository } from '../../../domain/repositories/IContactRepository';

export class SupabaseContactRepository implements IContactRepository {
  async submit(contact: ContactSubmission): Promise<Contact> {
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .insert([contact])
      .select()
      .single();

    if (error) throw error;
    return this.mapToContact(data);
  }

  async getAll(): Promise<Contact[]> {
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToContact);
  }

  async getById(id: string): Promise<Contact | null> {
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToContact(data);
  }

  async updateStatus(id: string, status: Contact['status']): Promise<Contact> {
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapToContact(data);
  }

  private mapToContact(data: any): Contact {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      status: data.status,
      createdAt: new Date(data.created_at)
    };
  }
}