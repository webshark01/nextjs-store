import ProductsContainer from '@/components/products/ProductsContainer';
import React from 'react';

const page = ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';
  return <ProductsContainer layout={layout} search={search} />;
};

export default page;

//Parent component hai yahan sy hum searchParams bhej rhy hain to child component thats we define the types jo jo included hoga searchParams object main and ye object basically hamari query string hogi jisko hum update krein gy through navSearch Component.
