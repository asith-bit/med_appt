// Stores (or clears) the JWT returned by the server after login / sign up.
// Other components read it from sessionStorage to know if the user is logged in.
const setAuthToken = ({ token, name, email, phone } = {}) => {
  if (token) {
    sessionStorage.setItem('auth-token', token);
    if (name) sessionStorage.setItem('name', name);
    if (email) sessionStorage.setItem('email', email);
    if (phone) sessionStorage.setItem('phone', phone);
  } else {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
  }
};

export const authHeader = () => {
  const token = sessionStorage.getItem('auth-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default setAuthToken;
