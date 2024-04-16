// create your RTK Query endpoints here
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['Quotes'],
    endpoints: build => ({
        getQuotes: build.query({
            query: () => 'quotes',
            providesTags: ['Quotes']
        }),
        createQuote: build.mutation({
            query: quote => ({
                url: 'quotes',
                method: 'POST',
                body: quote,
            }),
            invalidatesTags: ['Quotes']
        }),
        toggleFake: build.mutation({

        }),
        deleteQuote: build.mutation({

        }),
    })
})

export const {
    useGetQuotesQuery, useCreateQuoteMutation,
} = quotesApi