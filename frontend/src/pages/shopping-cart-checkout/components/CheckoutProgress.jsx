import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Cart Review', icon: 'ShoppingCart' },
    { id: 2, name: 'Delivery', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
                step?.id <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${
                step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.name}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                step?.id < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;