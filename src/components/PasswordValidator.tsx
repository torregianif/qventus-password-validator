import React, { useState, ChangeEvent, FC } from 'react';
import { PasswordOptions } from '../interfaces/interfaces';
import { CheckCircle, XCircle } from 'react-feather';

interface PasswordValidatorProps {
  options: PasswordOptions;
  onPasswordChange?: (isValid: boolean) => void;
}

const PasswordValidator: FC<PasswordValidatorProps> = ({ options, onPasswordChange }) => {
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword, options);
    onPasswordChange && onPasswordChange(isValid);
  };

  const validatePassword = (password: string, options: any) => {
    const { requireSpecialChars, requireDigit, requireUppercase, noConsecutiveLetters } = options;

    const hasSpecialChars = new RegExp(/[!@#$%^&*]/).test(password);
    const hasDigit = new RegExp(/\d/).test(password);
    const hasUppercase = new RegExp(/[A-Z]/).test(password);
    const hasConsecutiveLetters = !/(.)\1/.test(password)

    const isValid =
      (requireSpecialChars ? hasSpecialChars : true) &&
      (requireDigit ? hasDigit : true) &&
      (requireUppercase ? hasUppercase : true) &&
      (noConsecutiveLetters ? hasConsecutiveLetters : true);

    return isValid;
  };

  const requirements = [
    { key: 'requireSpecialChars', label: 'Has a special char !@#$%^&*' },
    { key: 'requireDigit', label: 'Has a number 0-9' },
    { key: 'requireUppercase', label: 'Has uppercase letter' },
    { key: 'noConsecutiveLetters', label: 'Has no consecutive letters' },
  ];

  const visibleRequirements = requirements.filter((req) => options[req.key]);
  

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<div>
      	<input type="password" value={password} onChange={handlePasswordChange} data-testid='password-input'/>
			</div>
      <ul>
        {visibleRequirements.map(({ key, label }, index) => (
          <li key={index}>
            {options[key] ? (
              validatePassword(password, { [key]: true }) ? (
                <CheckCircle color="green" data-testid={`check-icon-${key}`}/>
              ) : (
                <XCircle color="red" data-testid={`x-icon-${key}`}/>
              )
            ) : null}{' '}
            {label}
          </li>
        ))}
      </ul>
			
    </div>
  );
};

export default PasswordValidator;