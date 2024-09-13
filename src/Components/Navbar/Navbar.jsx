import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from '../../Context/CartContext';

const navigation = [
  { name: 'Home', href: '' },
  { name: 'Products', href: 'products' },
  { name: 'Categories', href: 'categories' },
  { name: 'Brands', href: 'brands' },
  { name: 'WishList', href: 'wishlist' },
  { name: 'Orders', href: 'allorders' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  const { countData } = useContext(CartContext)

  const navigate = useNavigate()

  function LogOut() {
    setIsUserLoggedIn(false)
    navigate('/login')
    localStorage.removeItem("token")
  }

  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:block md:block lg:block">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={'/Cart'} className="relative">
                    <i className="fa-solid fa-cart-shopping text-green-700 mx-5"></i>
                    {countData > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{countData}</span>
                    )}
                  </Link>
                  <h1 className="text-xl font-semibold">Fresh Cart</h1>
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    {isUserLoggedIn && navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium lg:block sm:hidden'
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isUserLoggedIn ? (
                  <>
                   
                           
                              <button
                                onClick={LogOut}
                                className={classNames(  'bg-gray-100 block w-full text-left px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="register"
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isUserLoggedIn && navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {!isUserLoggedIn && (
                <>
                  <Disclosure.Button
                    as={NavLink}
                    to="login"
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )
                    }
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={NavLink}
                    to="register"
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )
                    }
                  >
                    Register
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
