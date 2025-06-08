import React from 'react';

const getOutfit = (tempC) => {
  if (tempC <= 10) return ['Jacket', 'Sweater', 'Boots'];
  if (tempC <= 20) return ['Hoodie', 'Jeans'];
  return ['T-shirt', 'Shorts', 'Sunglasses'];
};

const OutfitSuggestion = ({ temp }) => {
  const tempC = Math.round(temp - 273.15);
  const suggestions = getOutfit(tempC);

  return (
    <div>
      <h3>Outfit Suggestions</h3>
      <ul>
        {suggestions.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
};

export default OutfitSuggestion;
