import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
    return(
        <>
        <nav className="h-16 left-0 w-full fixed top-0 z-50">
        <div className="bg-white/10 backdrop-blur-md shadow-xl px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl">DSA Visualizer</div>

            {/* <!-- Desktop Menu --> */}
            <div className="hidden sm:flex space-x-4 items-center">
              <Link to="/">
              <button
                className="cursor-pointer bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50 transition transform duration-400 hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/60"
              >
                Home
              </button>
              </Link>
              <a
                href="#data-structures"
                className="bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50 transition transform duration-400 hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/60"
              >
                Data Structures
              </a>
              <a
                href="#algorithms"
                className="bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50 transition transform duration-400 hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/60"
              >
                Algorithms
              </a>
              <a
                href="#classical-questions"
                className="bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50 transition transform duration-400 hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/60"
              >
                Classical Problems
              </a>
            </div>

            {/* <!-- Mobile Hamburger Icon --> */}
            <div className="sm:hidden">
              <button
                id="mobile-menu-button"
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                onClick={navBarToggle} >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Mobile Dropdown Menu --> */}
          <div
            id="mobile-menu"
            className="hidden sm:hidden flex-col space-y-2 mt-2 pb-4"
          >
            <Link to="/">
              <button
                className="cursor-pointer bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50 transition transform duration-400 hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/60"
              >
                Home
              </button>
              </Link>
            <a
              href="#"
              className="block text-white bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50"
            >
              Data Structures
            </a>
            <a
              href="#"
              className="block text-white bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50"
            >
              Algorithms
            </a>
            <a
              href="#"
              className="block text-white bg-white/10 px-3 py-2 rounded-md text-sm font-medium shadow-sm shadow-cyan-500/50"
            >
              classical Problems
            </a>
          </div>
        </div>
      </nav>
    </>
    )
};
function navBarToggle () {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}
export default Navbar;