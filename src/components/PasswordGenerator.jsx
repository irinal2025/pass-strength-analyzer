import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import "./PasswordGenerator.css";

const generatePassword = (length = 12) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";
    const allChars = uppercase + lowercase + numbers + specialChars;

    if (length < 12 || length > 72) return "";

    let password = "";

    // Ensure at least one character from each category is included
    password += uppercase[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * uppercase.length)];
    password += lowercase[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * lowercase.length)];
    password += numbers[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * numbers.length)];
    password += specialChars[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * specialChars.length)];

    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password += allChars[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * allChars.length)];
    }

    // Rearranging the password to make it more random
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
};

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [strength, setStrength] = useState(null);

    const handleLengthChange = (e) => {
        const value = Number(e.target.value);
        setLength(value);

        if (value < 12 || value > 72) {
            setError("Password must be between 12 and 72 characters");
        } else {
            setError("");
        }
    };

    const generate = () => {
        if (length >= 12 && length <= 72) {
            const newPassword = generatePassword(length);

            // Check if the password is strong enough with zxcvbn
            const result = zxcvbn(newPassword);

            if (result.score < 3) {
                setPasswordStrength("Generated password is not strong enough. Please try again.");
                setPassword("");
                return;
            } else {
                setPasswordStrength("");
                setPassword(newPassword);
                setCharacterTypes(checkPasswordCharacters(newPassword));
                const analysis = zxcvbn(newPassword);
                setStrength(analysis.score);
            }

            setCopied(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const checkPasswordCharacters = (password) => {
        return {
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumbers: /[0-9]/.test(password),
            hasSymbols: /[!@#$%^&*()]/.test(password),
        };
    };

    const [characterTypes, setCharacterTypes] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumbers: false,
        hasSymbols: false,
    });

    return (
        <div className="generator-container">
            <form className="password-form" id="password-generator-form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); generate(); }}>

                <label htmlFor="length">Password length:</label>
                <input
                    type="number"
                    id="length"
                    min="12"
                    max="72"
                    step="1"
                    value={length}
                    onChange={handleLengthChange}
                    className="length-input"
                    aria-describedby="password-length-description"
                />
                <p id="password-length-description" className="sr-only">
                    Enter the desired password length between 12 and 72 characters.
                </p>
                {error && <p className="error-text" aria-live="assertive">{error}</p>}

                <button onClick={generate} className="generate-btn btn" disabled={!!error} aria-label="Generate a new password">Generate Password</button>
            </form>
            {password && (
                <div className="password-container">
                    <span className="password">{password}</span>
                    <button onClick={copyToClipboard} className="copy-btn" aria-label="Copy password to clipboard">Copy</button>
                </div>
            )}

            {strength !== null && (
                <div className="password-strength-meter">
                    <div className="password-strength-meter-progress">
                        <div className={`strength-bar ${["very-Weak", "weak", "fair", "good", "strong"][strength]}`}></div>
                    </div>

                    <p id="password-strength-description" className="password-strength-text">
                        Password strength{strength !== null && (<span>: {["Very Weak", "Weak", "Fair", "Good", "Strong"][strength]}</span>)}
                    </p>
                </div>

            )}

            {password && (
                <ul className="password-checklist">
                    <li className={characterTypes.hasUppercase ? "valid" : "invalid"}>
                        <span className="icon">{characterTypes.hasUppercase ? "✅" : "❌"}</span>
                        Contains uppercase letter
                    </li>
                    <li className={characterTypes.hasLowercase ? "valid" : "invalid"}>
                        <span className="icon">{characterTypes.hasUppercase ? "✅" : "❌"}</span>
                        Contains lowercase letter
                    </li>
                    <li className={characterTypes.hasNumbers ? "valid" : "invalid"}>
                        <span className="icon">{characterTypes.hasUppercase ? "✅" : "❌"}</span>
                        Contains number
                    </li>
                    <li className={characterTypes.hasSymbols ? "valid" : "invalid"}>
                        <span className="icon">{characterTypes.hasUppercase ? "✅" : "❌"}</span>
                        Contains symbol (!@#$...)
                    </li>
                </ul>
            )}


            {passwordStrength && <p className="strength-text">{passwordStrength}</p>}
            {copied && <p className="copied-text" aria-live="polite">Password copied!</p>}
        </div>
    );
};

export default PasswordGenerator;
