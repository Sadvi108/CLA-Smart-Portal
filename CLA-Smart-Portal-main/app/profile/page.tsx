"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Building2, Phone, MapPin, Shield, Bell, Eye, Lock } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6 bg-white  min-h-screen -m-4 lg:-m-8 p-4 lg:p-8">
      {/* Profile Header */}
      <Card className="bg-white  border border-gray-200  shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-900 ">{user?.email}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="capitalize bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{user?.role}</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-700 dark:text-green-400">Active</Badge>
                </div>
              </div>
            </div>
            <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)} className="bg-blue-600 hover:bg-blue-700 border-gray-300 ">
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Account Information */}
      <Card className="bg-white  border border-gray-200  shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-gray-900 ">Account Information</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ">Manage your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-gray-700 ">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                <Input
                  id="full-name"
                  placeholder="John Doe"
                  className="pl-9 border-gray-300  bg-white  text-gray-900 "
                  disabled={!isEditing}
                  defaultValue="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 ">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                <Input id="email" type="email" className="pl-9 border-gray-300  bg-white  text-gray-900 " disabled value={user?.email || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 ">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                <Input
                  id="company"
                  placeholder="D&D Control (M) Sdn. Bhd."
                  className="pl-9 border-gray-300  bg-white  text-gray-900 "
                  disabled={!isEditing}
                  defaultValue="D&D Control (M) Sdn. Bhd."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 ">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                <Input
                  id="phone"
                  placeholder="+60 12-345 6789"
                  className="pl-9 border-gray-300  bg-white  text-gray-900 "
                  disabled={!isEditing}
                  defaultValue="+60 12-345 6789"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-gray-700 ">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground " />
                <Input
                  id="address"
                  placeholder="123 Business Street, Kuala Lumpur"
                  className="pl-9 border-gray-300  bg-white  text-gray-900 "
                  disabled={!isEditing}
                  defaultValue="123 Business Street, Kuala Lumpur, Malaysia"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-300  text-gray-700  hover:bg-white dark:hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gradient-to-br from-white to-sky-50/30 dark:from-gray-800 dark:to-gray-700/50 border-sky-200/50 ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <CardTitle className="text-gray-900 ">Security Settings</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ">Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground " />
                <Label className="text-gray-700 ">Password</Label>
              </div>
              <p className="text-sm text-muted-foreground ">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" className="border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20">Change Password</Button>
          </div>

          <Separator className="bg-gray-200 " />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor" className="text-gray-700 ">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground ">Add an extra layer of security to your account</p>
            </div>
            <Switch id="two-factor" />
          </div>

          <Separator className="bg-gray-200 " />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout" className="text-gray-700 ">Auto Logout</Label>
              <p className="text-sm text-muted-foreground ">Automatically logout after 30 minutes of inactivity</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-gradient-to-br from-white to-sky-50/30 dark:from-gray-800 dark:to-gray-700/50 border-sky-200/50 ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <CardTitle className="text-gray-900 ">Notification Preferences</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ">Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-gray-700 ">Email Notifications</Label>
              <p className="text-sm text-muted-foreground ">Receive notifications via email</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <Separator className="bg-gray-200 " />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications" className="text-gray-700 ">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground ">Receive critical alerts via SMS</p>
            </div>
            <Switch id="sms-notifications" />
          </div>

          <Separator className="bg-gray-200 " />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-summary" className="text-gray-700 ">Weekly Summary</Label>
              <p className="text-sm text-muted-foreground ">Receive a weekly summary of your account activity</p>
            </div>
            <Switch id="weekly-summary" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences */}
      <Card className="bg-gradient-to-br from-white to-sky-50/30 dark:from-gray-800 dark:to-gray-700/50 border-sky-200/50 ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <CardTitle className="text-gray-900 ">Display Preferences</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ">Customize how you view the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-gray-700 ">Dark Mode</Label>
              <p className="text-sm text-muted-foreground ">Switch to dark theme</p>
            </div>
            <Switch id="dark-mode" />
          </div>

          <Separator className="bg-gray-200 " />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-view" className="text-gray-700 ">Compact Mode</Label>
              <p className="text-sm text-muted-foreground ">Show more information in less space</p>
            </div>
            <Switch id="compact-view" />
          </div>

          <Separator className="bg-gray-200 " />

          <div className="space-y-2">
            <Label htmlFor="language" className="text-gray-700 ">Language</Label>
            <Input id="language" defaultValue="English" disabled className="border-gray-300  bg-white  text-gray-900 " />
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <Card className="bg-gradient-to-br from-white to-sky-50/30 dark:from-gray-800 dark:to-gray-700/50 border-sky-200/50 ">
        <CardHeader>
          <CardTitle className="text-gray-900 ">Account Statistics</CardTitle>
          <CardDescription className="text-gray-600 ">Your activity summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground ">Member Since</p>
              <p className="text-2xl font-bold text-gray-900 ">Jan 2024</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground ">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 ">142</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground ">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 ">RM 584,350</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
