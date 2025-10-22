import { Alert, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTestData,
  selectTestData,
  selectTestError,
} from "../store/slices/testSlice";
import { DynamicTable } from "./DynamicTable";

// interface TestResponse {
//   status: string;
//   data: Array<Record<string, unknown>>;
//   timestamp: string;
// }

export const TestData = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTestData);
  const error = useAppSelector(selectTestError);

  // Redux implementation
  useEffect(() => {
    dispatch(fetchTestData());
  }, [dispatch]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Test Data
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Status: Connected | Last Updated: {new Date().toLocaleString()}
      </Typography>

      {data?.length > 0 && <DynamicTable data={data} />}
    </Box>
  );
};
