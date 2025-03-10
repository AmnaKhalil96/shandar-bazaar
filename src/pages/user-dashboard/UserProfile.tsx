
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { UserCircle, Mail, Phone, MapPin, Lock, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock user data
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States'
  }
};

export default function UserProfile() {
  const { toast } = useToast();
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, unknown>,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "This would open a form to change your password.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <h3 className="text-lg font-medium">Basic Information</h3>
            </div>
          </div>
          
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSaveProfile}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4 gap-1">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">First Name</div>
                  <div className="font-medium">{user.firstName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Name</div>
                  <div className="font-medium">{user.lastName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="flex items-center gap-1 font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="flex items-center gap-1 font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {user.phone}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-medium">Address Information</h3>
            </div>
          </div>
          
          <div className="p-6">
            {isEditing ? (
              <form>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                    <input
                      id="street"
                      name="address.street"
                      type="text"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">City</label>
                    <input
                      id="city"
                      name="address.city"
                      type="text"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">State/Province</label>
                    <input
                      id="state"
                      name="address.state"
                      type="text"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                    <input
                      id="postalCode"
                      name="address.postalCode"
                      type="text"
                      value={formData.address.postalCode}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">Country</label>
                    <input
                      id="country"
                      name="address.country"
                      type="text"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {user.address.street}
                </div>
                <div className="mt-1 text-muted-foreground">
                  {user.address.city}, {user.address.state} {user.address.postalCode}
                </div>
                <div className="text-muted-foreground">
                  {user.address.country}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <h3 className="text-lg font-medium">Security</h3>
            </div>
          </div>
          
          <div className="p-6">
            <Button variant="outline" className="gap-1" onClick={handleChangePassword}>
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
