// @flow

import { rangeMap } from '@adeira/js';
import * as React from 'react';
import { graphql, QueryRenderer } from '@adeira/relay';
import { ProductCard, Skeleton, Note, Button } from '@adeira/sx-design';
import { fbt } from 'fbt';
import sx from '@adeira/sx';

import LinkInternal from '../LinkInternal';

export default function ShopLayoutContent(): React.Node {
  return (
    <QueryRenderer
      query={graphql`
        query ShopLayoutContentQuery(
          $clientLocale: SupportedLocale!
          $priceSortDirection: PriceSortDirection!
          $searchTerm: String
        ) {
          commerce {
            products: searchPublishedProducts(
              clientLocale: $clientLocale
              priceSortDirection: $priceSortDirection
              searchTerm: $searchTerm
            ) {
              key
              name
              price {
                unitAmount
                unitAmountCurrency
              }
            }
          }
        }
      `}
      variables={{
        clientLocale: 'en_US', // TODO
        priceSortDirection: 'LOW_TO_HIGH',
      }}
      onLoading={() => {
        // Loading screen (first Skeleton, then Blurhash, then the actual image):
        return (
          <div className={styles('productsGrid')}>
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </div>
        );
      }}
      onSystemError={({ retry }) => {
        return (
          <Note
            tint="error"
            action={
              retry != null ? (
                <Button onClick={retry}>
                  <fbt desc="retry button title">retry</fbt>
                </Button>
              ) : null
            }
          >
            <fbt desc="unable to load eshop products note">unable to load eshop products</fbt>
          </Note>
        );
      }}
      onResponse={({ commerce: { products } }) => {
        return (
          <div className={styles('productsGrid')}>
            {products.map((product) => {
              return (
                <LinkInternal key={product.key} href={`/shop/${product.key}`}>
                  <ProductCard
                    priceUnitAmount={product.price.unitAmount}
                    priceUnitAmountCurrency={product.price.unitAmountCurrency}
                    title={product.name}
                  />
                </LinkInternal>
              );
            })}
          </div>
        );
      }}
    />
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});
