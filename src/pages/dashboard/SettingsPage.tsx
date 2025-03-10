
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { useToast } from '@/components/ui/use-toast';

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopDaraz',
    storeEmail: 'support@shopdaarz.com',
    storePhone: '+1 (234) 567-8901',
    storeAddress: '123 E-Commerce St., Marketplace City, 12345',
    currency: 'USD',
    taxRate: 8.5,
    logo: null,
    favicon: null,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    enableOrderConfirmation: true,
    enableShippingUpdates: true,
    enableAbandonedCart: true,
    enablePromotions: false,
    senderName: 'ShopDaraz',
    senderEmail: 'no-reply@shopdaarz.com',
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enablePaypal: true,
    enableBankTransfer: false,
    enableCashOnDelivery: false,
    testMode: true,
  });
  
  const { toast } = useToast();
  
  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Store settings have been updated successfully.",
    });
  };
  
  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Email settings have been updated successfully.",
    });
  };
  
  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Payment settings have been updated successfully.",
    });
  };
  
  const handleInputChange = (
    section: 'store' | 'email' | 'payment',
    field: string,
    value: string | number | boolean
  ) => {
    if (section === 'store') {
      setStoreSettings({ ...storeSettings, [field]: value });
    } else if (section === 'email') {
      setEmailSettings({ ...emailSettings, [field]: value });
    } else if (section === 'payment') {
      setPaymentSettings({ ...paymentSettings, [field]: value });
    }
  };
  
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Settings</h2>
        
        {/* Store Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Store Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your store information and general settings.
            </p>
          </div>
          <div className="border-t p-6">
            <form onSubmit={handleSaveStoreSettings}>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="storeName" className="text-sm font-medium">
                      Store Name
                    </label>
                    <input
                      id="storeName"
                      type="text"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={storeSettings.storeName}
                      onChange={(e) => handleInputChange('store', 'storeName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="storeEmail" className="text-sm font-medium">
                      Store Email
                    </label>
                    <input
                      id="storeEmail"
                      type="email"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={storeSettings.storeEmail}
                      onChange={(e) => handleInputChange('store', 'storeEmail', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="storePhone" className="text-sm font-medium">
                      Store Phone
                    </label>
                    <input
                      id="storePhone"
                      type="text"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={storeSettings.storePhone}
                      onChange={(e) => handleInputChange('store', 'storePhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </label>
                    <select
                      id="currency"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={storeSettings.currency}
                      onChange={(e) => handleInputChange('store', 'currency', e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CNY">CNY (¥)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="storeAddress" className="text-sm font-medium">
                    Store Address
                  </label>
                  <textarea
                    id="storeAddress"
                    className="mt-1 w-full bg-background rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    rows={2}
                    value={storeSettings.storeAddress}
                    onChange={(e) => handleInputChange('store', 'storeAddress', e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="taxRate" className="text-sm font-medium">
                    Tax Rate (%)
                  </label>
                  <input
                    id="taxRate"
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={storeSettings.taxRate}
                    onChange={(e) => handleInputChange('store', 'taxRate', parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Store Settings</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Email Settings */}
        <div className="rounded-lg border bg-card mt-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Email Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure email notifications and templates.
            </p>
          </div>
          <div className="border-t p-6">
            <form onSubmit={handleSaveEmailSettings}>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="senderName" className="text-sm font-medium">
                      Sender Name
                    </label>
                    <input
                      id="senderName"
                      type="text"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={emailSettings.senderName}
                      onChange={(e) => handleInputChange('email', 'senderName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="senderEmail" className="text-sm font-medium">
                      Sender Email
                    </label>
                    <input
                      id="senderEmail"
                      type="email"
                      className="mt-1 w-full bg-background h-9 rounded-md border border-input px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={emailSettings.senderEmail}
                      onChange={(e) => handleInputChange('email', 'senderEmail', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Email Notifications</p>
                  
                  <div className="flex items-center justify-between py-2">
                    <label htmlFor="enableOrderConfirmation" className="text-sm">
                      Order Confirmation
                    </label>
                    <input
                      id="enableOrderConfirmation"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={emailSettings.enableOrderConfirmation}
                      onChange={(e) => handleInputChange('email', 'enableOrderConfirmation', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enableShippingUpdates" className="text-sm">
                      Shipping Updates
                    </label>
                    <input
                      id="enableShippingUpdates"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={emailSettings.enableShippingUpdates}
                      onChange={(e) => handleInputChange('email', 'enableShippingUpdates', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enableAbandonedCart" className="text-sm">
                      Abandoned Cart Reminders
                    </label>
                    <input
                      id="enableAbandonedCart"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={emailSettings.enableAbandonedCart}
                      onChange={(e) => handleInputChange('email', 'enableAbandonedCart', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enablePromotions" className="text-sm">
                      Promotional Emails
                    </label>
                    <input
                      id="enablePromotions"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={emailSettings.enablePromotions}
                      onChange={(e) => handleInputChange('email', 'enablePromotions', e.target.checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Email Settings</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Payment Settings */}
        <div className="rounded-lg border bg-card mt-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Payment Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure payment methods and options.
            </p>
          </div>
          <div className="border-t p-6">
            <form onSubmit={handleSavePaymentSettings}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment Methods</p>
                  
                  <div className="flex items-center justify-between py-2">
                    <label htmlFor="enableCreditCard" className="text-sm">
                      Credit/Debit Card
                    </label>
                    <input
                      id="enableCreditCard"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={paymentSettings.enableCreditCard}
                      onChange={(e) => handleInputChange('payment', 'enableCreditCard', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enablePaypal" className="text-sm">
                      PayPal
                    </label>
                    <input
                      id="enablePaypal"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={paymentSettings.enablePaypal}
                      onChange={(e) => handleInputChange('payment', 'enablePaypal', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enableBankTransfer" className="text-sm">
                      Bank Transfer
                    </label>
                    <input
                      id="enableBankTransfer"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={paymentSettings.enableBankTransfer}
                      onChange={(e) => handleInputChange('payment', 'enableBankTransfer', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t">
                    <label htmlFor="enableCashOnDelivery" className="text-sm">
                      Cash on Delivery
                    </label>
                    <input
                      id="enableCashOnDelivery"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={paymentSettings.enableCashOnDelivery}
                      onChange={(e) => handleInputChange('payment', 'enableCashOnDelivery', e.target.checked)}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="testMode" className="text-sm font-medium">
                      Test Mode (Sandbox)
                    </label>
                    <input
                      id="testMode"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={paymentSettings.testMode}
                      onChange={(e) => handleInputChange('payment', 'testMode', e.target.checked)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable test mode for payment processing. No real charges will be made.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Payment Settings</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
