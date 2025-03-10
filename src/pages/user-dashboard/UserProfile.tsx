
import React from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function UserProfile() {
  const { toast } = useToast();
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photo",
      description: "This would open a file dialog to upload a new profile photo.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Profile Photo Section */}
        <div className="border rounded-lg bg-card p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-muted-foreground" />
              </div>
              <button 
                onClick={handleUploadPhoto}
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">Member since January 2023</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleUploadPhoto}
            >
              Change Photo
            </Button>
          </div>
        </div>
        
        {/* Profile Form Section */}
        <div className="border rounded-lg bg-card p-6">
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="firstName"
                      type="text"
                      defaultValue="John"
                      className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="lastName"
                      type="text"
                      defaultValue="Doe"
                      className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    id="address"
                    defaultValue="123 Main Street, Apt 4B, New York, NY 10001"
                    className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
