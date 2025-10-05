import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import JoinRoomPage from './JoinRoomPage';

export default function JoinRoom() {
    return (
        <Suspense fallback={
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        }>
            <JoinRoomPage />
        </Suspense>
    );
}
