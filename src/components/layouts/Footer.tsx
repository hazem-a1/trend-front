import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 bg-gray-800 text-white text-center">
            &copy; {new Date().getFullYear()} Trendy. All rights reserved. <Link href="https://www.linkedin.com/in/hazem-sobhy-78b270142/" target="_blank" className="font-bold">ZOZ Built it.</Link>
        </footer>
    );
}