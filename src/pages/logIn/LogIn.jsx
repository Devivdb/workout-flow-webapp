import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useBackground from '../../hooks/useBackground';
import './LogIn.css';

function LogIn() {
    useBackground("login-background");

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await login(formData.username, formData.password);

            if (!result.success) {
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
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                        minLength={6}
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
                        placeholder="Enter your password"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    className="login-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>

                <p className="signup-link">
                    <Link to="/sign-up">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default LogIn;