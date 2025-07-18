"use client";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Add email logic here
  };

  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100 text-gray-700 pt-16 pb-8 px-6 md:px-16">
      {/* Top Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <h1 className="text-green-700 font-bold">Green Busket</h1>
          <p className="text-sm text-gray-600">
            FreshMart is your one-stop destination for fresh vegetables, organic
            meat, and everyday essentials delivered with care.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <SlLocationPin className="text-green-600" />
              Gulshan, Dhaka 1212
            </p>
            <p className="flex items-center gap-2">
              <LuPhoneCall className="text-green-600" />
              01625262932
            </p>
            <p className="flex items-center gap-2">
              <MdOutlineEmail className="text-green-600" />
              info@freshmart.com
            </p>
          </div>
        </div>

        {/* Explore Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-800">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-green-600">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-green-600">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-green-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-800">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-green-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-green-600">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-green-600">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/privacyPolicy" className="hover:text-green-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/TermsConditions" className="hover:text-green-600">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-800">Stay Updated</h3>
          <p className="text-sm text-gray-600">
            Subscribe to get the freshest updates, discounts & news!
          </p>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full p-3 rounded-md border border-green-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-3 pt-4">
            <Link
              href="#"
              className="text-green-700 hover:text-white bg-green-100 hover:bg-green-600 p-2 rounded-full"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              className="text-green-700 hover:text-white bg-green-100 hover:bg-green-600 p-2 rounded-full"
            >
              <FaTwitter />
            </Link>
            <Link
              href="#"
              className="text-green-700 hover:text-white bg-green-100 hover:bg-green-600 p-2 rounded-full"
            >
              <FaYoutube />
            </Link>
            <Link
              href="#"
              className="text-green-700 hover:text-white bg-green-100 hover:bg-green-600 p-2 rounded-full"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-green-200"></div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2024 FreshMart. Crafted by FarseIT.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacyPolicy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/TermsConditions" className="hover:underline">
            Terms
          </Link>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
