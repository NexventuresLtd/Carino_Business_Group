// Check if the user is logged in and retrieve user info from localStorage or sessionStorage

export const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
export const refreshToken = localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
export const isLoggedIn = !!token;

const user = localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
export const getUserInfo = user ? JSON.parse(user) : null;

// Logout function
export const logoutAll = (redirectUrl = '/login') => {
  // Remove tokens and user info from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('refresh');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('activeSection');

  // Remove tokens and user info from sessionStorage
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('refresh');
  sessionStorage.removeItem('userInfo');
  sessionStorage.removeItem('activeSection');

  // Optionally redirect user
  window.location.href = redirectUrl;
};

// Login function to store authentication data in storage
export const loginAll = (authToken: string, refreshToken: string, userInfo: any, rememberMe: boolean) => {
  // Determine whether to use localStorage or sessionStorage based on rememberMe
  const storage = rememberMe ? localStorage : sessionStorage;

  // Store the tokens and user info
  storage.setItem('authToken', authToken);
  storage.setItem('refresh', refreshToken);
  storage.setItem('userInfo', JSON.stringify(userInfo));
};
