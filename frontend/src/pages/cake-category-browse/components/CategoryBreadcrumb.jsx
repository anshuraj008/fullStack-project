import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryBreadcrumb = ({ category, subcategory, className = "" }) => {
  const breadcrumbItems = [
    { label: 'Home', path: '/3d-interactive-homepage' },
    { label: 'Browse Cakes', path: '/cake-category-browse' }
  ];

  if (category) {
    breadcrumbItems?.push({ label: category, path: `/cake-category-browse?category=${category?.toLowerCase()}` });
  }

  if (subcategory) {
    breadcrumbItems?.push({ label: subcategory, path: `/cake-category-browse?category=${category?.toLowerCase()}&subcategory=${subcategory?.toLowerCase()}` });
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <Link
              to={item?.path}
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CategoryBreadcrumb;