import React from 'react';
import ActorSlider from './components/ActorSlider';
import { actors } from './data/actors';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <ActorSlider 
          actors={actors} 
          title="Знімальна група та акторський склад" 
        />
      </div>
    </div>
  );
}

export default App;