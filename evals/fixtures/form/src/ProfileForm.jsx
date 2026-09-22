import { useState } from 'react';
import { validateEmail } from './validation.mjs';

export function ProfileForm({ save }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  function onSubmit(event) {
    event.preventDefault();
    const nextError = validateEmail(email);
    setError(nextError);
    if (!nextError) save({ email });
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="profile-email">Email</label>
      <input id="profile-email" value={email} onChange={event => setEmail(event.target.value)}
        aria-invalid={Boolean(error)} aria-describedby={error ? 'profile-error' : undefined} />
      {error && <p id="profile-error" role="alert">{error}</p>}
      <button type="submit">Save</button>
    </form>
  );
}
