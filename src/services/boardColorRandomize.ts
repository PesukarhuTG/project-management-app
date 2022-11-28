const colorRandomizer = () => {
  return `rgba(0, ${60 + Math.floor(Math.random() * 100)}, ${156 + Math.floor(Math.random() * 100)}, 0.3)`;
};

export default colorRandomizer;
