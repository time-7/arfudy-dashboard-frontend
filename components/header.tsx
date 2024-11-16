import Link from 'next/link';

import { Grid2x2Plus, LogOut, UserIcon } from 'lucide-react';

import { Button } from './ui/button';

export default function Header() {
    return (
        <header className="flex w-full justify-end">
            <Link href="/pratos" className="font-medium">
                <Button variant="ghost" size="icon" className="text-primary">
                    <Grid2x2Plus />
                </Button>
            </Link>

            <Link href="/" className="font-medium">
                <Button variant="ghost" size="icon" className="text-primary">
                    <UserIcon />
                </Button>
            </Link>

            <Link href="/mesas" className="font-medium">
                <Button
                    disabled
                    size="icon"
                    variant="ghost"
                    className="h-9 text-primary"
                >
                    <LogOut />
                </Button>
            </Link>
        </header>
    );
}
