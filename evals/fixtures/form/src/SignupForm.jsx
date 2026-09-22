import { useState } from 'react';

export function SignupForm({ submit }) {
  const [email, setEmail] = useState('');
  return (
    <form onSubmit={event => { event.preventDefault(); submit({ email }); }}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={event => setEmail(event.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
}
