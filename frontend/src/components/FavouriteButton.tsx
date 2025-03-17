import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Country } from "../types/country";
import { favoritesApi } from "../api/services/favourites";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { colors } from "../theme/theme";

interface FavouriteButtonProps {
  country: Country;
  onToggle?: (isFavourite: boolean) => void;
}

export const FavoriteButton = ({ country, onToggle }: FavouriteButtonProps) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!user || isInitialized) return;

    const checkFavouriteStatus = async () => {
      try {
        const status = await favoritesApi.isFavorite(country.name.common);
        setIsFavorite(status);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error checking favourite status:", error);
      }
    };
    checkFavouriteStatus();
  }, [user, country.name.common, isInitialized]);

  const handleToggleFavourites = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesApi.removeFavorite(country.name.common);
        setIsFavorite(false);
      } else {
        await favoritesApi.addFavorite(country);
        setIsFavorite(true);
      }
      if (onToggle) {
        onToggle(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Tooltip
      title={isFavorite ? "Remove from favourites" : "Add to favourites"}
    >
      <IconButton
        onClick={handleToggleFavourites}
        disabled={loading}
        sx={{
          color: isFavorite ? colors.lightAccent : "inherit", // Pink when favorite
          "&:hover": {
            color: isFavorite ? "#E85D75" : colors.lightAccent, // Darker pink on hover
          },
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};
