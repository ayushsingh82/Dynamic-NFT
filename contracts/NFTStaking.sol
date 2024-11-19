// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTStaking is ReentrancyGuard, Ownable {
    // Staking token (NFT) address
    IERC721 public nftToken;
    // Reward token (EDU) address
    IERC20 public eduToken;
    
    // Reward rate (tokens per second)
    uint256 public rewardRate = 1e17; // 0.1 EDU per second
    
    struct Stake {
        uint256 tokenId;
        uint256 timestamp;
        address owner;
    }

    // Mapping of token ID to stake info
    mapping(uint256 => Stake) public stakes;
    // Mapping of user address to staked token IDs
    mapping(address => uint256[]) public stakedTokens;
    
    event NFTStaked(address owner, uint256 tokenId, uint256 timestamp);
    event NFTUnstaked(address owner, uint256 tokenId, uint256 timestamp);
    event RewardsClaimed(address owner, uint256 amount);

    constructor(address _nftToken, address _eduToken) Ownable(msg.sender) {
        nftToken = IERC721(_nftToken);
        eduToken = IERC20(_eduToken);
    }

    function stake(uint256 tokenId) external nonReentrant {
        require(nftToken.ownerOf(tokenId) == msg.sender, "Not token owner");
        
        // Transfer NFT to contract
        nftToken.transferFrom(msg.sender, address(this), tokenId);
        
        // Record stake
        stakes[tokenId] = Stake({
            tokenId: tokenId,
            timestamp: block.timestamp,
            owner: msg.sender
        });
        
        stakedTokens[msg.sender].push(tokenId);
        
        emit NFTStaked(msg.sender, tokenId, block.timestamp);
    }

    function unstake(uint256 tokenId) external nonReentrant {
        Stake memory stakeInfo = stakes[tokenId];
        require(stakeInfo.owner == msg.sender, "Not stake owner");
        
        // Calculate and transfer rewards
        uint256 reward = calculateRewards(tokenId);
        if (reward > 0) {
            eduToken.transfer(msg.sender, reward);
            emit RewardsClaimed(msg.sender, reward);
        }
        
        // Transfer NFT back to owner
        nftToken.transferFrom(address(this), msg.sender, tokenId);
        
        // Remove stake
        delete stakes[tokenId];
        _removeTokenFromStakedList(msg.sender, tokenId);
        
        emit NFTUnstaked(msg.sender, tokenId, block.timestamp);
    }

    function claimRewards(uint256 tokenId) external nonReentrant {
        Stake memory stakeInfo = stakes[tokenId];
        require(stakeInfo.owner == msg.sender, "Not stake owner");
        
        uint256 reward = calculateRewards(tokenId);
        require(reward > 0, "No rewards to claim");
        
        // Update stake timestamp
        stakes[tokenId].timestamp = block.timestamp;
        
        // Transfer rewards
        eduToken.transfer(msg.sender, reward);
        
        emit RewardsClaimed(msg.sender, reward);
    }

    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        Stake memory stakeInfo = stakes[tokenId];
        if (stakeInfo.timestamp == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - stakeInfo.timestamp;
        return timeElapsed * rewardRate;
    }

    function getStakedTokens(address owner) external view returns (uint256[] memory) {
        return stakedTokens[owner];
    }

    function _removeTokenFromStakedList(address owner, uint256 tokenId) internal {
        uint256[] storage tokens = stakedTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }

    // Admin functions
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }

    function withdrawEDU(uint256 amount) external onlyOwner {
        eduToken.transfer(owner(), amount);
    }
} 