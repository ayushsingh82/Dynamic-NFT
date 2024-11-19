import { motion } from 'framer-motion'

function RewardsCard({ nft, rewards, onClaim }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">NFT #{nft.tokenId}</h3>
                <span className="text-purple-500 font-bold">{rewards} EDU</span>
            </div>
            <button
                onClick={() => onClaim(nft.tokenId)}
                className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors"
            >
                Claim Rewards
            </button>
        </motion.div>
    )
}

export default RewardsCard 