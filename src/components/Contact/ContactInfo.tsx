import { ContactInfoProps } from '../../types';

export const ContactInfo = ({ icon, text }: ContactInfoProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-white">{icon}</div>
      <span>{text}</span>
    </div>
  );
};