import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useBackground from '../../hooks/useBackground';
import './SignUp.css';

function SignUp() {
    useBackground("signup-background");

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (error) setError('');
    };

    const validateForm = () => {
        // Check if fields are empty
        if (!formData.username.trim() || !formData.email.trim() ||
            !formData.password.trim() || !formData.confirmPassword.trim()) {
            setError('Please fill in all fields');
            return false;
        }

        // Check if username is at least 6 characters
        if (formData.username.length < 6) {
            setError('Username must be at least 6 characters long');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Check if password is at least 6 characters
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await register(
                formData.username,
                formData.email,
                formData.password
            );

            if (result.success) {
                setSuccess('Registration successful! Redirecting to login...');
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    navigate('/log-in');
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create an Account</h2>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Create a username (min. 6 characters)"
                        required
                        minLength={6}
                    />
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password (min. 6 characters)"
                        required
                        minLength={6}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="signup-button"
                    disabled={isSubmitting || success}
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/log-in">Log in</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;