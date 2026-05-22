import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const ReviewModal = ({ order, isOpen, onClose, onSubmit, className = "" }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newPhotos = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }));
    setPhotos(prev => [...prev, ...newPhotos]?.slice(0, 3)); // Max 3 photos
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev?.filter(photo => photo?.id !== photoId));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reviewData = {
      orderId: order?.id,
      rating,
      reviewText,
      photos: photos?.map(photo => photo?.url),
      date: new Date()
    };
    
    onSubmit(reviewData);
    setIsSubmitting(false);
    
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setReviewText('');
    setPhotos([]);
    onClose();
  };

  const getRatingText = (value) => {
    const texts = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return texts?.[value] || '';
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}>
        <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Rate Your Order
            </h2>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            {/* Order Info */}
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={order?.cakeImage}
                  alt={order?.cakeName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-medium text-foreground">{order?.cakeName}</h3>
                <p className="text-sm text-muted-foreground">Order #{order?.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {order?.orderDate?.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                How was your experience?
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleRatingHover(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-smooth hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        className={
                          star <= (hoveredRating || rating)
                            ? 'text-warning fill-current' :'text-border hover:text-warning/50'
                        }
                      />
                    </button>
                  ))}
                </div>
                {(rating > 0 || hoveredRating > 0) && (
                  <span className="text-sm text-muted-foreground ml-2">
                    {getRatingText(hoveredRating || rating)}
                  </span>
                )}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tell us more about your experience (optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e?.target?.value)}
                placeholder="Share your thoughts about the cake quality, taste, delivery, etc..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {reviewText?.length}/500 characters
              </p>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Add photos (optional)
              </label>
              
              {photos?.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {photos?.map((photo) => (
                    <div key={photo?.id} className="relative">
                      <div className="w-full h-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={photo?.url}
                          alt="Review photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(photo?.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center text-xs hover:bg-destructive/80 transition-smooth"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {photos?.length < 3 && (
                <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-accent/50 transition-smooth">
                  <div className="text-center">
                    <Icon name="Camera" size={20} className="text-muted-foreground mx-auto mb-1" />
                    <span className="text-sm text-muted-foreground">Add Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
              
              <p className="text-xs text-muted-foreground mt-1">
                You can upload up to 3 photos
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                disabled={rating === 0}
                className="flex-1"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;