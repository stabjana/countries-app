import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Country } from "../../types/country";
import { favoritesApi } from "../../api/services/favourites";

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
    }
  };
};
