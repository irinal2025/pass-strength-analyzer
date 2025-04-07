import React, { useState } from "react";
import "./PasswordGenerator.css";

const generatePassword = (length = 12) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";
    const allChars = uppercase + lowercase + numbers + specialChars;

    if (length < 12 || length > 72) return "";

    let password = [
        uppercase[Math.floor(Math.random() * uppercase.length)],
        lowercase[Math.floor(Math.random() * lowercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Rearranging the password to make it more random
    password = password.sort(() => Math.random() - 0.5).join("");

    return password;
};

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

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
            setPassword(newPassword);
            setCopied(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

            {copied && <p className="copied-text" aria-live="polite">Password copied!</p>}
        </div>
    );
};

export default PasswordGenerator;
