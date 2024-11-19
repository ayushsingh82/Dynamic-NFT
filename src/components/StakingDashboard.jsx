import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead } from 'wagmi'
import NFTCard from './NFTCard'
import { useState, useEffect } from 'react'

function StakingDashboard() {
  const { address, isConnected } = useAccount()
  const [availableNFTs, setAvailableNFTs] = useState([])
  const [stakedNFTs, setStakedNFTs] = useState([])

  // Example contract read (you'll need to add your contract address and ABI)
  const { data: totalStaked } = useContractRead({
    address: 'YOUR_CONTRACT_ADDRESS',
    abi: ['function totalStaked() view returns (uint256)'],
    functionName: 'totalStaked',
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">NFT Staking</h1>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {!isConnected ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Connect your wallet to start staking</h2>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard title="Total Staked" value={`${totalStaked || 0} NFTs`} />
              <StatsCard title="Your Staked" value={`${stakedNFTs.length} NFTs`} />
              <StatsCard title="Rewards Available" value="0 $REWARD" />
            </div>

            {/* Staking Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Available to Stake */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Available to Stake</h2>
                <div className="grid grid-cols-2 gap-4">
                  {availableNFTs.map((nft) => (
                    <NFTCard
                      key={nft.tokenId}
                      nft={nft}
                      action="stake"
                      onAction={() => handleStake(nft.tokenId)}
                    />
                  ))}
                </div>
              </div>

              {/* Currently Staked */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Currently Staked</h2>
                <div className="grid grid-cols-2 gap-4">
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
          </>
        )}
      </main>
    </div>
  )
}

function StatsCard({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default StakingDashboard 