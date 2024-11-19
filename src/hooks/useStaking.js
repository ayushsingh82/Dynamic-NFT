import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import { NFTStakingABI } from '../contracts/abis/NFTStakingABI'
import { EDUTokenABI } from '../contracts/abis/EDUTokenABI'
import { useState, useEffect } from 'react'

const NFT_STAKING_ADDRESS = 'YOUR_STAKING_CONTRACT_ADDRESS'
const EDU_TOKEN_ADDRESS = 'YOUR_EDU_TOKEN_ADDRESS'

export function useStaking() {
    const { address } = useAccount()
    const [stakedNFTs, setStakedNFTs] = useState([])
    const [rewards, setRewards] = useState({})

    // Get staked NFTs
    const { data: stakedTokens } = useContractRead({
        address: NFT_STAKING_ADDRESS,
        abi: NFTStakingABI,
        functionName: 'getStakedTokens',
        args: [address],
        watch: true,
    })

    // Stake NFT
    const { write: stakeNFT } = useContractWrite({
        address: NFT_STAKING_ADDRESS,
        abi: NFTStakingABI,
        functionName: 'stake',
    })

    // Unstake NFT
    const { write: unstakeNFT } = useContractWrite({
        address: NFT_STAKING_ADDRESS,
        abi: NFTStakingABI,
        functionName: 'unstake',
    })

    // Claim rewards
    const { write: claimRewards } = useContractWrite({
        address: NFT_STAKING_ADDRESS,
        abi: NFTStakingABI,
        functionName: 'claimRewards',
    })

    // Calculate rewards for each staked NFT
    useEffect(() => {
        if (!stakedTokens || !address) return

        const fetchRewards = async () => {
            const newRewards = {}
            for (const tokenId of stakedTokens) {
                const reward = await calculateRewards(tokenId)
                newRewards[tokenId] = reward
            }
            setRewards(newRewards)
        }

        fetchRewards()
        const interval = setInterval(fetchRewards, 10000) // Update every 10 seconds

        return () => clearInterval(interval)
    }, [stakedTokens, address])

    return {
        stakedNFTs,
        rewards,
        stakeNFT,
        unstakeNFT,
        claimRewards,
    }
} 