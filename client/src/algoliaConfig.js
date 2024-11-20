// client/src/algoliaConfig.js
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('X4HHNR74UG', '5f31d363c9a672f6fda6d859bd59fb70', {
    logger: {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  });

export default searchClient;