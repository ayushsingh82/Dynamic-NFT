import { WagmiConfig, createConfig } from 'wagmi'
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { 
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createPublicClient, http } from 'viem'
import '@rainbow-me/rainbowkit/styles.css'
import StakingDashboard from './components/StakingDashboard'

const projectId = 'e7fa7d19fd057ecd9403a0e89bd62b8b'

// Define Open Campus Codex Sepolia network
const openCampusCodex = {
  id: 656476,
  name: 'Open Campus Codex Sepolia',
  network: 'codex-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    public: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
    default: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.opencampus.xyz' },
  },
  testnet: true,
}

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains: [openCampusCodex] }),
      metaMaskWallet({ projectId, chains: [openCampusCodex] }),
      coinbaseWallet({ appName: 'NFT Staking Platform', chains: [openCampusCodex] }),
      walletConnectWallet({ projectId, chains: [openCampusCodex] }),
    ],
  },
])

const config = createConfig({
  connectors,
  publicClient: createPublicClient({
    chain: openCampusCodex,
    transport: http()
  }),
})

function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[openCampusCodex]}>
        <StakingDashboard />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App 