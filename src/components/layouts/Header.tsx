import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <Image
            src="/intro.jpg"
            alt="Logo"
            width={24}
            height={24}
            className="w-8 h-8"
        />
        <Link href="/" className="text-2xl font-bold">
            Trendy
        </Link>
        <div></div>
        </header>
    );
    }   