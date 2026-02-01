import React from "react";
import { Rocket, Instagram, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.png"; // Ensure the path is correct

const Footer = () => {
  return (
    <footer className="relative bg-brand-black text-white py-20 px-4 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-6">
              {/* Replaced Icon with Logo Image */}
              <img
                src={logoImg}
                alt="Webautomy"
                className="h-12 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
            <p className="text-neutral-400 max-w-sm">
              We replace manual chaos with digital precision. <br />
              Specialized in high-ticket scaling for US & UK markets.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-neutral-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-brand-blue transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/work"
                  className="hover:text-brand-blue transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-brand-blue transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-blue transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-brand-blue transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-brand-blue transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Social */}
          <div>
            <h4 className="font-bold text-lg mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <SocialIcon
                href="https://www.linkedin.com/company/webautomy/"
                icon={<Linkedin size={20} />}
              />

              <SocialIcon
                href="https://www.instagram.com/webautomy/"
                icon={<Instagram size={20} />}
              />

              <SocialIcon
                href="https://x.com/webautomy"
                icon={<Twitter size={20} />}
              />
            </div>
            <p className="text-neutral-600 text-sm">
              Webautomy.
              <br />
              All rights reserved.
            </p>
            <p className="text-neutral-700 text-xs mt-2 border-t border-white/5 pt-2">
              WebAutomy is a proprietary firm registered under <br />
              MSME, Govt of India. <br />
              (UDYAM-MP-24-0090709) {/* Yahan apna number daal dena */}
            </p>
          </div>
        </div>

        {/* Big Text at Bottom */}
        <div className="border-t border-white/10 pt-8">
          <h1 className="text-[12vw] leading-none font-bold text-neutral-900 text-center select-none">
            WEBAUTOMY
          </h1>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-brand-blue hover:text-white hover:scale-110 transition-all duration-300 group"
    >
      {/* This ensures the icon inside inherits the hover color */}
      <span className="text-gray-400 group-hover:text-white transition-colors">
        {icon}
      </span>
    </a>
  );
};

export default Footer;
