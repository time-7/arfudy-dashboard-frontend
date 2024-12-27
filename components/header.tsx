import Link from 'next/link';

import { Grid2x2Plus, LogOut, UserIcon } from 'lucide-react';

import { Button } from './ui/button';

export default function Header() {
    return (
        <header className="flex w-full items-center justify-end gap-2">
            <Button variant="header" size="icon">
                <Link href="/produtos" className="font-medium">
                    <Grid2x2Plus size={28} />
                </Link>
            </Button>

            <Button variant="header" size="icon">
                <Link href="/" className="font-medium">
                    <UserIcon size={28} />
                </Link>
            </Button>

            <Button disabled variant="header" size="icon">
                <Link href="/mesas" className="font-medium">
                    <LogOut size={28} />
                </Link>
            </Button>
        </header>
    );
}
