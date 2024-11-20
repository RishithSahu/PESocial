import React, { useState } from 'react';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import searchClient from '../../algoliaConfig';
import { Box, Typography, useTheme, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';

const Hit = ({ hit }) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar src={`http://localhost:3001/assets/${hit.userPicturePath}`} alt={hit.firstName} />
    </ListItemAvatar>
    <ListItemText
      primary={`${hit.firstName} ${hit.lastName}`}
      secondary={
        <>
          <Typography variant="body2" color="textSecondary">
            {hit.location}
          </Typography>
          <Typography variant="body1" color="textPrimary" sx={{ mt: 1 }}>
            {hit.description}
          </Typography>
        </>
      }
    />
  </ListItem>
);

const CustomHits = connectHits(({ hits }) => {
  if (hits.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List>
      {hits.map((hit, index) => (
        <React.Fragment key={hit.objectID}>
          <Hit hit={hit} />
          {index < hits.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
});

const SearchWidget = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchStateChange = ({ query }) => {
    setHasSearched(query.length > 0);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="posts_index" onSearchStateChange={handleSearchStateChange}>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="19px"
        gap="3rem"
        padding="1rem 1.5rem"
        position="relative"
        sx={{ width: '100%' }} // Adjust the width of the FlexBetween container
      >
        <SearchBox
          sx={{ width: '100%' }} // Adjust the width of the SearchBox component
        />
        {hasSearched && (
          <Box
            position="absolute"
            top="100%"
            left="0"
            right="0"
            backgroundColor="white"
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
            borderRadius="0 0 9px 9px"
            zIndex="10"
            maxHeight="1000px"
            overflowY="scroll"
          >
            <CustomHits />
          </Box>
        )}
      </FlexBetween>
    </InstantSearch>
  );
};

export default SearchWidget;