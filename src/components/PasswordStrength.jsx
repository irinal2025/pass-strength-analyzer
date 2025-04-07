import { useState } from 'react';
import './PasswordStrength.css';
import zxcvbn from 'zxcvbn';
import Modal from './InfoBox';

const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  //const [isValid, setIsValid] = useState(true);
  const [patternValid, setPatternValid] = useState(true);
  //const [passwordStrength, setPasswordStrength] = useState(null);

  const passwordPattern = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,72}$/;

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword === '') {
      setStrength(null);
      setPatternValid(true);
    } else {
      // Check if the password matches the pattern first
      const patternMatch = new RegExp(passwordPattern).test(inputPassword);
      setPatternValid(patternMatch);

      const result = zxcvbn(inputPassword);

      if (!patternMatch) {
        // If the pattern does not match, set the strength to very weak
        setStrength(result.score);

        // If pattern doesn't match, set strength to "weak" instead of "very weak"
        if (result.score >= 2) {
          setStrength(2); // fair
        } else if (result.score == 1) {
          setStrength(1); // waak
        } else {
          setStrength(0); // very weak
        }

      } else {
        // If the pattern matches, check password strength with zxcvbn
        setStrength(result.score);
      }

      // If the password is strong (zxcvbn score 4), but pattern does not match, set strength to 'good'
      //if (result.score === 4 && !patternMatch) {
      //  setStrength(3); // Setting to 'good' (strong but pattern mismatch)
      //}
    }
  };

  const getStrengthLabel = () => {
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    // If pattern is invalid, but zxcvbn is high, return "Weak" or "Fair"
    if (!patternValid) {
      if (strength === 0) {
        return 'Very Weak';
      } else if (strength === 1) {
        return 'Weak';
      } else if (strength >= 2) {
        return 'Fair';
      }
    }

    return strengthLabels[strength] || 'Very Weak';
  };

  const getStrengthClass = () => {
    // If pattern is invalid, but zxcvbn is high, return "Weak" or "Fair"
    if (!patternValid) {
      if (strength === 0) {
        return 'very-weak';
      } else if (strength === 1) {
        return 'weak';
      } else if (strength >= 2) {
        return 'fair';
      }
    }

    switch (strength) {
      case 0:
        return 'very-weak';
      case 1:
        return 'weak';
      case 2:
        return 'fair';
      case 3:
        return 'good';
      case 4:
        return 'strong';
      default:
        return '';
    }
  };

  const handleClearPassword = () => {
    setPassword('');
    setStrength(null);
    setPatternValid(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  // Function to check if the submit button should be enabled
  const isSubmitEnabled = () => {
    // Only enable submit if pattern is valid and strength is >= 'good'
    return patternValid && strength >= 3;
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);  // Näytetään modali
  const handleCloseModal = () => setShowModal(false);  // Suljetaan modal

  const handleSubmit = (e) => {
    e.preventDefault();
    //navigator.clipboard.writeText(password);
    //alert('Password copied!');
    setShowModal(true);
  };

  return (
    <div className="password-strength">
      <form id="password-form" className="password-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="password-strength-clear">
          {password && (
            <button type="reset" className="clear-password" onClick={handleClearPassword}>
              Clear password &times;
            </button>
          )}
        </div>
        <label htmlFor="password" className="sr-only">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            required
            autoComplete="new-password"
            name="password"
            id="password"
            //pattern="^(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{12,72}$"
            title="Password must be between 12 and 72 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces."
            aria-describedby="password-strength-description"
          />
          <button type="button" onClick={toggleShowPassword} className="password-toggle" aria-label="Toggle password visibility">
            {showPassword ? <span>&#128065;<span className="eye-slash">&#x2044;</span></span> : <span>&#128065;</span>}
          </button>
        </div>

        <div className="password-strength-meter">
          <div className="password-strength-meter-progress">
            <div className={`strength-bar ${getStrengthClass()}`}></div>
          </div>

          <p id="password-strength-description" className="password-strength-text">
            Password strength{strength !== null && (<span>: {getStrengthLabel()}</span>)}
          </p>
        </div>

        <button type="button" id="submit-btn" className="btn" disabled={!isSubmitEnabled()} aria-label="Copy password" onClick={handleSubmit}>Copy password 📋</button>
      </form>

      {/* Show warning if password not valid for pattern */}
      {!patternValid && <p className="error-msg">Password doesn&apos;t match the required pattern.</p>}
      {/*!patternValid && <p className="error-msg">Password doesn&apos;t meet the required criteria.</p>*/}

      {/* Show warning if strength is weak and pattern is valid */}
      {(strength > 0 && strength < 3 && patternValid) && <p className="error-msg">Password is too weak. Try using a combination of letters, numbers, and special characters!</p>}

      <p className="password-strength-info">
        Password must be between 12 and 72 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces.
      </p>


      {/* Näytetään kopiointikuvake vain, jos salasana on "Good" tai "Strong" */}
      {/*patternValid && strength >= 3 && (
        <div className="password-copied">
          <p>You can copy the password by clicking the button below.</p>
          <button type="button" onClick={copyToClipboard} className="copy-password">
            📋
          </button>
        </div>
      )*/}
    <Modal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default PasswordStrength;
