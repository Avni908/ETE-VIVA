import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyPage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('id');
      console.log("I am in verify file");
      if (!id) {
        setMessage('Verification ID is missing!');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/auth/verify?id=${id}`);
        const data = await response.json();
        console.log("data in verify id : ",data);
        if (response.ok) {
          setMessage('Your email has been successfully verified.');
        } else {
          setMessage(`Verification failed 1! ${data.message}`);
        }
      } catch (error) {
        setMessage(`Verification failed! ${error.message}`);
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyPage;
