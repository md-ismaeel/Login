import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function NotFound() {
    const error = useRouteError()
    return (
        <section className='w-full text-center mt-10 text-xl text-red-500'>
            {error ? (
                <>
                    Error: {error.status || 'Unknown!'}, {error.statusText || 'An unexpected error occurred!!'}!
                </>
            ) : (
                "An unexpected error occurred!!"
            )}
        </section>
    )
}

