import React, { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import hero1 from '@/assets/images/hero1.jpg'
import hero2 from '@/assets/images/hero2.jpg'
import hero3 from '@/assets/images/hero3.jpg'
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Thermometer,
  Calendar,
  MapPin,
} from 'lucide-react'
import Papa from 'papaparse'

interface Coordinates {
  lat: number
  lon: number
}

interface Place {
  name: string
  country: string
  image: StaticImageData
  city: string
  coordinates: Coordinates
}

interface WeatherData {
  temperature?: number
  weatherDescription?: string
}

const API_KEY = '239b1bb0e0ec9a9110577b4197e40f8f'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [places] = useState<Place[]>([
    {
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: hero1,
      city: 'Sion',
      coordinates: { lat: 46.2324, lon: 7.3601 },
    },
    {
      name: 'Lake Bled',
      country: 'Slovenia',
      image: hero2,
      city: 'Bled',
      coordinates: { lat: 46.3683, lon: 14.1146 },
    },
    {
      name: 'The Dolomites',
      country: 'Italy',
      image: hero3,
      city: 'Veneto',
      coordinates: { lat: 46.4102, lon: 11.844 },
    },
  ])
  const [searchInput, setSearchInput] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [allLocations, setAllLocations] = useState<Place[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const fetchWeatherData = async () => {
    try {
      const updatedWeatherData = await Promise.all(
        places.map(async (place) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${place.coordinates.lat}&lon=${place.coordinates.lon}&units=metric&appid=${API_KEY}`
            )

            if (!response.ok) {
              throw new Error(`Failed to fetch weather data for ${place.city}`)
            }

            const data = await response.json()
            return {
              temperature: Math.round(data.main.temp),
              weatherDescription: data.weather[0].description,
            }
          } catch (error) {
            console.error(
              `Error fetching weather data for ${place.city}:`,
              error
            )
            return {
              temperature: undefined,
              weatherDescription: undefined,
            }
          }
        })
      )
      setWeatherData(updatedWeatherData)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loadLocations = async () => {
      const response = await fetch('/locations.csv')
      const text = await response.text()
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          setAllLocations(results.data as Place[])
        },
      })
    }
    loadLocations()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === places.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? places.length - 1 : prevIndex - 1
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    if (value) {
      const filteredSuggestions = allLocations.filter((place) =>
        place.city.toLowerCase().includes(value.toLowerCase())
      )
      if (filteredSuggestions.length > 0) {
        setSuggestions(filteredSuggestions)
        setErrorMessage('')
      } else {
        setSuggestions([])
        setErrorMessage('Location not available')
      }
    } else {
      setSuggestions([])
      setErrorMessage('')
    }
  }

  const selectSuggestion = (place: Place) => {
    setSearchInput(place.city)
    setSuggestions([])
    const index = places.findIndex((p) => p.city === place.city)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }

  // Automatic slide change every 6 seconds
  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 6000)
    return () => clearInterval(autoSlide)
  }, [currentIndex])

  return (
    <div className="flex flex-col items-center min-h-screen mt-20">
      <div className="relative w-5/6">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[400px] h-[50px] bg-white rounded-xl shadow-lg p-2 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-gray-600" />
              <span className="text-2xl font-semibold">
                {weatherData[currentIndex]?.temperature !== undefined
                  ? `${weatherData[currentIndex].temperature}°C`
                  : 'Loading...'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Cloud className="w-6 h-6 text-gray-600" />
              <span className="text-lg text-gray-600 capitalize">
                {weatherData[currentIndex]?.weatherDescription || 'Loading...'}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] pt-[55px]">
          <Image
            src={places[currentIndex].image || hero1}
            alt={places[currentIndex].name || 'Default Alt Text'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-3xl transition-opacity duration-500"
            priority
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent rounded-3xl" />
          <div className="absolute z-10 flex flex-col items-left pl-24 justify-start mt-20 h-full">
            <p className="text-gray-200">{places[currentIndex].country}</p>
            <h1 className="text-white text-6xl font-bold mb-4">
              {places[currentIndex].name}
            </h1>
            <p className="text-white text-xl">{places[currentIndex].city}</p>
          </div>
        </div>
      </div>
      <div className="relative w-[800px] bg-white rounded-xl -mt-[50px] z-20 shadow-lg">
        <div className="p-6">
          <div className="flex flex-col space-y-2">
            <label className="flex items-center text-gray-600 text-sm font-medium">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search for a location..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {suggestions.length > 0 && (
              <ul className="bg-white shadow-lg rounded-lg mt-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.city}, {suggestion.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button className="w-1/3 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Start Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
