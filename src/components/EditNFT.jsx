import { useState, useRef } from 'react'
import Navbar from './Navbar'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'

function EditNFT() {
  const { address, isConnected } = useAccount()
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    image: null,
    attributes: []
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [imageAdjustments, setImageAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
  })

  const imageRef = useRef(null)

  const colorFilters = [
    { name: 'Original', filter: '' },
    { name: 'Cyberpunk', filter: 'hue-rotate(180deg) saturate(150%)' },
    { name: 'Vintage', filter: 'sepia(50%) contrast(90%)' },
    { name: 'Neon', filter: 'brightness(110%) saturate(150%) hue-rotate(30deg)' },
    { name: 'B&W', filter: 'grayscale(100%)' },
    { name: 'Purple', filter: 'hue-rotate(290deg) saturate(120%)' },
    { name: 'Golden', filter: 'sepia(50%) saturate(150%) brightness(110%)' },
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNftData({ ...nftData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setSelectedFilter(null)
        setImageAdjustments({
          brightness: 100,
          contrast: 100,
          saturation: 100,
          hue: 0,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }

  const handleAdjustmentChange = (type, value) => {
    setImageAdjustments(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const getImageStyle = () => {
    const adjustments = `brightness(${imageAdjustments.brightness}%) 
                        contrast(${imageAdjustments.contrast}%) 
                        saturate(${imageAdjustments.saturation}%) 
                        hue-rotate(${imageAdjustments.hue}deg)`
    return {
      filter: selectedFilter ? `${selectedFilter} ${adjustments}` : adjustments
    }
  }

  const handleAttributeAdd = () => {
    setNftData({
      ...nftData,
      attributes: [...nftData.attributes, { trait_type: '', value: '' }]
    })
  }

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...nftData.attributes]
    newAttributes[index] = { ...newAttributes[index], [field]: value }
    setNftData({ ...nftData, attributes: newAttributes })
  }

  const handleMint = async () => {
    // Add minting logic here
    console.log('Minting NFT:', nftData)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create & Edit NFT
          </h1>

          {!isConnected ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Connect your wallet to create NFTs</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* NFT Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
              >
                <h2 className="text-2xl font-bold mb-6">Preview</h2>
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-800 mb-4">
                  {previewImage ? (
                    <img
                      ref={imageRef}
                      src={previewImage}
                      alt="NFT Preview"
                      className="w-full h-full object-cover transition-all duration-300"
                      style={getImageStyle()}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image selected
                    </div>
                  )}
                </div>
                {previewImage && (
                  <div className="space-y-4">
                    {/* Color Filters */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Color Filters</h3>
                      <div className="flex flex-wrap gap-2">
                        {colorFilters.map((filter) => (
                          <button
                            key={filter.name}
                            onClick={() => handleFilterChange(filter.filter)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              selectedFilter === filter.filter
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Adjustments */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Adjustments</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm">Brightness</label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={imageAdjustments.brightness}
                            onChange={(e) => handleAdjustmentChange('brightness', e.target.value)}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-sm">Contrast</label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={imageAdjustments.contrast}
                            onChange={(e) => handleAdjustmentChange('contrast', e.target.value)}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-sm">Saturation</label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={imageAdjustments.saturation}
                            onChange={(e) => handleAdjustmentChange('saturation', e.target.value)}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-sm">Hue Rotate</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={imageAdjustments.hue}
                            onChange={(e) => handleAdjustmentChange('hue', e.target.value)}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2 mt-4">
                  <p className="font-bold text-xl">{nftData.name || 'Untitled NFT'}</p>
                  <p className="text-gray-400">{nftData.description || 'No description'}</p>
                </div>
              </motion.div>

              {/* NFT Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
              >
                <h2 className="text-2xl font-bold mb-6">NFT Details</h2>
                <form className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={nftData.name}
                      onChange={(e) => setNftData({ ...nftData, name: e.target.value })}
                      className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                      placeholder="Enter NFT name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={nftData.description}
                      onChange={(e) => setNftData({ ...nftData, description: e.target.value })}
                      className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700 focus:outline-none focus:border-purple-500 h-32"
                      placeholder="Enter NFT description"
                    />
                  </div>

                  {/* Attributes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Attributes</label>
                    {nftData.attributes.map((attr, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={attr.trait_type}
                          onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                          className="w-1/2 bg-gray-800 rounded-lg p-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                          placeholder="Trait"
                        />
                        <input
                          type="text"
                          value={attr.value}
                          onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                          className="w-1/2 bg-gray-800 rounded-lg p-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                          placeholder="Value"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAttributeAdd}
                      className="text-sm text-purple-500 hover:text-purple-400"
                    >
                      + Add Attribute
                    </button>
                  </div>

                  {/* Mint Button */}
                  <button
                    type="button"
                    onClick={handleMint}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    Mint NFT
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditNFT 