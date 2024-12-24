import React, { useMemo } from 'react';
import '../index.css'; // Import the CSS file containing animations

const AnimatedBackground = () => {
  const shapes = [
    { icon: '</>', color: 'text-blue-500' },
    { icon: '{}', color: 'text-green-500' },
    { icon: '[]', color: 'text-yellow-500' },
    { icon: '()', color: 'text-red-500' },
    { icon: '||', color: 'text-purple-500' },
    { icon: '&&', color: 'text-pink-300' },
    { icon: '==', color: 'text-indigo-500' },
    { icon: '!=', color: 'text-orange-500' },
    { icon: '<>', color: 'text-gray-500' },
    { icon: '/\\', color: 'text-cyan-500' },
    // { icon: '\\/', color: 'text-lime-500' },
    { icon: '*', color: 'text-emerald-500' },
    { icon: '+', color: 'text-amber-500' },
    { icon: '-', color: 'text-fuchsia-500' },
    { icon: '%%', color: 'text-sky-500' },
    // { icon: '@@', color: 'text-rose-500' },
  ];

  const animatedShapes = useMemo(() => {
    return Array(30)
      .fill(null)
      .map(() => {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          ...randomShape,
          style: {
            fontSize: `${Math.random() * 2 + 1.5}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          },
        };
      });
  }, [shapes]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {animatedShapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.color} animate-float opacity-30`}
          style={shape.style} // Apply styles dynamically
        >
          {shape.icon}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
