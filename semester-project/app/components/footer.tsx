import React from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa6";

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-4 px-6 bottom-0 w-full">
            <div className="container mx-auto text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <h1><span className="text-blue-600 font-extrabold">Anode</span>&<span className="text-amber-600 font-extrabold">Cathode</span></h1>
                </div>
                <div>
                    <h1 className="text-white font-extrabold">Learn More</h1>
                    <ul>
                        <li><a href="#">Link 1</a></li>
                        <li><a href="#">Link 2</a></li>
                        <li><a href="#">Link 3</a></li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-white font-extrabold">Contact Us</h1>
                    <ul>
                        <li>Email: example@example.com</li>
                        <li>Phone: 123-456-7890</li>
                        <li>Address: 123 Main St, City, State</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-white font-extrabold mb-5">Social</h1>
                    <div className="grid grid-cols-6 gap-4 place-items-center">
                        <a href="https://www.facebook.com" target="_blank" className='inline col-span-1 text-3xl'><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" className='inline col-span-1 text-3xl'><FaTwitter /></a>
                        <a href="https://www.instagram.com" target="_blank" className='inline col-span-1 text-3xl'><FaInstagram /></a>
                        <a href="https://www.youtube.com" target="_blank" className='inline col-span-1 text-3xl'><FaYoutube /></a>
                        <a href="https://www.linkedin.com" target="_blank" className='inline col-span-1 text-3xl'><FaLinkedin /></a>
                        <a href="https://github.com" target="_blank" className='inline col-span-1 text-3xl'><FaGithub /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
