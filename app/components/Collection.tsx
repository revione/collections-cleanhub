import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  LinearProgress,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import { CollectionData } from "../types";

export default function Collection({
  collectionData,
}: {
  collectionData: CollectionData;
}) {
  const {
    logo,
    displayName,
    type,
    location,
    parentHubName,
    state,
    stage,
    category,
    collectionAndSortingParagraph,
    slug,
    totalRecoveredQuantity,
    unassignedQuantityTotal,
    cardDescription,
    cardImage,
    unassignedQuantityPercentage,
  } = collectionData;

  return (
    <Card style={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar variant="rounded" alt="Hub Logo" src={logo?.directLink} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{displayName}</Typography>
            <Typography variant="body2">{type || " "}</Typography>
            <Typography variant="body2">{location || " "}</Typography>
            <Typography variant="body2">{parentHubName || " "}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{state}</Typography>
            <Typography variant="body2">{stage}</Typography>
            <Typography variant="body2">{category}</Typography>
          </Grid>
        </Grid>
        {collectionAndSortingParagraph && (
          <Typography>{collectionAndSortingParagraph}</Typography>
        )}
        <Box mt={2}>
          <Typography>Progress:</Typography>
          <LinearProgress
            variant="determinate"
            value={Number(unassignedQuantityPercentage)}
          />
        </Box>
        {unassignedQuantityPercentage && (
          <Typography>
            Unassigned Percentage: {unassignedQuantityPercentage}%
          </Typography>
        )}

        <Typography>
          Unassigned Quantity: {unassignedQuantityTotal.toFixed(2)}
        </Typography>

        <Typography>
          Total Recovered Quantity: {totalRecoveredQuantity.toFixed(2)}
        </Typography>
      </CardContent>
      {cardImage && (
        <CardContent>
          <CardMedia
            component="img"
            alt={displayName}
            height="250"
            image={cardImage?.directLink}
          />
        </CardContent>
      )}
      {cardDescription && (
        <CardContent>
          <Typography>{cardDescription}</Typography>
        </CardContent>
      )}
      {slug && (
        <CardActions>
          <Button
            component="a"
            href={`https://test.cleanhub.com/hub/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            More details
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
