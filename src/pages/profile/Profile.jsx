import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/auth/authService';
import './Profile.css';
import useBackground from "../../hooks/useBackground.js";

function Profile() {
    const { user, updateUserInfo } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatedPassword: '',
        currentPassword: ''
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prevState => ({
                ...prevState,
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (formData.password) {
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return false;
            }

            if (formData.password !== formData.repeatedPassword) {
                setError('Passwords do not match');
                return false;
            }

            if (!formData.currentPassword) {
                setError('Please enter your current password to confirm changes');
                return false;
            }
        }

        if (formData.email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Please enter a valid email address');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasEmailChange = formData.email !== user.email;
        const hasPasswordChange = formData.password.length > 0;

        if (!hasEmailChange && !hasPasswordChange) {
            setError('No changes to save');
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const updateData = {
                password: formData.currentPassword // Required for all updates
            };

            if (hasEmailChange) {
                updateData.email = formData.email;
            }

            if (hasPasswordChange) {
                updateData.newPassword = formData.password;
            }

            await authService.updateUser(updateData);

            // After successful update, refresh the user info in context
            await updateUserInfo();

            setSuccess('Profile updated successfully!');

            setFormData(prev => ({
                ...prev,
                password: '',
                repeatedPassword: '',
                currentPassword: ''
            }));
        } catch (error) {
            console.error('Update failed:', error);
            setError(error.response?.data?.message || 'Update failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useBackground("profile-background")

    return (
        <div className="profile-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2>My Profile</h2>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="profile-info">
                    <p><strong>Username:</strong> {user?.username}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password (min. 6 characters)"
                        minLength={6}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="repeatedPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="repeatedPassword"
                        name="repeatedPassword"
                        value={formData.repeatedPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password (required to save changes)</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your current password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="update-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default Profile;