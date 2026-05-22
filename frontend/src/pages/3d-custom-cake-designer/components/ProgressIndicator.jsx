import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 6, className = "" }) => {
  const steps = [
    { id: 1, label: 'Base', icon: 'Layers', description: 'Size & Shape' },
    { id: 2, label: 'Flavor', icon: 'Cookie', description: 'Cake Flavor' },
    { id: 3, label: 'Frosting', icon: 'Paintbrush', description: 'Frosting Type' },
    { id: 4, label: 'Decorations', icon: 'Star', description: 'Add Decorations' },
    { id: 5, label: 'Text', icon: 'Type', description: 'Custom Message' },
    { id: 6, label: 'Review', icon: 'CheckCircle', description: 'Final Review' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className={`bg-background border border-border rounded-lg p-4 ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          Design Progress
        </h3>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {/* Step List - Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {steps?.map((step) => {
            const status = getStepStatus(step?.id);
            return (
              <div key={step?.id} className="flex-shrink-0 text-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-smooth ${getStepClasses(status)}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <div className="text-xs font-medium text-foreground whitespace-nowrap">
                  {step?.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Step List - Desktop Vertical */}
      <div className="hidden md:block space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === steps?.length - 1;
          
          return (
            <div key={step?.id} className="relative">
              <div className="flex items-center space-x-3">
                {/* Step Icon */}
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${getStepClasses(status)}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={step?.icon} size={14} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </h4>
                    {status === 'current' && (
                      <div className="flex items-center space-x-1 text-xs text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span>In Progress</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {step?.description}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-4 top-8 w-px h-6 transition-colors duration-300">
                  <div className={`w-full h-full ${getConnectorClasses(step?.id)}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {currentStep === totalSteps ? 'Ready to order!' : 'Continue customizing...'}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>~{Math.max(1, totalSteps - currentStep + 1)} min left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;