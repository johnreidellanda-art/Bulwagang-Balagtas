"use client";

import React, { useActionState, useState, useEffect } from "react";
import { updateProfile, changePassword, logout } from "@/app/actions/profile";
import type { SessionUser, ActionResponse } from "@/types/auth";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  ListOrdered,
  CreditCard,
  Bell,
  XCircle,
  Star,
  User,
  LogOut,
  MapPin,
  Shield,
  Key,
  Save,
  BellRing,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const initialState: ActionResponse = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return (
    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} />
      {errors[0]}
    </p>
  );
}

export default function ProfilePage({ user }: { user: SessionUser }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [profileState, profileAction, isProfilePending] = useActionState(
    updateProfile,
    initialState
  );
  const [passwordState, passwordAction, isPasswordPending] = useActionState(
    changePassword,
    initialState
  );

  useEffect(() => {
    if (passwordState?.success) {
      const timer = setTimeout(() => {
        setIsPasswordModalOpen(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [passwordState?.success]);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-[#0B2C56] text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <img
            src="./Images/Atimonan.png"
            alt="Atimonan-Logo"
            className="w-15 h-15 rounded-full object-cover bg-white p-0.5"
        />
        <div className="leading-tight">
            <h1 className="font-bold text-md">Bulwagang</h1>
            <h1 className="font-bold text-md text-[#E86A24]">Balagtas</h1>
        </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</p>
            <ul className="space-y-1">
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><LayoutDashboard size={18} /> Dashboard</a></li>
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><Building2 size={18} /> Facilities</a></li>
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><CalendarDays size={18} /> Schedule / Reservation</a></li>
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><ListOrdered size={18} /> My Reservations</a></li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Financial</p>
            <ul className="space-y-1">
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><CreditCard size={18} /> Payment</a></li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Communication</p>
            <ul className="space-y-1">
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><Bell size={18} /> Notification</a></li>
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><XCircle size={18} /> Cancellation</a></li>
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"><Star size={18} /> Feedback</a></li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Account</p>
            <ul className="space-y-1">
              <li><a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#E86A24] text-white font-medium"><User size={18} /> Profile</a></li>
              <li>
                <button onClick={() => setIsLogoutModalOpen(true)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-300 transition-colors">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B2C56]">Profile</h1>
            <p className="text-gray-500 text-sm">Manage your account information</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <BellRing size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-[#0B2C56] rounded-full flex items-center justify-center text-white font-bold">{initials}</div>
              <div className="hidden md:block text-sm"><p className="font-semibold text-gray-800">{user.name}</p></div>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-2 mb-6 text-[#0B2C56]">
              <User size={20} className="text-[#E86A24]" />
              <h2 className="text-lg font-bold">Profile Information</h2>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-[#0B2C56] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mb-4">{initials}</div>
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <form id="profile-form" action={profileAction} className="space-y-5">
              {profileState?.error && !profileState?.fieldErrors && (
                <div className="alert alert-error text-sm rounded-lg bg-red-50 text-red-700 border-red-200 p-3 flex gap-2">
                  <AlertCircle size={18} /><span>{profileState.error}</span>
                </div>
              )}
              {profileState?.success && (
                <div className="alert alert-success text-sm rounded-lg bg-green-50 text-green-700 border-green-200 p-3 flex gap-2">
                  <CheckCircle2 size={18} /><span>{profileState.success}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  className={`input input-bordered w-full rounded-lg ${
                    profileState?.fieldErrors?.name
                      ? "border-red-400 focus:border-red-500"
                      : "focus:border-[#0B2C56]"
                  }`}
                  required
                />
                <FieldError errors={profileState?.fieldErrors?.name} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className={`input input-bordered w-full rounded-lg ${
                    profileState?.fieldErrors?.email
                      ? "border-red-400 focus:border-red-500"
                      : "focus:border-[#0B2C56]"
                  }`}
                  required
                />
                <FieldError errors={profileState?.fieldErrors?.email} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={user.phone || ""}
                  className={`input input-bordered w-full rounded-lg ${
                    profileState?.fieldErrors?.phone
                      ? "border-red-400 focus:border-red-500"
                      : "focus:border-[#0B2C56]"
                  }`}
                />
                <FieldError errors={profileState?.fieldErrors?.phone} />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={isProfilePending} className="btn bg-[#0B2C56] hover:bg-[#0B2C56]/90 text-white border-none rounded-lg flex-1">
                  {isProfilePending ? <span className="loading loading-spinner loading-sm"></span> : <Save size={18} />} Save Changes
                </button>
                <button type="button" onClick={() => setIsPasswordModalOpen(true)} className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex-1">
                  <Key size={18} className="text-[#0B2C56]" /> Change Password
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-6 text-[#0B2C56]">
                <MapPin size={20} className="text-[#E86A24]" />
                <h2 className="text-lg font-bold">Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Household / unit</label>
                  <input name="unit" form="profile-form" type="text" defaultValue={user.address?.unit || ""} className="input input-bordered input-sm w-full rounded-md" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Street</label>
                  <input name="street" form="profile-form" type="text" defaultValue={user.address?.street || ""} className="input input-bordered input-sm w-full rounded-md" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Barangay</label>
                  <select name="barangay" form="profile-form" defaultValue={user.address?.barangay || ""} className="select select-bordered select-sm w-full rounded-md">
                    <option value="">Select Barangay</option>
                    <option value="Barangay 1">Barangay 1</option>
                    <option value="Barangay 2">Barangay 2</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Town / Municipality</label>
                  <select name="municipality" form="profile-form" defaultValue={user.address?.municipality || ""} className="select select-bordered select-sm w-full rounded-md">
                    <option value="">Select Municipality</option>
                    <option value="Atimonan">Atimonan</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Province</label>
                  <select name="province" form="profile-form" defaultValue={user.address?.province || ""} className="select select-bordered select-sm w-full rounded-md">
                    <option value="">Select Province</option>
                    <option value="Quezon">Quezon</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-6 text-[#0B2C56]">
                <Shield size={20} className="text-[#E86A24]" />
                <h2 className="text-lg font-bold">Account</h2>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-medium text-[#E86A24] capitalize">{user.role || "Customer"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">Account Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">Date Registered</span>
                  <span className="font-medium text-gray-800">{user.createdAt || "January 12, 2026"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Login</span>
                  <span className="font-medium text-gray-800">{user.lastLogin || "September 14, 2026"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-6">
              <Key size={24} className="text-[#0B2C56]" />
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <button onClick={() => setIsPasswordModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form action={passwordAction} className="space-y-5">
              {passwordState?.error && !passwordState?.fieldErrors && (
                <div className="alert alert-error text-sm rounded-lg bg-red-50 text-red-700 border-red-200 p-3 flex gap-2">
                  <AlertCircle size={18} className="shrink-0" /><span>{passwordState.error}</span>
                </div>
              )}
              {passwordState?.success && (
                <div className="alert alert-success text-sm rounded-lg bg-green-50 text-green-700 border-green-200 p-3 flex gap-2">
                  <CheckCircle2 size={18} className="shrink-0" /><span>{passwordState.success}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
                <input
                  name="currentPassword"
                  type="password"
                  className={`input input-bordered w-full rounded-lg ${
                    passwordState?.fieldErrors?.currentPassword ? "border-red-400 focus:border-red-500" : ""
                  }`}
                  required
                />
                <FieldError errors={passwordState?.fieldErrors?.currentPassword} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                <input
                  name="newPassword"
                  type="password"
                  className={`input input-bordered w-full rounded-lg ${
                    passwordState?.fieldErrors?.newPassword ? "border-red-400 focus:border-red-500" : ""
                  }`}
                  required
                />
                <FieldError errors={passwordState?.fieldErrors?.newPassword} />
                <p className="text-xs text-gray-400 mt-1">
                  Must be 8+ characters with at least 1 uppercase letter and 1 number.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password *</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className={`input input-bordered w-full rounded-lg ${
                    passwordState?.fieldErrors?.confirmPassword ? "border-red-400 focus:border-red-500" : ""
                  }`}
                  required
                />
                <FieldError errors={passwordState?.fieldErrors?.confirmPassword} />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="btn btn-outline flex-1 rounded-lg border-gray-300 text-gray-700">Cancel</button>
                <button type="submit" disabled={isPasswordPending} className="btn bg-[#0B2C56] hover:bg-[#0B2C56]/90 text-white border-none flex-1 rounded-lg">
                  {isPasswordPending ? <span className="loading loading-spinner loading-sm"></span> : <Save size={18} />} Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <AlertTriangle size={32} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h2>
            <p className="text-gray-500 text-sm mb-8">Are you sure you want to log out? You will need to enter your credentials again to access your account.</p>

            <div className="flex gap-4">
              <button type="button" onClick={() => setIsLogoutModalOpen(false)} className="btn btn-outline flex-1 rounded-lg border-gray-300 text-gray-700">Cancel</button>
              <button type="button" onClick={() => logout()} className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-lg flex-1">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}