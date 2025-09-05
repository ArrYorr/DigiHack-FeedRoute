import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiUpload, FiCamera, FiX } from 'react-icons/fi';

function ProductUploadPage() {
  const navigate = useNavigate();

  // --- State for the form fields ---
  const [uploadedImages, setUploadedImages] = useState([]);
  const [category, setCategory] = useState('Fruits');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // --- Handlers ---
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages(prevImages => [...prevImages, ...filesArray]);
    }
  };
  
  const handleRemoveImage = (index) => {
    setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { category, title, description, images: uploadedImages.map(img => img.file.name) };
    console.log('Submitting Product:', formData);
    alert('Product submitted! Check the console for the data.');
  };

  return (
    <div className="p-4 pb-24">
      
      {/* MODIFIED: Header structure updated for perfect centering */}
      <div className="flex justify-between items-center mb-6">
        {/* Left container (fixed width) */}
        <div className="w-10">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            <IoIosArrowBack size={24} />
          </button>
        </div>
        
        {/* Title (will now be perfectly centered) */}
        <h1 className="font-bold text-lg">Product</h1>

        {/* Right container (same fixed width as the left) */}
        <div className="w-10 flex justify-end">
          <div className="relative">
            <FiBell size={24} className="text-gray-600" />
          </div>
        </div>
      </div>
      
      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center">
              <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">Upload your Products</p>
            </div>
            <input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
          </label>
          <div className="flex justify-end mt-2">
            <button type="button" className="flex items-center text-sm text-green-600 font-semibold">
              Take a short <FiCamera className="ml-2" />
            </button>
          </div>
        </div>

        {uploadedImages.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Uploads</h3>
            <div className="flex flex-wrap gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.preview} alt="upload preview" className="w-20 h-20 rounded-lg object-cover" />
                  <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md">
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Tubers</option>
              <option>Legumes</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title to this product"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a detailed description..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default ProductUploadPage;