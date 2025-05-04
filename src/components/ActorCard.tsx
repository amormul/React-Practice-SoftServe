import React from 'react';
import { Actor } from '../types';

interface ActorCardProps {
  actor: Actor;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-md mb-3 aspect-[3/4] bg-gray-200 transition-transform duration-300 hover:shadow-lg">
        <img 
          src={actor.imageUrl} 
          alt={actor.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h3 className="font-bold text-white text-lg">{actor.name}</h3>
      <p className="text-gray-400 text-sm">{actor.role}</p>
    </div>
  );
};

export default ActorCard;