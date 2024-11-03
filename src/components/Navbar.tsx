import Link from 'next/link'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import logo from '../assets/images/logo.svg'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null) // Create a ref for the profile dropdown

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`/api/profile?email=${user.email}`)
          if (response.ok) {
            const data = await response.json()
            setProfileData({
              name: data.name || user.name || '',
              email: user.email,
              phoneNumber: data.phoneNumber || '',
              address: data.address || '',
            })
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }
    }

    if (user) {
      fetchProfileData()
    }
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false) // Close the profile dropdown if clicked outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profileData,
          email: user?.email,
        }),
      })

      if (response.ok) {
        setShowProfile(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const hiddenRoutes = ['/login', '/signup']

  if (hiddenRoutes.includes(router.pathname)) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pt-1 pr-32 pb-2 pl-32 bg-transparent">
      <div className="flex flex-row space-x-1 items-center justify-center">
        <Link href="/" passHref>
          <Image
            src={logo}
            width={0}
            height={40}
            alt="Logo"
            priority
            className="cursor-pointer h-auto"
          />
        </Link>
        <Link
          href="/"
          className="flex patua-one text-blue-500 cursor-pointer font-bold text-xl hover:text-red-500"
        >
          explora
        </Link>
      </div>

      <ul className="hidden md:flex space-x-5">
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/destination">Destination</Link>
        </li>
        <li>
          <p className="text-blue-500">•</p>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/bookings">Bookings</Link>
        </li>
        <li>
          <p className="text-blue-500">•</p>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/activities">Activities</Link>
        </li>
      </ul>

      <div className="hidden md:flex space-x-4 relative">
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-md"></div>
        ) : user ? (
          <>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-white text-sm text-black pt-1 pb-1 pr-3 pl-3 rounded-md hover:text-blue-500 flex items-center gap-2"
            >
              <div className="flex flex-col items-center">
                <span>{profileData.name || user.name || 'Profile'}</span>
                <p className="text-xs text-gray-500">view profile</p>
              </div>
              {user.picture && (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              )}
            </button>

            {showProfile && (
              <div
                ref={profileRef}
                className="absolute right-0 mt-10 w-96 bg-slate-200 border-black border-2 rounded-lg shadow-lg"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Profile</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        className="w-full p-2 border rounded bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
                      >
                        {isSaving ? 'Saving...' : 'Save Profile'}
                      </button>
                      <Link
                        href="/api/auth/logout"
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-300"
                      >
                        Logout
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/api/auth/login"
            className="bg-white text-sm text-black pt-1 pb-1 pr-3 pl-3 rounded-md hover:text-blue-500"
          >
            Join Us
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="ml-4 focus:outline-none">
          <Bars3Icon className="w-6 h-6 text-black" aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white p-2 z-10">
          <ul className="flex flex-col items-center text-center space-y-4">
            <li>
              <Link href="/destination">Destination</Link>
            </li>
            <li>
              <Link href="/bookings">Bookings</Link>
            </li>
            <li>
              <Link href="/activities">Activities</Link>
            </li>
            {!user ? (
              <li>
                <Link
                  href="/api/auth/login"
                  className="bg-white text-sm text-black pt-1 pb-1 pr-3 pl-3 rounded-md hover:text-blue-500"
                >
                  Join Us
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <button onClick={() => setShowProfile(!showProfile)}>
                    Profile
                  </button>
                </li>
                <li>
                  <Link href="/api/auth/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
