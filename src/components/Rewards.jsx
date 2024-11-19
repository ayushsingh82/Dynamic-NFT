import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

function Rewards() {
  const { isConnected } = useAccount()

  const rewardsData = {
    available: "1,234.56",
    claimed: "5,678.90",
    apr: "25%",
    nextReward: "12:34:56"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Rewards Dashboard
          </h1>

          {!isConnected ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Connect your wallet to view rewards</h2>
              <ConnectButton />
            </div>
          ) : (
            <>
              {/* Rewards Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
                >
                  <h3 className="text-gray-400 mb-2">Available Rewards</h3>
                  <p className="text-3xl font-bold text-purple-500">{rewardsData.available} $REWARD</p>
                  <button className="mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors w-full">
                    Claim Rewards
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
                >
                  <h3 className="text-gray-400 mb-2">Total Claimed</h3>
                  <p className="text-3xl font-bold">{rewardsData.claimed} $REWARD</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
                >
                  <h3 className="text-gray-400 mb-2">Current APR</h3>
                  <p className="text-3xl font-bold text-green-500">{rewardsData.apr}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
                >
                  <h3 className="text-gray-400 mb-2">Next Reward In</h3>
                  <p className="text-3xl font-bold">{rewardsData.nextReward}</p>
                </motion.div>
              </div>

              {/* Rewards History */}
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6">Rewards History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-purple-500/20">
                        <th className="pb-4 px-4">Date</th>
                        <th className="pb-4 px-4">Amount</th>
                        <th className="pb-4 px-4">Type</th>
                        <th className="pb-4 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr key={item} className="border-b border-purple-500/10">
                          <td className="py-4 px-4">2024-03-{item}</td>
                          <td className="py-4 px-4">100.00 $REWARD</td>
                          <td className="py-4 px-4">Staking Reward</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                              Claimed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Rewards 