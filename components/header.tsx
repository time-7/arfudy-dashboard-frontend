import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex h-16 w-full flex-row justify-between">
            <Link href="/">
                <Image src="/arfudy.png" alt="Logo" height={32} width={96} />
            </Link>

            <div className="flex items-center gap-2">
                <Link href="/" className="font-medium">
                    Dashboard
                </Link>

                <Link href="/mesas" className="font-medium">
                    Mesas
                </Link>

                <Link href="/pratos" className="font-medium">
                    Pratos
                </Link>
            </div>
        </header>
    );
}
