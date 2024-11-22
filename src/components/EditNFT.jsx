import { useState } from 'react'
import Navbar from './Navbar'

function EditNFT() {
  const [selectedNFT, setSelectedNFT] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Edit Your NFT
          </h1>
          {/* Add NFT editing interface here */}
        </div>
      </div>
    </div>
  )
}

export default EditNFT 