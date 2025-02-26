export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: Date;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}