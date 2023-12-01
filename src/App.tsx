import React, { useState, FC } from 'react';
import PasswordValidator from './components/PasswordValidator';
import { PasswordOptions } from './interfaces/interfaces';

const App: FC = () => {

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const passwordReqs: PasswordOptions = {
    requireSpecialChars: true,
    requireDigit: true,
    requireUppercase: true,
    noConsecutiveLetters: true,
  };

  const handlePasswordChange = (isValid: boolean) => {
    setIsPasswordValid(isValid)
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Password Component</h1>
      <PasswordValidator options={passwordReqs} onPasswordChange={handlePasswordChange} />
    </div>
  );
};

export default App;
