export const getToken = () => {
    return localStorage.getItem('access_token');
};
export const removeToken = () => {
    localStorage.removeItem('access_token');
};
export const setToken = (val) => {
    localStorage.setItem('access_token', val);
};
export const getTokenRef = () => {
    return localStorage.getItem('refresh_token');
};
export const removeTokenRef = () => {
    localStorage.removeItem('refresh_token');
};
export const setTokenRef = (val) => {
    localStorage.setItem('refresh_token', val);
};
export const getUser = () => {
    return localStorage.getItem('user');
};
export const removeUser = () => {
    localStorage.removeItem('user');
};
export const setUser = (val) => {
    localStorage.setItem('user', val);
};
