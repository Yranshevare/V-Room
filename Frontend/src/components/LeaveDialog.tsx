import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { websocketServerUrl } from "@/constant";
import axios from "axios";
import { PhoneOff, Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function LeaveDialog() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const roomCode = params.roomCode as string;
    const userName = searchParams.get("name") || "";
    const roomName = searchParams.get("room") || "";

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // control dialog manually

    const handleLeaveRoom = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/LeaveRoom?userName=${userName}&roomName=${roomName}&roomCode=${roomCode}`);
            
            if (res.data.message === "Success") {
                sessionStorage.removeItem("messages");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        
    }, []);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-600 min-[500px]:bg-red-300 hover:bg-red-400 cursor-pointer">
                    <PhoneOff className="h-4 w-4 min-[500px]mr-2" />
                    <span className="max-[500px]:hidden">Leave</span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-900">
                        You can rejoin the room with the same credentials only if the room is still active. A room stays active as long as at least
                        one person is in it.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    {/* no AlertDialogAction, we handle close manually */}
                    <Button
                        variant="destructive"
                        onClick={handleLeaveRoom}
                        disabled={loading}
                        className="bg-red-400 hover:bg-red-600 duration-300 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Leaving...
                            </>
                        ) : (
                            "Leave"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
