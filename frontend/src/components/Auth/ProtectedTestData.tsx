import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { TestData } from "../../types/test";
import { DynamicTable } from "../DynamicTable";
import { CreateEntryForm } from "./CreateEntryForm";

export const ProtectedTestData = () => {
    
    const [data, setData] = useState<TestData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProtectedData = async () => {
        try {
            const {data: protectedData, error} = await supabase
            .from('protected_data')
            .select('*')
            if(error) throw error;
            setData(protectedData);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error has occured");

        } finally {
            // something is been sent back
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProtectedData();
    }, []);

    if (loading) return <div>Loading... still</div>
    if (error) return <div>Error: {error}</div>
 
    return(
        <Box sx={{ p: 3 }}>
            <Typography >
                Protected Test Data - This data is only accessible to Authenticated Users
            </Typography>
            
        <CreateEntryForm onSuccess={fetchProtectedData} />

        {data.length > 0 ? (
            <DynamicTable data={data} />
        ) : (
            <div>No protected data available, please create some.</div>
        )}
        </Box>
    )
};