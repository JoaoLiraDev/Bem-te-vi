export const TOKEN_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo0LCJlbWFpbCI6IlRlc3RlM0BnbWFpbC5jb20iLCJpYXQiOjE2MjI1MTEwNzksImV4cCI6MTYyMjUyOTA3OX0.CLjZXHB6zGCs_NI8RAY0B90H_92koMSR_-EzeThgQmc";
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAuthenticated = () => false;
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const login = token => {
//     localStorage.setItem(TOKEN_KEY, token);
// };
// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };