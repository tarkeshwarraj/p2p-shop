import Link from "next/link";
import Image from 'next/image';

// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-8">
    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
            <Image className="h-9 w-auto" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg" alt="dummyLogoDark" width={150} height={36} />
            <p className="mt-6 text-sm">
                A secure peer-to-peer platform where users can safely buy and sell products, with built-in protections to prevent scams, verify transactions, and build trust between buyers and sellers. Our system ensures every deal is transparent, smooth, and secure—making online trading simple and reliable for everyone.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                <ul className="text-sm space-y-2">
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="#">About us</Link></li>
                    <li><Link href="#">Contact us</Link></li>
                    <li><Link href="#">Privacy policy</Link></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                <div className="text-sm space-y-2">
                    <p>+1-212-456-7890</p>
                    <p>contact@example.com</p>
                </div>
           
            <div>
                <p className="my-2">Powered By</p>
                <Image src="/nowpayments-white.png" width={70} height={70} alt={"Picture of the author"} />
            </div>
             </div>
        </div>
    </div>
    <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 © Company name. All Right Reserved.
    </p>
</footer>
  );
}
