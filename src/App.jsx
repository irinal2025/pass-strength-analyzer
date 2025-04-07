import React, { useRef, useState } from "react";
import './App.css'
import PasswordStrength from './components/PasswordStrength'
import PasswordValidator from './components/PasswordValidator';
import HeroSection from './components/HeroSecton';
import PasswordGenerator from './components/PasswordGenerator';


function App() {

  const [showGenerator, setShowGenerator] = useState(false);
  const generatorRef = useRef(null);

  const handleShowGenerator = () => {
    setShowGenerator(true);
    setTimeout(() => {
      generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // Delay to ensure the generator is visible before scrolling
  };

  // Create refs for the sections
  const testRef = useRef(null);

  const scrollToTest = () => {
    testRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <>
      <HeroSection scrollToTest={scrollToTest} />
      <main id="main" ref={testRef}>

        <h2>React Password Strength Checker</h2>
        <p>A tool to evaluate and improve your password security.</p>


        <PasswordStrength />


        {!showGenerator ? (
          <div className="card-generator">
            <p>
              Is your password not strong enough?{" "}
              <button className="link-btn" onClick={handleShowGenerator}>Click here</button>{" "}
              to generate a strong password.
            </p>
          </div>
        ) : (
          <>
            <div className="card" ref={generatorRef}>
              <h2>Password Generator</h2>
              <p>Generate strong and secure passwords effortlessly. Choose the desired length and create a random password instantly.</p>
            </div>
            <PasswordGenerator />
          </>
        )}

        <div className="card">
          <p><strong>Here&apos;s another way to check your password strength using the <code>react-password-strength-bar</code> and <code>zxcvbn</code> libraries.</strong></p>
          <p className="small-text">Currently, the react-password-strength-bar library does not support multilingualism, so password strength is displayed in English by default.</p>
        </div>
        <PasswordValidator />


        <div className="instructions">
          <h2>How to Create a Strong Password</h2>

          <p>Creating a strong password is essential for keeping your accounts and sensitive information safe from unauthorized access. To make sure your password is up to the task, focus on these key areas: length, randomness, and complexity. Here&apos;s how you can improve your password:</p>
          <ul>
            <li>Ensure your password is at least 12-20 characters long.</li>
            <li>Use a combination of uppercase and lowercase letters, numbers, and special characters (!, @, #, etc.).</li>
            <li>Avoid dictionary words, common names, or easily guessable sequences.</li>
            <li>Consider using a password manager for complex password generation and storage.</li>
            <li>Make it a habit to update your passwords regularly, especially for sensitive accounts like email or banking.</li>
          </ul>

          <h3>Example of a very strong password:</h3>
          <p><code>!B7#cL$9aXp9M3$#</code></p>
          <p>It combines uppercase letters, lowercase letters, numbers, and special characters, making it difficult to guess.</p>
        </div>



        <div className="description">
          <h2>About This Project</h2>
          <p>
            In this project, I&apos;ve developed a password strength checker that demonstrates two different methods of evaluating password strength. The primary goal of this project is to help users understand how strong their passwords are and what factors contribute to their security.
          </p>

          <ul>
            <li>
              <strong>Custom Password Strength Meter:</strong> I use the <code>zxcvbn</code> library to evaluate the password strength, taking into account dictionary words, common passwords, and password predictability. Additionally, I&apos;ve incorporated custom logic to ensure that the password meets a predefined pattern (e.g., length, character variety). The strength meter provides dynamic visual feedback as the user types. The password strength <strong><i>never</i></strong> can be &quot;Good&quot; or &quot;Strong&quot; if the password doesn&apos;t meet the specified pattern.
            </li>
            <li>
              <strong>React Password Strength Bar (with zxcvbn):</strong> The second method utilizes the <code>react-password-strength-bar</code> component to show a visual strength bar, which is updated based on the password strength evaluated by the <code>zxcvbn</code> library. This provides a simpler way for users to see how strong their password is at a glance, with a clear visual indicator.  Additionally, I use custom logic to ensure the password meets a predefined pattern and show errors if the password doesn&apos;t meet the specified pattern.
            </li>
          </ul>


          <p>
            You can check out the source code on <a href="https://github.com/irinal2025/pass-strength-analyzer" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </div>



        <div className="info-text">
          <p>
            This is a demo of a password strength checker built with React, Vite, and the zxcvbn library. Feel free to try it out and test your passwords! <span role="img" aria-label="smile">😊</span>
          </p>
        </div>
      </main>

      <footer>
        <p>&copy; {currentYear} Irina L. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
