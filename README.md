Overview

This is a weather application built with React Native that allows users to search for a city's weather, view the current forecast and upcoming days, and see hourly weather details. The app utilizes WeatherAPI to fetch weather data, and Redux-Saga is implemented for state management and caching of API data.

Features

HomeScreen:

Search for a city using a search bar with an autocomplete feature.
Display the current weather conditions and a 3-day weather forecast.
Navigate to the next 4 days of weather forecast by tapping an arrow button.

WeatherDetail Screen:

Displays hourly weather details for the selected day.
Shows the current weather forecast along with hourly changes.
Caching: Implemented using Redux-Saga to cache the fetched weather data for improved performance and reduced API calls.

Screens

1. HomeScreen
Search Bar: Allows the user to search for cities. The autocomplete API provides suggestions as the user types.
Weather Display: Shows the current weather, temperature, and weather conditions for the selected city.
3-Day Forecast: Displays the weather for the next three days below the current weather.
Additional Days: Tap the arrow to view the next 4 days of the forecast.

2. WeatherDetail Screen
Hourly Forecast: Provides detailed weather conditions for each hour of the selected day.
Current Weather: Displays the current forecast for the selected city.

State Management

Redux-Saga is used for managing the app’s state and caching functionality. This helps:

Efficiently fetch and cache weather data to avoid unnecessary API requests.
Handle asynchronous actions like fetching weather data in a clean and manageable way.

Key Redux-Saga Features:

API Request: Saga listens for actions like fetching weather data and makes the API call to WeatherAPI.

Caching: If the weather data for a specific city is already cached, it uses the stored data instead of making a new API request.

Error Handling: Manages API call errors gracefully and updates the app state accordingly.