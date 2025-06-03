import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TemplateOption } from '../../types';

interface TemplateCardProps {
  template: TemplateOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      className={`
        relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer
        ${isSelected ? 'border-primary-500' : 'border-transparent'}
      `}
      onClick={() => onSelect(template.id)}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white z-10">
          <Check size={16} />
        </div>
      )}
      
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
          <div className="p-4 text-white">
            <h3 className="font-semibold">{template.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="font-medium">{template.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;