exports.getWeather = async (location) => {

  return {
    location,

    temperature: 29,

    humidity: 72,

    rainfall: 12,

    windSpeed: 14,

    condition: "Partly Cloudy"
  };
};