import React, { useState } from 'react';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import searchClient from '../../algoliaConfig';
import { Box, Typography, useTheme, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';

const Hit = ({ hit }) => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'dark' ? theme.palette.neutral.light : theme.palette.text.primary;
  const secondaryTextColor = theme.palette.mode === 'dark' ? theme.palette.neutral.medium : theme.palette.text.secondary;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={`http://localhost:3001/assets/${hit.userPicturePath}`} alt={hit.firstName} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography color={textColor}>{`${hit.firstName} ${hit.lastName}`}</Typography>}
        secondary={
          <>
            <Typography variant="body2" color={secondaryTextColor}>
              {hit.location}
            </Typography>
            <Typography variant="body1" color={textColor} sx={{ mt: 1 }}>
              {hit.description}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

const CustomHits = connectHits(({ hits }) => {
  const theme = useTheme();
  const backgroundColor = theme.palette.mode === 'dark' 
    ? theme.palette.background.paper 
    : theme.palette.background.default;

  if (hits.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List sx={{ backgroundColor, borderRadius: 1, p: 2 }}>
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
  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.alt : theme.palette.background.default;
  const textColor = theme.palette.mode === 'dark' ? theme.palette.neutral.light : theme.palette.text.primary;
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
            backgroundColor={backgroundColor}
            color={textColor}
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
            borderRadius="0 0 9px 9px"
            zIndex="10"
            maxHeight="900px"
            overflowY="auto"
          >
            <CustomHits />
          </Box>
        )}
      </FlexBetween>
    </InstantSearch>
  );
};

export default SearchWidget;