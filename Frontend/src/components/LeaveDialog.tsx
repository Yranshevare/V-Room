import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LeaveDialog() {
    const router = useRouter();

    const handleLeaveRoom = () => {
        // router.push("/"); // navigate to homepage
        console.log("leave room");
    };

    return (
        <AlertDialog>
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
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    {/* Connect handleLeaveRoom here */}
                    <AlertDialogAction asChild className="bg-red-400 hover:bg-red-600 duration-300 cursor-pointer">
                        <Button variant="destructive" onClick={handleLeaveRoom}>
                            Leave
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
