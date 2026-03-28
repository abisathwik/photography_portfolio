import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import type { GalleryImage } from '@/types';
import {
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Tag,
  X,
  Check,
  Search,
  Filter,
} from 'lucide-react';

const GalleryManager = () => {
  const {
    content,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
  } = useContent();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state for adding/editing
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    location: '',
    date: '',
    category: 'weddings',
    size: 'normal',
    src: '',
  });

  const filteredImages = content.gallery.images.filter((img) => {
    const matchesSearch =
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || img.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    if (formData.title && formData.src) {
      addGalleryImage({
        title: formData.title,
        location: formData.location || '',
        date: formData.date || '',
        category: (formData.category as 'weddings' | 'portraits' | 'editorial') || 'weddings',
        size: (formData.size as 'normal' | 'wide' | 'tall' | 'large') || 'normal',
        src: formData.src,
      });
      resetForm();
      setIsAdding(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData({ ...image });
  };

  const handleUpdate = () => {
    if (editingId && formData.title && formData.src) {
      updateGalleryImage(editingId, formData);
      setEditingId(null);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      date: '',
      category: 'weddings',
      size: 'normal',
      src: '',
    });
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-off-white mb-1">
            Gallery Manager
          </h2>
          <p className="text-off-white/60 text-sm">
            Manage your portfolio images. Total: {content.gallery.images.length} images
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-gold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-off-white/20 py-2 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent border border-off-white/20 py-2 pl-10 pr-8 text-off-white text-sm focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="all" className="bg-charcoal">All Categories</option>
            <option value="weddings" className="bg-charcoal">Weddings</option>
            <option value="portraits" className="bg-charcoal">Portraits</option>
            <option value="editorial" className="bg-charcoal">Editorial</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-charcoal/50 border border-gold/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-gold">
              {isAdding ? 'Add New Image' : 'Edit Image'}
            </h3>
            <button
              onClick={cancelEdit}
              className="text-off-white/50 hover:text-off-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Image URL *
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <input
                  type="text"
                  value={formData.src}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, src: e.target.value }))
                  }
                  placeholder="/your-image.jpg or https://..."
                  className="w-full bg-transparent border border-off-white/20 py-2 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[10px] text-off-white/40 mt-1">
                Upload images to the public folder and enter the path here
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Image title"
                className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="City, Country"
                  className="w-full bg-transparent border border-off-white/20 py-2 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  placeholder="Month Year"
                  className="w-full bg-transparent border border-off-white/20 py-2 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as 'weddings' | 'portraits' | 'editorial',
                    }))
                  }
                  className="w-full bg-transparent border border-off-white/20 py-2 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="weddings" className="bg-charcoal">Weddings</option>
                  <option value="portraits" className="bg-charcoal">Portraits</option>
                  <option value="editorial" className="bg-charcoal">Editorial</option>
                </select>
              </div>
            </div>

            {/* Size */}
            <div className="md:col-span-2">
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Grid Size
              </label>
              <div className="flex gap-3">
                {(['normal', 'wide', 'tall', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFormData((prev) => ({ ...prev, size }))}
                    className={`px-4 py-2 text-xs uppercase tracking-wide border transition-colors ${
                      formData.size === size
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-off-white/20 text-off-white/60 hover:border-off-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          {formData.src && (
            <div className="mt-4">
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Preview
              </label>
              <div className="w-48 h-32 border border-off-white/20 overflow-hidden">
                <img
                  src={formData.src}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={isAdding ? handleAdd : handleUpdate}
              className="btn-gold flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {isAdding ? 'Add Image' : 'Update Image'}
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border border-off-white/20 text-off-white/60 hover:text-off-white hover:border-off-white/40 transition-colors text-xs uppercase tracking-wide"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="bg-charcoal/50 border border-off-white/10">
        <div className="p-4 border-b border-off-white/10">
          <h3 className="font-display text-sm tracking-[0.1em] text-off-white">
            ALL IMAGES ({filteredImages.length})
          </h3>
        </div>

        <div className="divide-y divide-off-white/10">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="p-4 flex items-center gap-4 hover:bg-off-white/5 transition-colors"
            >
              {/* Drag Handle */}
              <div className="text-off-white/20 cursor-move">
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Thumbnail */}
              <div className="w-16 h-16 border border-off-white/20 overflow-hidden flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-off-white truncate">{image.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-off-white/50">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {image.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {image.date}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase ${
                      image.category === 'weddings'
                        ? 'bg-pink-500/20 text-pink-400'
                        : image.category === 'portraits'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {image.category}
                  </span>
                  <span className="text-off-white/30 uppercase">{image.size}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="p-2 text-off-white/50 hover:text-gold transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 text-off-white/50 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-off-white/20 mx-auto mb-4" />
            <p className="text-off-white/50">No images found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
