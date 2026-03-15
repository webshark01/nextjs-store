import { fetchAllProducts } from '@/utils/actions';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LuLayoutGrid } from 'react-icons/lu';
import { Separator } from '@/components/ui/separator';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';

const ProductsContainer = async ({
  search,
  layout,
}: {
  search?: string;
  layout?: string;
}) => {
  const products = await fetchAllProducts({ search: search || '' });
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} Product{totalProducts > 1 && 's'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
