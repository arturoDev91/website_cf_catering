import { useState } from 'react';
import { ContactSubmission } from '../../domain/entities/Contact';
import { SupabaseContactRepository } from '../../infrastructure/supabase/repositories/SupabaseContactRepository';

const contactRepository = new SupabaseContactRepository();

export function useContact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submitContact = async (contact: ContactSubmission) => {
    try {
      setStatus('submitting');
      await contactRepository.submit(contact);
      setStatus('success');
    } catch (error) {
      console.error('Error submitting contact:', error);
      setStatus('error');
    }
  };

  return {
    status,
    submitContact
  };
}