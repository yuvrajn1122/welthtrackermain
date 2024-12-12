import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = ({ documetTypeId, userId }) => {
  const [imageData, setImageData] = useState(null);
  const [imageExtension, setImageExtension] = useState(null);
  const [error, setError] = useState(null);

  const FetchImage = async () => {
    const payload = {
      user_id: "1",
      documetTypeId: "1",
    };

    try {
      // Get token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        setError('Authentication token missing. Please login again.');
        return;
      }

      const response = await axios.post('http://localhost:5002/api/documents/getDocumet', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token
        },
      });

      if (response.status === 200) {
        setImageData(response.data.image);
        setImageExtension(response.data.extention);
      } else {
        setError('Image not found');
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError('An error occurred while fetching the image');
      }
    }
  };

  useEffect(() => {
    FetchImage();
  }, [documetTypeId, userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {imageData ? (
        <div>
          <h3>Document Image</h3>
          <img
            src={`data:image/${imageExtension};base64,${imageData}`}
            alt="Document"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
