// Importing necessary functions from Redux Toolkit Query and Faker library
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating an API slice using Redux Toolkit Query
const usersInputApi = createApi({
    // 'reducerPath' is the name of the reducer that will be added to the Redux store
    // this creates a 'state.albums' object in the Redux store
    reducerPath: "usersInput",

    // 'baseQuery' is a function that returns the base part of all requests
    // Here, it sets the base URL for all API calls to "http://localhost:5173"
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173" }),

    // 'endpoints' is an object that defines the API endpoints
    endpoints(builder) {
        return {
            postUsersInput: builder.mutation({
                // 'query' is a function that returns the details of the API call
                query: (data) => {
                    return {
                        // The URL of the API call
                        url: `/albums`,
                        // The HTTP method of the API call
                        method: "POST",
                        // The body of the API call
                        body: data,
                    };
                },
            }),
        };
    },
});

// Exporting the hooks generated by Redux Toolkit Query
export const { usePostUsersInputMutation } = usersInputApi;
export { usersInputApi };
