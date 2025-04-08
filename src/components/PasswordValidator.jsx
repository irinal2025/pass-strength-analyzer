import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import zxcvbn from 'zxcvbn';
import Modal from './InfoBox';

const PasswordValidator = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [patternValid, setPatternValid] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
    const passwordPattern = "^(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{12,72}$";
    const [copied, setCopied] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword === '') {
            setStrength(null);
            setPatternValid(true);
        } else {

            // Check if the password matches the pattern first
            const patternMatch = new RegExp(passwordPattern).test(newPassword);
            setPatternValid(patternMatch);

            // if password is less than 4 characters, don't check
            if (newPassword.length < 4) {
                setErrorMessages([]);
                return;  // Exit the function
            }

            // Empty the error messages before checking
            let errors = [];

            // Check if the password matches the pattern
            if (!new RegExp(passwordPattern).test(newPassword)) {
                // Check with regex which condition is missing and add error messages
                if (!/(?=.*[A-Z])/.test(newPassword)) {
                    errors.push("Password must contain at least one uppercase letter.");
                }
                if (!/(?=.*[a-z])/.test(newPassword)) {
                    errors.push("Password must contain at least one lowercase letter.");
                }
                if (!/(?=.*\d)/.test(newPassword)) {
                    errors.push("Password must contain at least one number.");
                }
                if (!/(?=.*[\W_])/.test(newPassword)) {
                    errors.push("Password must contain at least one special character.");
                }
                if (!/^(?!.*\s)/.test(newPassword)) {
                    errors.push("Password must not contain spaces.");
                }
                if (!/^.{12,72}$/.test(newPassword)) {
                    errors.push("Password length must be between 12 and 72 characters.");
                }
            }

            setErrorMessages(errors);


            // The password strength is calculated using the zxcvbn library
            const result = zxcvbn(newPassword);
            setStrength(result.score);  // zxcvbn returns a strength value (0-4). 0 is very weak, 4 is very strong
        }
    };


    // Function to check if the submit button should be enabled
    const isSubmitEnabled = () => {
        // Only enable submit if pattern is valid
        return patternValid && strength >= 3;
    };

    const handleClearPassword = () => {
        setPassword('');
        setStrength(0);
        setPatternValid(true);
        setErrorMessages([]);
    };

    // Function to copy the password to the clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);  // Näytetään modali
    const handleCloseModal = () => setShowModal(false);  // Suljetaan modali

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitEnabled()) {
            //alert('Password does not meet the required criteria. Please check the password and try again.');
            return;
        }
        navigator.clipboard.writeText(password);
        //alert('Password copied!');
        setShowModal(true);
    };

    return (
        <div className="password-val" style={{ position: 'relative' }}>
            <form className="password-form" id="password-form2" onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="password2" className="sr-only">Password:</label>
                <div className="password-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        autoComplete="new-password"
                        name="password2"
                        id="password2"
                        aria-describedby="password-strength-description"
                        aria-invalid={!patternValid}
                    />
                    <button type="button" onClick={toggleShowPassword} className="password-toggle" aria-label="Toggle password visibility" role="button">
                        {showPassword ? <span>&#128065;<span className="eye-slash">&#x2044;</span></span> : <span>&#128065;</span>}
                    </button>
                </div>
                <PasswordStrengthBar password={password} score={strength} className="password-strength-bar" aria-live="polite" />

                {/* Shhow warning if password not valid for pattern */}
                <div className="password-error-div">
                    {!patternValid && <p className="error-msg" aria-live="assertive">Password doesn&apos;t match the required pattern.</p>}
                    {/* Show warning if strength is weak and pattern is valid */}
                    {(strength > 0 && strength < 3 && patternValid) && <p className="error-msg">Password is too weak. Try using a combination of letters, numbers, and special characters!</p>}
                </div>

                <div className="password-buttons">
                    <button type="reset" className="clear-password" disabled={!password} onClick={handleClearPassword}>
                        Reset{/*Clear password &times;*/}
                    </button>
                    <button type="button" id="submit-btn2" className="btn" disabled={!isSubmitEnabled()} aria-label="Copy password" onClick={copyToClipboard}>Copy password 📋</button>
                </div>



            </form>
            <p className="password-strength-text" aria-live="polite">Strength level: {strength}/4</p>
            {/*<p>Vahvuus: {strength}</p>*/}

            {errorMessages.length > 0 && (
                <div className="error-messages" aria-live="assertive">
                    <ul>
                        {errorMessages.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* "The copy icon will be displayed only if the password is "Good" or "Strong" */}
            {/*patternValid && strength >= 3 && (
                <div className="password-copied">
                    <p>You can copy the password by clicking the button below.</p>
                    <button type="button" onClick={copyToClipboard} className="copy-password">
                        📋
                    </button>
                </div>
            )*/}
            <Modal show={showModal} handleClose={handleCloseModal} />
            {copied && <p className="copied-text pv-copied-text" aria-live="polite">Password copied!</p>}
        </div>
    );
};



export default PasswordValidator;
