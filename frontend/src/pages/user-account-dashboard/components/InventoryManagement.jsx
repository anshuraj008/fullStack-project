import React from 'react';
import Icon from '../../../components/AppIcon';

const InventoryManagement = () => {
  const inventory = [
    { id: 1, name: 'Chocolate Cake Mix', stock: 15, minStock: 10, unit: 'kg' },
    { id: 2, name: 'Vanilla Frosting', stock: 8, minStock: 12, unit: 'kg' },
    { id: 3, name: 'Food Coloring Set', stock: 25, minStock: 5, unit: 'sets' },
    { id: 4, name: 'Cake Boxes', stock: 45, minStock: 20, unit: 'pieces' },
  ];

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) return { color: 'text-red-600', status: 'Low Stock' };
    if (stock <= minStock * 1.5) return { color: 'text-yellow-600', status: 'Medium Stock' };
    return { color: 'text-green-600', status: 'Good Stock' };
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Inventory Management</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          + Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.stock, item.minStock);
          return (
            <div key={item.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                <Icon name="Package" size={16} className="text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-medium text-foreground">{item.stock} {item.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min Stock:</span>
                  <span className="font-medium text-muted-foreground">{item.minStock} {item.unit}</span>
                </div>
                <div className={`text-xs font-medium ${stockStatus.color}`}>
                  {stockStatus.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center py-8 text-muted-foreground">
        <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Full inventory management system coming soon...</p>
      </div>
    </div>
  );
};

export default InventoryManagement;
