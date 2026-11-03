'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Compass,
  Calendar,
  PlusCircle,
  FolderCog,
  CheckCircle2,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo and Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/35 transition-all duration-200">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Civic<span className="text-indigo-600 dark:text-indigo-400">Pulse</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-0.5" />
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Citizen Action Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              Home
            </Link>

            <Link
              href="/events"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/events')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Explore Drives</span>
            </Link>

            <Link
              href="/create-event"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors ml-2`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Launch Initiative</span>
            </Link>
          </nav>

          {/* Right Action Icons: Theme Toggle + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isLoading ? (
              <div className="w-24 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* Profile Picture with hover display name tooltip and dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 group"
                    title={user.name || 'User Profile'}
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-indigo-500/50 bg-indigo-100 dark:bg-indigo-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt={user.name || 'User'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 max-w-[150px] truncate"
                      title={user.name || 'User Profile'}
                    >
                      {user.name || user.email?.split('@')[0] || 'Volunteer'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-950/15 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* User Header info */}
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.name || user.email?.split('@')[0] || 'Volunteer'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Navigation Links */}
                      <div className="py-1">
                        <Link
                          href="/create-event"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 text-indigo-500" />
                          <span>Create Initiative</span>
                        </Link>

                        <Link
                          href="/manage-events"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <FolderCog className="w-4 h-4 text-blue-500" />
                          <span>My Organized Drives</span>
                        </Link>

                        <Link
                          href="/joined-events"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Pledged / Joined Drives</span>
                        </Link>

                        <Link
                          href="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <User className="w-4 h-4 text-violet-500" />
                          <span>Volunteer Profile</span>
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Explicit Logout Button next to avatar */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-800 transition-colors"
                  title="Logout from platform"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  Join as Volunteer
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <Link
            href="/"
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Explore Drives
          </Link>

          {user ? (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={user.name || 'User'}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
                  }}
                />
                <div className="flex-1 truncate">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {user.name || user.email?.split('@')[0] || 'Volunteer'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>

              <Link
                href="/create-event"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              >
                <PlusCircle className="w-4 h-4 text-indigo-500" />
                <span>Create Initiative</span>
              </Link>
              <Link
                href="/manage-events"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              >
                <FolderCog className="w-4 h-4 text-blue-500" />
                <span>My Organized Drives</span>
              </Link>
              <Link
                href="/joined-events"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Pledged / Joined Drives</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              >
                <User className="w-4 h-4 text-violet-500" />
                <span>Volunteer Profile</span>
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
              >
                Join as Volunteer
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
