const viteOpenWKey = import.meta.env.VITE_OPENWEATHER_KEY;
const api = {
  key: viteOpenWKey,
  base: "https://api.openweathermap.org/data/2.5/",
};

export default api;
