import React from 'react';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import searchClient from '../../algoliaConfig';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';

const Hit = ({ hit }) => (
  <Box border="1px solid #ccc" borderRadius="8px" padding="1rem" margin="1rem 0">
    <img src={`http://localhost:3001/assets/${hit.userPicturePath}`} alt={hit.firstName} width="50" height="50" style={{ borderRadius: '50%' }} />
    <Typography variant="h6">{hit.firstName} {hit.lastName}</Typography>
    <Typography variant="body2">{hit.location}</Typography>
    <Typography variant="body1">{hit.description}</Typography>
    <Typography variant="body2">Likes: {Object.keys(hit.likes).length}</Typography>
    <Typography variant="body2">Comments: {hit.comments.length}</Typography>
  </Box>
);

const CustomHits = connectHits(({ hits }) => {
  console.log('Algolia search results:', hits);
  return (
    <div>
      {hits.map(hit => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
});

const SearchWidget = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  return (
    <InstantSearch searchClient={searchClient} indexName="posts_index">
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
      >
        <SearchBox />
        <CustomHits />
      </FlexBetween>
    </InstantSearch>
  );
};

export default SearchWidget;