import React from 'react';

const GiphyEmbed = () => {
  return (
    <div className="w-full h-0 pb-100 relative" >
      <iframe
        src="https://giphy.com/embed/EILhSIPzBUqru"
        width="100%"
        height="100%"
        className="absolute inset-0 "
        allowFullScreen
        title="Giphy Embed"
      ></iframe>
    </div>
  );
};

export default GiphyEmbed;
