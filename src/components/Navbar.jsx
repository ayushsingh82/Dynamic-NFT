import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            NFT Staking
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className={`transition-colors ${location.pathname === '/' ? 'text-purple-500' : 'text-white hover:text-purple-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/staking" 
              className={`transition-colors ${location.pathname === '/staking' ? 'text-purple-500' : 'text-white hover:text-purple-500'}`}
            >
              Staking
            </Link>
            <Link 
              to="/rewards" 
              className={`transition-colors ${location.pathname === '/rewards' ? 'text-purple-500' : 'text-white hover:text-purple-500'}`}
            >
              Rewards
            </Link>
          </nav>
        </div>
        <ConnectButton />
      </div>
    </header>
  )
}

export default Navbar 