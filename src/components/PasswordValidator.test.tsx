import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PasswordValidator from './PasswordValidator';

describe('PasswordValidator Component', () => {
  it('renders the component correctly', () => {
    const { getByTestId, getByText } = render(<PasswordValidator options={{ requireSpecialChars: true, requireDigit: true, requireUppercase: true, noConsecutiveLetters: true }} />);
    
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByText('Has a special char !@#$%^&*')).toBeInTheDocument();
    expect(getByText('Has a number 0-9')).toBeInTheDocument();
    expect(getByText('Has uppercase letter')).toBeInTheDocument();
    expect(getByText('Has no consecutive letters')).toBeInTheDocument();
  });

  it('validates password requirements satisfied', async () => {
    const { getByTestId, getByText } = render(<PasswordValidator options={{ requireSpecialChars: true, requireDigit: true, requireUppercase: true, noConsecutiveLetters: true }} />);
    const passwordInput = getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: 'validPa$$word1' } });

    await waitFor(() => {
        expect(getByText('Has a special char !@#$%^&*')).toContainHTML('<svg class="feather feather-check"');
        expect(getByText('Has a number 0-9')).toContainHTML('<svg class="feather feather-check"');
        expect(getByText('Has uppercase letter')).toContainHTML('<svg class="feather feather-check"');
        expect(getByText('Has no consecutive letters')).toContainHTML('<svg class="feather feather-check"');
    });
  });

  it('validates password requirements unsatisfied', async () => {
    const { getByTestId, getByText } = render(<PasswordValidator options={{ requireSpecialChars: true, requireDigit: true, requireUppercase: true, noConsecutiveLetters: true }} />);
    const passwordInput = getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: '' } });

    await waitFor(() => {
        expect(getByText('Has a special char !@#$%^&*')).toContainHTML('<svg class="feather feather-x"');
        expect(getByText('Has a number 0-9')).toContainHTML('<svg class="feather feather-x"');
        expect(getByText('Has uppercase letter')).toContainHTML('<svg class="feather feather-x"');
        expect(getByText('Has no consecutive letters')).toContainHTML('<svg class="feather feather-x"');
    });
  });

});
