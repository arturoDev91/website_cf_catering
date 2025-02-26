// Common types
export interface Resource {
  name: string;
  url: string;
}

// Component Props
export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}