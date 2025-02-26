import { Contact, ContactSubmission } from '../entities/Contact';

export interface IContactRepository {
  submit(contact: ContactSubmission): Promise<Contact>;
  getAll(): Promise<Contact[]>;
  getById(id: string): Promise<Contact | null>;
  updateStatus(id: string, status: Contact['status']): Promise<Contact>;
}