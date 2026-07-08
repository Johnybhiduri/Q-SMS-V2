export const authEvents = {
  onUnauthorized: () => {
    localStorage.removeItem("token"); // adjust key to match yours
    window.location.href = "/auth?mode=signin";  // or use your router's navigate
  },
};