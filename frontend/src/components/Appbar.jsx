import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/payme-logo.png';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Payment History', href: '/history' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Appbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notifications", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        setNotifications(res.data);
      } catch (e) {
        console.error("Failed to fetch notifications:", e);
      }
    };
    
    // Only fetch if token exists
    if (localStorage.getItem("token")) {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000); // poll every 10 seconds
        return () => clearInterval(interval);
    }
  }, []);

  const markAsRead = async () => {
    if (unreadCount === 0) return;
    try {
      await axios.put("http://localhost:3000/api/notifications/read", {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setNotifications(notifications.map(n => ({...n, isRead: true})));
    } catch (e) {
      console.error("Failed to mark as read");
    }
  };

  return (
    <Disclosure as="nav" className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset transition-colors">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden size-6 group-data-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="PayMe Logo" className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              <span className="ml-2 text-xl font-bold tracking-tight text-white hidden sm:block">PayMe</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-white/10 text-white shadow-inner border border-white/5'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notifications dropdown */}
            <Menu as="div" className="relative">
              <MenuButton 
                onClick={markAsRead}
                className="group cursor-pointer relative rounded-full bg-slate-800/50 p-2 text-slate-400 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-hidden transition-colors border border-white/5 hover:bg-slate-700/50"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="size-5" aria-hidden="true" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900" />
                )}
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-80 origin-top-right rounded-xl bg-slate-800/95 backdrop-blur-xl py-2 shadow-2xl ring-1 ring-white/10 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in border border-white/10 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <MenuItem key={notif._id}>
                        <div className="px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex flex-col gap-1">
                          <p className={`text-sm ${notif.isRead ? 'text-slate-300' : 'text-white font-medium'}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </MenuItem>
                    ))
                  )}
                </div>
              </MenuItems>
            </Menu>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-4">
              <MenuButton className="group cursor-pointer relative flex rounded-full bg-slate-800/50 p-1 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 border border-white/5 hover:bg-slate-700/50 transition-colors">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="size-7 text-slate-400 group-hover:text-white transition-colors" aria-hidden="true" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-xl bg-slate-800/95 backdrop-blur-xl py-2 shadow-2xl ring-1 ring-white/10 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in border border-white/10"
              >
                <MenuItem>
                  <a
                    href="/settings"
                    className="block px-4 py-2.5 text-sm text-slate-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden font-medium transition-colors"
                  >
                    <Cog6ToothIcon className="inline-block mr-3 size-5 text-slate-400" />
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block cursor-pointer px-4 py-2.5 text-sm text-rose-400 data-focus:bg-rose-500/10 data-focus:text-rose-300 data-focus:outline-hidden font-medium transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                  >
                    <ArrowRightStartOnRectangleIcon className="inline-block mr-3 size-5" />
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden transition-all duration-200 ease-out border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="space-y-1 px-4 pt-2 pb-4">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={location.pathname === item.href ? 'page' : undefined}
              className={classNames(
                location.pathname === item.href
                  ? 'bg-white/10 text-white border border-white/5'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
                'block rounded-lg px-4 py-3 text-base font-semibold transition-colors'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
