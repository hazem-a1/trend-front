import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header >
                <Link href="/" >
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">

           
        <Image
            src="/favicon.svg"
            alt="Logo"
            width={24}
            height={24}
            className="w-8 h-8"
        />
            <h2 className="text-2xl font-bold">Trendy</h2>
        <div></div>
        </div>
        </Link>
        </header>
    );
    }   