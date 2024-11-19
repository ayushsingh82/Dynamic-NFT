import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead } from 'wagmi'
import NFTCard from './NFTCard'
import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { useStaking } from '../hooks/useStaking'

function StakingDashboard() {
  const { address, isConnected } = useAccount()
  const { stakedNFTs, rewards, stakeNFT, unstakeNFT, claimRewards } = useStaking()
  const aboutRef = useRef(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Sample NFT data for demonstration
  const sampleNFTs = [
    { id: 1, name: 'Cyber Ape #1', image: 'https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png' },
    { id: 2, name: 'Cyber Ape #2', image: 'https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png' },
    { id: 3, name: 'Cyber Ape #3', image: 'https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png' },
  ]

  const handleStake = async (tokenId) => {
    try {
      await stakeNFT({ args: [tokenId] })
    } catch (error) {
      console.error('Error staking NFT:', error)
    }
  }

  const handleUnstake = async (tokenId) => {
    try {
      await unstakeNFT({ args: [tokenId] })
    } catch (error) {
      console.error('Error unstaking NFT:', error)
    }
  }

  const handleClaim = async (tokenId) => {
    try {
      await claimRewards({ args: [tokenId] })
    } catch (error) {
      console.error('Error claiming rewards:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stake Your NFTs
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Earn rewards by staking your NFTs in our platform. Join the future of digital asset yield generation.
          </p>
          {!isConnected && (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Connect Wallet to Start
                </button>
              )}
            </ConnectButton.Custom>
          )}
        </div>
      </section>

      {/* Featured NFTs Section */}
      <section id="featured" className="py-20 bg-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleNFTs.map((nft) => (
              <div key={nft.id} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{nft.name}</h3>
                    <p className="text-gray-300">Stake to earn rewards</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Our Platform
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Secure Staking</h3>
                  <p className="text-gray-300">Our platform ensures your NFTs are safely staked using industry-leading security measures.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
                  <p className="text-gray-300">Stake your NFTs to earn daily rewards in our native token.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Community First</h3>
                  <p className="text-gray-300">Join our thriving community of NFT stakers and earn together.</p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://i.seadn.io/gcs/files/c49d2493f2ef4a40a5306fdf1f5c6b43.png" 
                  alt="About"
                  className="rounded-2xl shadow-2xl shadow-purple-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {isConnected && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsCard
                title="Total Staked"
                value="0 NFTs"
                description="Total NFTs staked in the platform"
              />
              <StatsCard
                title="Your Staked"
                value={`${stakedNFTs.length} NFTs`}
                description="Your currently staked NFTs"
              />
              <StatsCard
                title="Rewards Available"
                value="0 $REWARD"
                description="Your unclaimed rewards"
              />
            </div>
          </div>
        </section>
      )}

      {/* Staking Section */}
      {isConnected && (
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Available to Stake */}
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Available to Stake
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleNFTs.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      action="stake"
                      onAction={() => handleStake(nft.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Currently Staked */}
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Currently Staked
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stakedNFTs.map((nft) => (
                    <NFTCard
                      key={nft.tokenId}
                      nft={nft}
                      action="unstake"
                      onAction={() => handleUnstake(nft.tokenId)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black/90 border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Discord</a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatsCard({ title, value, description }) {
  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export default StakingDashboard 