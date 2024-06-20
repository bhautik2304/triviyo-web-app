import { apiRoutes } from "@/constant";
import { appAxios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuthUser = createAsyncThunk('user', async (userId) => {
    const data = await appAxios.post(apiRoutes.auth.userFetch).then(res => res.data.user)
    // Inferred return type: Promise<MyData>
    console.log(data);
    return data
},
)