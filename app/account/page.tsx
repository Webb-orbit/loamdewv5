"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Package, MapPin, Settings, LogOut } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <Separator className="my-4" />
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Profile Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">
                        First Name
                      </Label>
                      <Input id="firstName" defaultValue="John" className="mt-1 border-gray-300 bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">
                        Last Name
                      </Label>
                      <Input id="lastName" defaultValue="Doe" className="mt-1 border-gray-300 bg-white" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="mt-1 border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="mt-1 border-gray-300 bg-white"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">Save Changes</Button>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order History</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Order #12345</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Placed on December 15, 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">$35.00</span>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Order #12344</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Shipped</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Placed on December 10, 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">$20.00</span>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-transparent">
                        Track Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-gray-900">Saved Addresses</h2>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">Add New Address</Button>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">Home</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Default</span>
                    </div>
                    <p className="text-gray-600">
                      123 Main Street
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-transparent">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Email Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700">Order updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700">Marketing emails</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-gray-700">Product recommendations</span>
                      </label>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <Label htmlFor="currentPassword" className="text-gray-700">
                          Current Password
                        </Label>
                        <Input id="currentPassword" type="password" className="mt-1 border-gray-300 bg-white" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword" className="text-gray-700">
                          New Password
                        </Label>
                        <Input id="newPassword" type="password" className="mt-1 border-gray-300 bg-white" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-gray-700">
                          Confirm New Password
                        </Label>
                        <Input id="confirmPassword" type="password" className="mt-1 border-gray-300 bg-white" />
                      </div>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white">Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
