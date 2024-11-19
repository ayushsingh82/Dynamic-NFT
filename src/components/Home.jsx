import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRef } from 'react'
import { motion } from 'framer-motion'

function Home() {
  const aboutRef = useRef(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const featuredNFTs = [
    {
      id: 1,
      name: 'Cyber Kong #1',
      image: 'https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png',
      price: '2.5 ETH'
    },
    {
      id: 2,
      name: 'Bored Ape #2087',
      image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000',
      price: '3.2 ETH'
    },
    {
      id: 3,
      name: 'Doodle #8697',
      image: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&dpr=1&w=1000',
      price: '1.8 ETH'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              NFT Staking
            </h1>
            <nav className="hidden md:flex gap-6">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="hover:text-purple-500 transition-colors">Home</button>
              <button onClick={scrollToAbout} 
                className="hover:text-purple-500 transition-colors">About</button>
              <a href="#featured" className="hover:text-purple-500 transition-colors">Featured</a>
              <a href="/staking" className="hover:text-purple-500 transition-colors">Staking</a>
            </nav>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero Section with 3D NFT */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0"></div>
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="text-left md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Stake NFTs,<br />Earn Rewards
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Join the future of digital asset yield generation with our innovative NFT staking platform.
            </p>
            <a 
              href="/staking"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-lg font-bold hover:opacity-90 transition-opacity inline-block"
            >
              Start Staking
            </a>
          </div>
          <motion.div 
            className="md:w-1/2 relative"
            animate={{ 
              rotateY: [0, 10, 0],
              rotateX: [0, -10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png"
              alt="Featured NFT"
              className="w-[500px] h-[500px] object-cover rounded-2xl shadow-2xl shadow-purple-500/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured NFTs Section */}
      <section id="featured" className="py-20 bg-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNFTs.map((nft) => (
              <motion.div
                key={nft.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
              >
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-2">{nft.name}</h3>
                    <p className="text-purple-400">{nft.price}</p>
                    <button className="mt-4 bg-purple-500/80 hover:bg-purple-600/80 px-4 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
            >
              <h3 className="text-4xl font-bold mb-2">100K+</h3>
              <p className="text-gray-400">Total NFTs Staked</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
            >
              <h3 className="text-4xl font-bold mb-2">$5M+</h3>
              <p className="text-gray-400">Total Rewards Distributed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
            >
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-gray-400">Active Stakers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">High APY Returns</h3>
                  <p className="text-gray-300">Earn up to 25% APY on your staked NFTs with our innovative reward system.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Secure Platform</h3>
                  <p className="text-gray-300">Built on secure smart contracts with regular audits and insurance coverage.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                  <p className="text-gray-300">Join a thriving community of NFT enthusiasts and earn together.</p>
                </div>
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000"
                  alt="About"
                  className="rounded-2xl shadow-2xl shadow-purple-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                NFT Staking
              </h3>
              <p className="text-gray-400">The future of NFT yield generation.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Home</a></li>
                <li><button onClick={scrollToAbout} className="text-gray-400 hover:text-purple-500 transition-colors">About</button></li>
                <li><a href="#featured" className="text-gray-400 hover:text-purple-500 transition-colors">Featured</a></li>
                <li><a href="/staking" className="text-gray-400 hover:text-purple-500 transition-colors">Staking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Telegram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest news</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 