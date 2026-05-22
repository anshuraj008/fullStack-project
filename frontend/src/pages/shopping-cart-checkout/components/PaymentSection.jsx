import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ onPaymentChange, paymentData, orderTotal }) => {
  const [paymentMethod, setPaymentMethod] = useState(paymentData?.method || 'card');
  const [cardData, setCardData] = useState({
    number: paymentData?.cardNumber || '',
    expiry: paymentData?.expiry || '',
    cvv: paymentData?.cvv || '',
    name: paymentData?.cardName || ''
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsDelivery: paymentData?.sameAsDelivery || true,
    street: paymentData?.billingStreet || '',
    city: paymentData?.billingCity || '',
    zip: paymentData?.billingZip || ''
  });
  const [saveCard, setSaveCard] = useState(paymentData?.saveCard || false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', description: 'Visa, Mastercard, American Express' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet', description: 'Pay with your PayPal account' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone', description: 'Touch ID or Face ID' },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone', description: 'Pay with Google' }
  ];

  const handleCardDataChange = (field, value) => {
    const newCardData = { ...cardData, [field]: value };
    setCardData(newCardData);
    
    onPaymentChange({
      method: paymentMethod,
      cardData: newCardData,
      billingAddress,
      saveCard
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    onPaymentChange({
      method,
      cardData,
      billingAddress,
      saveCard
    });
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\D/g, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Payment Information
      </h3>
      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        <label className="text-sm font-medium text-foreground">
          Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              onClick={() => handlePaymentMethodChange(method?.id)}
              className={`p-4 rounded-lg border text-left transition-smooth ${
                paymentMethod === method?.id
                  ? 'border-primary bg-accent text-primary' :'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={method?.icon} size={20} />
                <div>
                  <h4 className="font-medium text-sm">{method?.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {method?.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 mb-6">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={cardData?.number}
            onChange={(e) => handleCardDataChange('number', formatCardNumber(e?.target?.value))}
            maxLength={19}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={cardData?.expiry}
              onChange={(e) => handleCardDataChange('expiry', formatExpiry(e?.target?.value))}
              maxLength={5}
            />
            <Input
              label="CVV"
              placeholder="123"
              value={cardData?.cvv}
              onChange={(e) => handleCardDataChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
              maxLength={4}
            />
          </div>

          <Input
            label="Cardholder Name"
            placeholder="John Doe"
            value={cardData?.name}
            onChange={(e) => handleCardDataChange('name', e?.target?.value)}
          />

          <Checkbox
            label="Save this card for future purchases"
            checked={saveCard}
            onChange={(e) => setSaveCard(e?.target?.checked)}
          />
        </div>
      )}
      {/* Alternative Payment Methods */}
      {paymentMethod !== 'card' && (
        <div className="mb-6 p-4 bg-accent/50 rounded-lg text-center">
          <Icon name={paymentMethods?.find(m => m?.id === paymentMethod)?.icon} size={32} className="mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">
            You will be redirected to {paymentMethods?.find(m => m?.id === paymentMethod)?.name} to complete your payment
          </p>
        </div>
      )}
      {/* Billing Address */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-foreground">Billing Address</h4>
        
        <Checkbox
          label="Same as delivery address"
          checked={billingAddress?.sameAsDelivery}
          onChange={(e) => setBillingAddress(prev => ({ ...prev, sameAsDelivery: e?.target?.checked }))}
        />

        {!billingAddress?.sameAsDelivery && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <Input
              label="Street Address"
              placeholder="Enter billing address"
              value={billingAddress?.street}
              onChange={(e) => setBillingAddress(prev => ({ ...prev, street: e?.target?.value }))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City"
                placeholder="City"
                value={billingAddress?.city}
                onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e?.target?.value }))}
              />
              <Input
                label="ZIP Code"
                placeholder="ZIP Code"
                value={billingAddress?.zip}
                onChange={(e) => setBillingAddress(prev => ({ ...prev, zip: e?.target?.value }))}
              />
            </div>
          </div>
        )}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={16} className="text-success" />
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CreditCard" size={16} className="text-success" />
          <span>PCI Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;