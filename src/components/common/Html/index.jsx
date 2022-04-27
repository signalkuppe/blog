import React from 'react';

export default function Html({ children, ...props }) {
    return (
        <html lang="it" {...props}>
            {children}
        </html>
    );
}
