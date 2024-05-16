import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export default function Header() {
    return (
        <header >
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <Link href="/" >
                    <Image
                        src="/favicon.svg"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="w-8 h-8"
                    />
                </Link>
                <Link href="/" >
                    <h2 className="text-2xl font-bold">Trendy</h2>
                </Link>
                <Search />
            </div>
        </header>
    );
}   