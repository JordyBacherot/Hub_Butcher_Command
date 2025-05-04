import React from 'react';

export default function Background({ children }: React.PropsWithChildren) {
    return (
        <div className="bg-gray-100 h-screen">
            {children}
        </div>
    );
}
