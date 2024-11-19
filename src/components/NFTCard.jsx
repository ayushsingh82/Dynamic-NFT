import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

function NFTCard({ nft, action, onAction }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 flex flex-col">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
        <img
          src={nft?.image || 'placeholder.png'}
          alt={nft?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{nft?.name || 'NFT Name'}</h3>
          <p className="text-sm text-gray-400">#{nft?.tokenId}</p>
        </div>
        <button
          onClick={onAction}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
            action === 'stake'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {action === 'stake' ? (
            <>
              Stake
              <ArrowUpIcon className="w-4 h-4" />
            </>
          ) : (
            <>
              Unstake
              <ArrowDownIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTCard 