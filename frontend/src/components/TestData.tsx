import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DynamicTable } from "./DynamicTable";

interface TestResponse {
  status: string;
  data: Array<Record<string, unknown>>;
  timestamp: string;
}

export const TestData = () => {
  const [data, setData] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/test/supabase");
        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
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
        Status: {data?.status} | Last Updated:{" "}
        {new Date(data?.timestamp || "").toLocaleString()}
      </Typography>

      {data?.data && <DynamicTable data={data.data} />}
    </Box>
  );
};
