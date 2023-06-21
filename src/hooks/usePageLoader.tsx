import { useState } from "react";
import LoadingSpinner from "../components/base/LoadingSpinner";

export const usePageLoader = () => {
  const [loading, setLoading] = useState(false);

  const loader = loading ? <LoadingSpinner /> : false;
  const showLoader = () => {
    setLoading(true);
  };
  const hideLoader = () => {
    setLoading(false);
  };

  return { loader, showLoader, hideLoader };
};
