import React, { useState, useEffect } from "react";
// Use public image path because src/assets/wedding-cake.png is not present in the repo
const BakeryImg = "/assets/images/no_image.png";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const DeliverySection = ({ onDeliveryChange, deliveryData }) => {
  const [deliveryType, setDeliveryType] = useState(deliveryData?.type || "delivery");
  const [selectedAddress, setSelectedAddress] = useState(deliveryData?.address || "");
  const [selectedBranch, setSelectedBranch] = useState(deliveryData?.branch || "");
  const [selectedDate, setSelectedDate] = useState(deliveryData?.date || "");
  const [selectedTime, setSelectedTime] = useState(deliveryData?.time || "");
  const [deliveryFee, setDeliveryFee] = useState(deliveryData?.fee || 0);

  const addresses = [
    { value: "home", label: "123 Main Street, Downtown, NY 10001", distance: "2.3 miles", coords: { lat: 40.7128, lng: -74.0060 } },
    { value: "office", label: "456 Business Ave, Corporate District, NY 10002", distance: "4.1 miles", coords: { lat: 40.7150, lng: -74.0020 } },
    { value: "new", label: "Add New Address...", distance: null, coords: null },
  ];

  const branches = [
    { value: "downtown", label: "Downtown Branch - 789 Baker St", hours: "8AM - 8PM", coords: { lat: 40.7115, lng: -74.0100 } },
    { value: "uptown", label: "Uptown Branch - 321 Sweet Ave", hours: "9AM - 7PM", coords: { lat: 40.7200, lng: -73.9950 } },
    { value: "mall", label: "Mall Location - 654 Shopping Blvd", hours: "10AM - 9PM", coords: { lat: 40.7589, lng: -73.9851 } },
  ];

  const bakeryDefaultCoords = { lat: 40.7128, lng: -74.0060 };

  const makeMapSrc = (coords, zoom = 14) => {
    if (!coords) return `https://www.google.com/maps?q=${bakeryDefaultCoords.lat},${bakeryDefaultCoords.lng}&z=${zoom}&output=embed`;
    return `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=${zoom}&output=embed`;
  };

  const timeSlots = [
    { value: "09:00", label: "9:00 AM - 10:00 AM" },
    { value: "10:00", label: "10:00 AM - 11:00 AM" },
    { value: "11:00", label: "11:00 AM - 12:00 PM" },
    { value: "14:00", label: "2:00 PM - 3:00 PM" },
    { value: "15:00", label: "3:00 PM - 4:00 PM" },
    { value: "16:00", label: "4:00 PM - 5:00 PM" },
    { value: "17:00", label: "5:00 PM - 6:00 PM" },
  ];

  // Calculate delivery fee based on distance
  useEffect(() => {
    if (deliveryType === "delivery" && selectedAddress) {
      const address = addresses.find((addr) => addr?.value === selectedAddress);
      if (address && address?.distance) {
        const distance = parseFloat(address?.distance);
        const fee = distance <= 3 ? 5.99 : distance <= 7 ? 8.99 : 12.99;
        setDeliveryFee(fee);
      }
    } else {
      setDeliveryFee(0);
    }
  }, [deliveryType, selectedAddress]);

  // Notify parent
  useEffect(() => {
    onDeliveryChange({
      type: deliveryType,
      address: selectedAddress,
      branch: selectedBranch,
      date: selectedDate,
      time: selectedTime,
      fee: deliveryFee,
    });
  }, [deliveryType, selectedAddress, selectedBranch, selectedDate, selectedTime, deliveryFee]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen border border-border rounded-lg overflow-hidden">
      {/* Left Side Image */}
      <div className="bg-[#F2E2C4] flex items-center justify-center p-6">
        <img src={BakeryImg} alt="Bakery" className="max-w-md w-full object-contain" />
      </div>

      {/* Right Side Form */}
      <div className="bg-card p-6 overflow-y-auto">
        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-6 border-b">
          <button
            onClick={() => setDeliveryType("delivery")}
            className={`pb-2 font-medium ${deliveryType === "delivery" ? "border-b-2 border-[#8C5A3C] text-[#8C5A3C]" : "text-gray-500"
              }`}
          >
            DELIVERY
          </button>
          <button
            onClick={() => setDeliveryType("pickup")}
            className={`pb-2 font-medium ${deliveryType === "pickup" ? "border-b-2 border-[#2F6D66] text-[#2F6D66]" : "text-gray-500"
              }`}
          >
            PICKUP
          </button>
        </div>

        {/* Delivery Options */}
        {deliveryType === "delivery" && (
          <div className="space-y-4 mb-6">
            <Select
              label="Delivery Address"
              options={addresses.map((addr) => ({
                value: addr.value,
                label: addr.label,
                description: addr.distance ? `Distance: ${addr.distance}` : null,
              }))}
              value={selectedAddress}
              onChange={setSelectedAddress}
              placeholder="Select delivery address"
            />

            {selectedAddress === "new" && (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <Input label="Street Address" placeholder="Enter your street address" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="City" placeholder="City" />
                  <Input label="ZIP Code" placeholder="ZIP Code" />
                </div>
              </div>
            )}

            {selectedAddress && selectedAddress !== "new" && (
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Delivery Fee</p>
                    <p className="text-xs text-muted-foreground">
                      Based on distance from bakery
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-primary">
                    ${deliveryFee?.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {selectedAddress && selectedAddress !== "new" && (
              <div className="h-48 rounded-lg overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Delivery Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
                  className="border-0"
                />
              </div>
            )}
          </div>
        )}

        {/* Pickup Options */}
        {deliveryType === "pickup" && (
          <div className="space-y-4 mb-6">
            <Select
              label="Pickup Location"
              options={branches.map((branch) => ({
                value: branch.value,
                label: branch.label,
                description: `Hours: ${branch.hours}`,
              }))}
              value={selectedBranch}
              onChange={setSelectedBranch}
              placeholder="Select pickup location"
            />

            {selectedBranch && (
              <div className="h-48 rounded-lg overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Pickup Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40.7589,-73.9851&z=15&output=embed"
                  className="border-0"
                />
              </div>
            )}
          </div>
        )}

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={deliveryType === "delivery" ? "Delivery Date" : "Pickup Date"}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={getTomorrowDate()}
          />
          <Select
            label={deliveryType === "delivery" ? "Delivery Time" : "Pickup Time"}
            options={timeSlots}
            value={selectedTime}
            onChange={setSelectedTime}
            placeholder="Select time slot"
            disabled={!selectedDate}
          />
        </div>

        {/* Instructions */}
        <div className="mt-4">
          <Input
            label="Special Instructions (Optional)"
            placeholder="Any special delivery instructions..."
            className="h-20"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliverySection;
