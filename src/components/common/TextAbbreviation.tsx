import React from 'react';

const TextAbbreviation = ({ text }) => {
  // Extract the first 6 characters of the text
  const firstSixCharacters = text.substring(0, 6);
  // Get the last 4 characters of the text
  const lastFourCharacters = text.substring(text.length - 4);

  return (
    <div>
      <span>{firstSixCharacters}</span>
      <span>..</span>
      <span>{lastFourCharacters}</span>
    </div>
  );
};

export default TextAbbreviation;
