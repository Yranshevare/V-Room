import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Copy, UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { appServer } from "@/constant";

export default function InviteDialog() {
    const params = useParams();
    const searchParams = useSearchParams();
    const roomCode = params.roomCode as string;
    const roomName = searchParams.get("room") || `Room ${roomCode}`;

    const [LinkCopied, setLinkCopied] = useState(false);

    const link = `${appServer}/join-room?roomCode=${roomCode}&room=${roomName}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleCopyRoomName = async () => {
        try {
            await navigator.clipboard.writeText(roomName);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleCopyRoomCode = async () => {
        try {
            await navigator.clipboard.writeText(roomCode);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    return (
        <Dialog>
            <DialogTrigger>
                <div className="cursor-pointer min-[500px]:ring-1 rounded flex justify-center items-center px-2 py-1 ring-[#8b5cf6]/50">
                    <UserRoundPlus className="h-4 w-4 min-[500px]:mr-2 " />
                    <span className="max-[500px]:hidden">Invite</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex flex-col gap-2 mb-5">
                        <DialogTitle className="text-start">Option 1: Shear Link</DialogTitle>
                        <DialogDescription className="text-gray-900 text-start">Anyone who has this link will be able to view this.</DialogDescription>
                        <div className="flex justify-between  py-1 rounded ring-[3px]  ring-[#8b5cf6]/50 bg-gray-100 ">
                            <input id="link" defaultValue={link} readOnly className="text-gray-600 w-full px-2 py-1 rounded-l  outline-none   " />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopyLink}
                                className="bg-transparent hover:bg-transparent hover:text-black"
                            >
                                {LinkCopied ? (
                                    <>
                                        <Check className="h-4 w-4 text-green-500" />
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <DialogTitle className="text-start">Option 2: Shear Credentials</DialogTitle>
                        <DialogDescription className="text-gray-900 text-start">Anyone who has this Credentials will be able to view this.</DialogDescription>
                        <div>
                            <div className="text-gray-900 font-semibold mb-2 text-start">Room name:</div>
                            <div className="flex justify-between  py-1 rounded ring-[3px]  ring-[#8b5cf6]/50 bg-gray-100 ">
                                <input
                                    id="link"
                                    defaultValue={roomName}
                                    readOnly
                                    className="text-gray-600 w-full px-2 py-1 rounded-l  outline-none   "
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopyRoomName}
                                    className="bg-transparent hover:bg-transparent hover:text-black"
                                >
                                    {LinkCopied ? (
                                        <>
                                            <Check className="h-4 w-4 text-green-500" />
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                            <div className="text-gray-900 font-semibold mb-2 text-start">Room Code:</div>
                            <div className="flex justify-between  py-1 rounded ring-[3px]  ring-[#8b5cf6]/50 bg-gray-100 ">
                                <input
                                    id="link"
                                    defaultValue={roomCode}
                                    readOnly
                                    className="text-gray-600 w-full px-2 py-1 rounded-l  outline-none   "
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopyRoomCode}
                                    className="bg-transparent hover:bg-transparent hover:text-black"
                                >
                                    {LinkCopied ? (
                                        <>
                                            <Check className="h-4 w-4 text-green-500" />
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="cursor-pointer">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
