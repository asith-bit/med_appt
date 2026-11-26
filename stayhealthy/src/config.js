// Base URL of the backend server (server folder runs on port 8181).
// In the Skills Network lab the app runs on a proxy URL, so we swap the port.
export const API_URL =
  window.location.port === '3000'
    ? window.location.origin.replace(':3000', ':8181')
    : window.location.origin.replace('-3000.', '-8181.');
