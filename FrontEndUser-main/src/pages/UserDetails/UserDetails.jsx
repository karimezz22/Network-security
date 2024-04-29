import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import './UserDetails.css';
import { decrypt } from '../../encryption';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/getUser/${id}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="user-details-container">
        <div className="loading-container">
          <ThreeDots visible={true} height={50} width={50} color="#007BFF" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-details-container">
        <div className="error-container">Error: {error}</div>
      </div>
    );
  }

  // Decrypt the phone number and email if user exists
  const decryptedPhoneNumber = user && user.phoneNumber ? decrypt(user.phoneNumber) : '';
  const decryptedEmail = user && user.email ? decrypt(user.email) : '';

  return (
    <div className="user-details-container">
      {user ? (
        <div>
          <h2 className="user-details-title">User Details</h2>
          <div className="user-details-info">
            <div className="user-details-box">
              <span className="user-details-label">Username:</span>
              <span className="user-details-value"> {user.username}</span>
            </div>
            <div className="user-details-box">
              <span className="user-details-label">Email:</span>
              <span className="user-details-value"> {decryptedEmail}</span>
            </div>
            <div className="user-details-box">
              <span className="user-details-label">Phone Number:</span>
              <span className="user-details-value"> {decryptedPhoneNumber}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-container">User not found.</div>
      )}
      <Link to="/" className="back-to-home-button">Back to Home</Link>
    </div>
  );
}

export default UserDetails;