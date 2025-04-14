// client/src/algoliaConfig.js
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('USN', 'KEY', {
    logger: {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  });

export default searchClient;