import React from 'react'

export function Loader() {
    return (
        <div className='overlay'>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};