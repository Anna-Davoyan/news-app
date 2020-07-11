import React from 'react';

export function HandleError() {
    return (
        <div>
            <h1 style={{color: '#163abe'}}>500</h1>
            <h4>Unexpected Error</h4>
            <span>An error occurred and your request couldn't be completed. </span>
            <p>Please try again</p>
        </div>
    )
};