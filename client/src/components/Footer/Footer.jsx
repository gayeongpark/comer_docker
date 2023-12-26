import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div>
        <div className="flex justify-between mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 border-b">
          <div className="max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md">
              Comer
            </h1>
            <nav>
              <p className="mb-3 font-light cursor-pointer">About</p>
              <p className="mb-3 font-light cursor-pointer">Newsroom</p>
              <p className="mb-3 font-light cursor-pointer">Careers</p>
            </nav>
          </div>
          <div className="max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md">
              Hosting
            </h1>
            <nav>
              <p className="mb-3 font-light cursor-pointer">
                Explore how to make experiences
              </p>
              <p className="mb-3 font-light cursor-pointer">Host resources</p>
              <p className="mb-3 font-light cursor-pointer">
                Host community forum
              </p>
            </nav>
          </div>
          <div className="max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md">
              Support
            </h1>
            <nav>
              <p className="mb-3 font-light cursor-pointer">Help center</p>
              <p className="mb-3 font-light cursor-pointer">
                Cancellation options
              </p>
              <p className="mb-3 font-light cursor-pointer">Report concerns</p>
            </nav>
          </div>
        </div>
        <div className="flex flex-col justify-between mx-auto max-w-2xl px-4 py-3 sm:flex-row sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="flex gap-3">
            <div>© 2023 Comer, Inc</div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div>·</div>
              <span className="sm:hidden">Terms</span>
              <span className="hidden sm:inline">Terms &amp; Conditions</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div>·</div>
              <span className="sm:hidden">Privacy</span>
              <span className="hidden sm:inline">Privacy Policy</span>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 sm:justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-3 cursor-pointer">
                <GrLanguage />
                <span className="sm:hidden">Lang</span>
                <span className="hidden sm:inline">Language</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer">
                <GrCurrency />
                <span className="sm:hidden">Curr</span>
                <span className="hidden sm:inline">Currency</span>
              </div>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
