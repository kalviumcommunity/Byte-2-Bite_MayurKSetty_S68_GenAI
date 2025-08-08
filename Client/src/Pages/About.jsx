import React from "react";
import { FaUtensils, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../assets/Byte-2-Bite.png";
import profilePic from "../assets/ProfileFigma.png";

const palette = {
  bg: "bg-gradient-to-br from-[#fffbe9] via-[#ffe5b4] to-[#ffd6e0]",
  header: "text-[#ff7043]",
  sectionTitle:
    "text-[#ff7043] font-bold text-2xl mb-4 flex items-center gap-2",
  card: "bg-white/90 rounded-2xl shadow-lg p-8 mb-8",
  icon: "text-[#ff7043]",
  divider: "border-t border-[#ffd6e0] my-8",
  link: "hover:text-[#ff7043] transition-colors",
};

const creator = {
  name: "Mayur K Setty",
  description:
    "Hi! I'm Mayur, the creator of Byte-2-Bite. I'm passionate about blending technology and culinary arts to make cooking fun, accessible, and creative for everyone.",
  linkedin: "https://www.linkedin.com/in/mayurksetty",
  instagram: "https://www.instagram.com/mayura.jpg",
};

function About() {
  return (
    <div className={`min-h-screen flex flex-col ${palette.bg}`}>
      {/* Spacer for Navbar */}
      <div className="h-48" />
      <main className="flex-1 flex flex-col items-center px-4">
        <div className="w-full max-w-3xl flex flex-col gap-12">
          {/* About App Section */}
          <div
            className={`${palette.card} flex flex-col md:flex-row items-center md:items-center gap-8`}
          >
            <div className="flex-1 flex flex-col items-center">
              <h1
                className={`text-4xl font-extrabold ${palette.header} drop-shadow flex items-center gap-2 mb-2`}
              >
                <FaUtensils className={palette.icon} /> About Byte-2-Bite
              </h1>
              <p className="text-lg text-[#6d4c41] text-center max-w-xl mb-2">
                Byte-2-Bite is your AI-powered culinary companion. Whether
                you're a beginner or a seasoned chef, our platform helps you
                discover new recipes, get instant cooking advice, and make every
                meal an adventure. Powered by advanced AI, Byte-2-Bite brings
                creativity, convenience, and fun to your kitchen.
              </p>
            </div>
          </div>
          <div className={palette.divider}></div>
          {/* About the Creator Section */}
          <div
            className={`${palette.card} flex flex-col md:flex-row items-center gap-8`}
            id="about-creator"
          >
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src={profilePic}
                alt="Mayur K Setty"
                className="w-28 h-28 rounded-full shadow-lg border-4 border-[#ffe5b4] object-cover mb-2"
                style={{ objectPosition: "center top" }}
              />
              <div className="mt-2 text-[#a1887f] text-base font-semibold">
                {creator.name}
              </div>
              <div className="flex gap-4 mt-3">
                <a
                  href={creator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={palette.link}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-3xl hover:scale-110 transition-transform" />
                </a>
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={palette.link}
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-3xl hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start">
              <h2 className={palette.sectionTitle}>About the Creator</h2>
              <p className="text-md text-[#6d4c41] text-center md:text-left">
                {creator.description}
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="mt-8 mb-4 text-center">
        <p className="text-sm text-[#a1887f]">
          © {new Date().getFullYear()} Byte-2-Bite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default About;
