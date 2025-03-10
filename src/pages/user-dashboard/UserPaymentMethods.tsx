
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { CreditCard, Plus, Edit, Trash2, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: 'Visa',
    lastFour: '4242',
    expiryMonth: '06',
    expiryYear: '2025',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    lastFour: '5555',
    expiryMonth: '12',
    expiryYear: '2024',
    isDefault: false,
  },
];

export default function UserPaymentMethods() {
  const { toast } = useToast();
  const [methods, setMethods] = useState(paymentMethods);

  const handleSetDefault = (id: number) => {
    setMethods(methods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  const handleDeleteMethod = (id: number) => {
    setMethods(methods.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
      variant: "destructive",
    });
  };

  const handleAddNewMethod = () => {
    toast({
      title: "Add payment method",
      description: "This would open a form to add a new payment method.",
    });
  };

  const handleEditMethod = (id: number) => {
    toast({
      title: "Edit payment method",
      description: "This would open a form to edit this payment method.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
        <Button onClick={handleAddNewMethod} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Method
        </Button>
      </div>

      <div className="grid gap-4">
        {methods.map((method) => (
          <div key={method.id} className="border rounded-lg bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{method.type} •••• {method.lastFour}</h3>
                    {method.isDefault && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <Check className="h-3 w-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleEditMethod(method.id)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteMethod(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {methods.length === 0 && (
        <div className="text-center p-12 border rounded-lg bg-card">
          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No payment methods</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You haven't added any payment methods yet.
          </p>
          <Button onClick={handleAddNewMethod} className="mt-4 gap-1">
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  );
}
