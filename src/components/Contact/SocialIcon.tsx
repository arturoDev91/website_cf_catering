import { SocialIconProps } from '../../types';

export const SocialIcon = ({ icon, href = "#" }: SocialIconProps) => {
  return (
    <a 
      href={href}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300"
    >
      {icon}
    </a>
  );
};