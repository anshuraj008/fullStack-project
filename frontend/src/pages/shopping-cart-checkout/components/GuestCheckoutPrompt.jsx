import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GuestCheckoutPrompt = ({ onGuestInfo, onCreateAccount, guestData }) => {
  const [isGuest, setIsGuest] = useState(guestData?.isGuest !== false);
  const [guestInfo, setGuestInfo] = useState({
    email: guestData?.email || '',
    phone: guestData?.phone || '',
    firstName: guestData?.firstName || '',
    lastName: guestData?.lastName || ''
  });
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState('');

  // If user is authenticated (not a guest), show their info
  const isAuthenticated = !guestData?.isGuest;

  const handleGuestInfoChange = (field, value) => {
    const newInfo = { ...guestInfo, [field]: value };
    setGuestInfo(newInfo);
    onGuestInfo({ ...newInfo, isGuest, createAccount, password });
  };

  const handleAccountToggle = (checked) => {
    setCreateAccount(checked);
    onGuestInfo({ ...guestInfo, isGuest, createAccount: checked, password });
  };

  // If authenticated, show user info
  if (isAuthenticated) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Contact Information
          </h3>
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Icon name="CheckCircle" size={16} />
            <span className="font-medium">Signed In</span>
          </div>
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">
                {guestData?.firstName} {guestData?.lastName}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center space-x-1 mb-1">
                <Icon name="Mail" size={14} />
                <span>{guestData?.email}</span>
              </p>
              {guestData?.phone && (
                <p className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Icon name="Phone" size={14} />
                  <span>{guestData?.phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Contact Information
      </h3>
      {/* Guest vs Account Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setIsGuest(true)}
          className={`p-4 rounded-lg border text-left transition-smooth ${
            isGuest
              ? 'border-primary bg-accent text-primary' :'border-border bg-background hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="UserX" size={20} />
            <div>
              <h4 className="font-medium">Guest Checkout</h4>
              <p className="text-sm text-muted-foreground">Quick and easy</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setIsGuest(false)}
          className={`p-4 rounded-lg border text-left transition-smooth ${
            !isGuest
              ? 'border-primary bg-accent text-primary' :'border-border bg-background hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="User" size={20} />
            <div>
              <h4 className="font-medium">Sign In</h4>
              <p className="text-sm text-muted-foreground">Access your account</p>
            </div>
          </div>
        </button>
      </div>
      {/* Guest Information Form */}
      {isGuest && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={guestInfo?.firstName}
              onChange={(e) => handleGuestInfoChange('firstName', e?.target?.value)}
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={guestInfo?.lastName}
              onChange={(e) => handleGuestInfoChange('lastName', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={guestInfo?.email}
            onChange={(e) => handleGuestInfoChange('email', e?.target?.value)}
            description="We'll send your order confirmation here"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            value={guestInfo?.phone}
            onChange={(e) => handleGuestInfoChange('phone', e?.target?.value)}
            description="For delivery updates and support"
            required
          />

          {/* Create Account Option */}
          <div className="pt-4 border-t border-border">
            <Checkbox
              label="Create an account for faster future checkouts"
              description="Save your information and track orders easily"
              checked={createAccount}
              onChange={(e) => handleAccountToggle(e?.target?.checked)}
            />

            {createAccount && (
              <div className="mt-4">
                <Input
                  label="Create Password"
                  type="password"
                  placeholder="Choose a secure password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value)}
                  description="Minimum 8 characters"
                  required
                />
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-4 p-4 bg-accent/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">
              Why create an account?
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Track your orders in real-time</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Save favorite cake designs</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Faster checkout next time</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Exclusive member discounts</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Sign In Form */}
      {!isGuest && (
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />
            <Button variant="link" className="text-sm">
              Forgot password?
            </Button>
          </div>

          <Button variant="default" fullWidth>
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="text-sm p-0" onClick={() => setIsGuest(true)}>
                Continue as guest
              </Button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCheckoutPrompt;