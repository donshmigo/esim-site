import React, { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { UserCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ProfileProps {
  userData: any;
  onProfileUpdate: () => Promise<void>;
}

const Profile: React.FC<ProfileProps> = ({ userData, onProfileUpdate }) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userData.displayName || '',
    phoneNumber: '',
    country: ''
  });
  
  const { currentUser } = useAuth();

  // Update form data when userData changes
  useEffect(() => {
    setFormData({
      displayName: userData.displayName || '',
      phoneNumber: userData.phoneNumber || '',
      country: userData.country || ''
    });
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setUpdating(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('Updating profile for user:', currentUser.uid);
      // Update Firestore document
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        updatedAt: new Date() // Add timestamp for when profile was last updated
      });
      
      // Update Auth profile if display name changed
      if (formData.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: formData.displayName
        });
        console.log('Updated Auth profile display name');
      }
      
      // Notify parent component that profile was updated
      await onProfileUpdate();
      
      setSuccess('Profile updated successfully.');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRetry = () => {
    // Implement retry logic
  };

  if (updating) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-signal-blue mb-4"></div>
        <p className="text-cool-slate">Updating profile...</p>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="text-center p-8">
        <div className="mb-4 p-4 bg-red-500 bg-opacity-10 text-red-500 rounded-lg">
          {error}
        </div>
        <button 
          onClick={handleRetry}
          className="flex items-center justify-center mx-auto mt-4 px-4 py-2 bg-signal-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Retry Loading Data
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      {!isEditing ? (
        <div className="profile-details">
          <div className="profile-avatar">
            <div className="avatar-icon">
              <UserCircleIcon className="h-16 w-16 text-signal-blue" />
            </div>
            <div>
              <h3>{userData.displayName || 'User'}</h3>
              <p>{userData.email}</p>
            </div>
          </div>
          
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <h4>Name</h4>
              <p>{userData.displayName || 'Not set'}</p>
            </div>
            <div className="profile-info-item">
              <h4>Email</h4>
              <p>{userData.email}</p>
            </div>
            <div className="profile-info-item">
              <h4>Phone Number</h4>
              <p>{userData.phoneNumber || 'Not set'}</p>
            </div>
            <div className="profile-info-item">
              <h4>Country</h4>
              <p>{userData.country || 'Not set'}</p>
            </div>
            <div className="profile-info-item">
              <h4>Account Created</h4>
              <p>
                {userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString() : 'Recently'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName">Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              disabled
              className="disabled-input"
            />
            <small>Email cannot be changed</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleSelectChange}
            >
              <option value="">Select your country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={updating}
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile; 