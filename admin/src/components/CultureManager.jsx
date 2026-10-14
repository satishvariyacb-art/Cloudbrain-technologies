import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, Video as VideoIcon, Plus, Search, 
  Trash2, Edit3, Play, MapPin, Clock, X, ExternalLink, Sparkles,
  Upload, UploadCloud, CheckCircle2, Film, FileImage
} from 'lucide-react';

// Universal Video Embed Resolver (YouTube, Vimeo, or direct stream)
function getEmbedInfo(url) {
  if (!url) return null;
  const str = String(url).trim();

  const ytMatch = str.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      id: ytMatch[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
    };
  }

  const vimeoMatch = str.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      thumbnail: null
    };
  }

  return null;
}

export default function CultureManager({ 
  cultureItems = [], 
  onSaveItem, 
  onDeleteItem,
  isModalOpen,
  setIsModalOpen
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const [editingItem, setEditingItem] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Upload Modes ('file' or 'url')
  const [imageUploadMode, setImageUploadMode] = useState('file');
  const [videoUploadMode, setVideoUploadMode] = useState('file');
  const [isDetectingDuration, setIsDetectingDuration] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [formData, setFormData] = useState({
    type: 'photo',
    category: 'Photos',
    title: '',
    location: '',
    duration: '',
    image: '',
    poster: '',
    videoUrl: '',
    caption: '',
    showInShowcase: true,
    aspectRatio: 'landscape'
  });

  const categories = ['All', 'Photos', 'Video Showcases', 'Hackathons & Events'];

  const filteredItems = cultureItems.filter((item) => {
    const matchesSearch = 
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Format seconds into "M:SS min"
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs} min`;
  };

  // Auto-detect duration from video file or URL
  const detectVideoDuration = (videoSrc) => {
    if (!videoSrc) return;
    const embed = getEmbedInfo(videoSrc);
    if (embed) {
      setFormData(prev => ({
        ...prev,
        image: prev.image || embed.thumbnail || '',
        poster: prev.poster || embed.thumbnail || '',
        duration: prev.duration || 'Online Video'
      }));
      setIsDetectingDuration(false);
      return;
    }

    setIsDetectingDuration(true);
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = videoSrc;
    tempVideo.onloadedmetadata = () => {
      setIsDetectingDuration(false);
      const formatted = formatDuration(tempVideo.duration);
      if (formatted) {
        setFormData(prev => ({ ...prev, duration: formatted }));
      }
    };
    tempVideo.onerror = () => {
      setIsDetectingDuration(false);
    };
  };

  // Client-side image compression: converts 5MB-15MB raw photos down to ~250KB-400KB crisp images
  const compressImage = (file, maxWidth = 1600, quality = 0.85) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };
        img.onerror = () => resolve(event.target.result);
        img.src = event.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Handle Photo File Selection from Device
  const handlePhotoFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WEBP, etc.)');
      e.target.value = '';
      return;
    }

    try {
      const optimizedDataUrl = await compressImage(file, 1600, 0.82);
      setFormData(prev => ({
        ...prev,
        image: optimizedDataUrl,
        poster: prev.type === 'video' ? (prev.poster || optimizedDataUrl) : optimizedDataUrl
      }));
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setFormData(prev => ({
          ...prev,
          image: dataUrl,
          poster: prev.type === 'video' ? (prev.poster || dataUrl) : dataUrl
        }));
      };
      reader.readAsDataURL(file);
    } finally {
      if (e.target) e.target.value = '';
    }
  };

  // Handle Video File Selection from Device
  const handleVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a video file (MP4, WebM, MOV, etc.)');
      e.target.value = '';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('Video file size exceeds 15MB limit for direct upload. For larger videos, please choose "Paste URL" to stream from YouTube, Vimeo, or a video URL.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      detectVideoDuration(dataUrl);
      setFormData(prev => ({
        ...prev,
        videoUrl: dataUrl
      }));
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setImageUploadMode('file');
    setVideoUploadMode('file');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
    setFormData({
      type: 'photo',
      category: 'Photos',
      title: '',
      location: 'Main HQ Studio',
      duration: '',
      aspectRatio: 'landscape',
      image: '',
      poster: '',
      videoUrl: '',
      caption: '',
      showInShowcase: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setImageUploadMode(item.image?.startsWith('data:') ? 'file' : 'url');
    setVideoUploadMode(item.videoUrl?.startsWith('data:') ? 'file' : 'url');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
    setFormData({
      type: item.type || 'photo',
      category: item.category || 'Photos',
      title: item.title || '',
      location: item.location || '',
      duration: item.duration || '',
      aspectRatio: item.aspectRatio || 'landscape',
      image: item.image || '',
      poster: item.poster || item.image || '',
      videoUrl: item.videoUrl || '',
      caption: item.caption || '',
      showInShowcase: item.showInShowcase !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a title.');
      return;
    }

    if (formData.type === 'photo' && !formData.image) {
      alert('Please upload a photo from your device or paste an image URL.');
      return;
    }

    if (formData.type === 'video' && !formData.videoUrl && !formData.image) {
      alert('Please upload a video or poster image.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSaveItem({
        ...(editingItem ? { id: editingItem.id } : {}),
        ...formData,
        aspectRatio: formData.aspectRatio || 'landscape',
        showInShowcase: formData.showInShowcase !== false,
        image: formData.type === 'photo' ? formData.image : (formData.poster || formData.image),
        poster: formData.type === 'video' ? (formData.poster || formData.image) : formData.image
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving item:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}" from Life at CloudBrain gallery?`)) {
      onDeleteItem(id);
    }
  };

  return (
    <div className="cb-culture-manager">
      {/* Header */}
      <div className="cb-section-header-bar">
        <div className="cb-section-title-wrap">
          <h2>Life at Cloudbrain Media</h2>
          <p>Dynamically manage company culture photos, team videos, and event memories shown on the website.</p>
        </div>
        <div className="cb-section-actions">
          <button className="cb-btn cb-btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Media Item</span>
          </button>
        </div>
      </div>

      {/* Card Table / Grid */}
      <div className="cb-card">
        {/* Search & Filter Bar */}
        <div className="cb-filter-bar">
          <div className="cb-search-wrap">
            <Search size={16} className="cb-search-icon" />
            <input 
              type="text" 
              placeholder="Search by title, category, or caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select 
              className="cb-filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Formats</option>
              <option value="photo">Photos Only</option>
              <option value="video">Videos Only</option>
            </select>

            <select 
              className="cb-filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--admin-text-muted)' }}>
            <ImageIcon size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>No media found</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Add company event photos or demo videos to showcase on the culture page.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', padding: '1.25rem' }}>
            {filteredItems.map((item) => {
              const isVideo = item.type === 'video';
              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease'
                  }}
                >
                  {/* Thumbnail / Image Container */}
                  <div 
                    style={{
                      height: '160px',
                      background: '#0f172a',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => setPreviewMedia(item)}
                  >
                    <img 
                      src={item.image || item.poster || getEmbedInfo(item.videoUrl)?.thumbnail} 
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '0.35rem' }}>
                      <span className={`cb-badge ${isVideo ? 'pill-purple' : 'pill-blue'}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', backdropFilter: 'blur(4px)', background: isVideo ? 'rgba(139, 92, 246, 0.9)' : 'rgba(0, 102, 255, 0.9)', color: '#ffffff' }}>
                        {isVideo ? 'Video' : 'Photo'}
                      </span>
                    </div>

                    {isVideo && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.25)'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0066ff'
                        }}>
                          <Play size={18} fill="#0066ff" style={{ marginLeft: '2px' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0066ff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {item.category}
                      </span>
                      {item.duration && (
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Clock size={11} />
                          <span>{item.duration}</span>
                        </span>
                      )}
                    </div>

                    <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.92rem', fontWeight: 700, color: 'var(--admin-text-main)' }}>
                      {item.title}
                    </h4>

                    {item.location && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                        <MapPin size={11} />
                        <span>{item.location}</span>
                      </div>
                    )}

                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: '1.4', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.caption}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: '0.85rem' }}>
                      <button 
                        className="cb-btn cb-btn-secondary cb-btn-icon" 
                        onClick={() => handleOpenEdit(item)}
                        title="Edit Media"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button 
                        className="cb-btn cb-btn-secondary cb-btn-icon text-danger" 
                        onClick={() => handleDelete(item.id, item.title)}
                        title="Delete Media"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Add/Edit Media */}
      {isModalOpen && (
        <div className="cb-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cb-modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="cb-modal-header">
              <div>
                <h3 className="cb-modal-title">{editingItem ? 'Edit Media Item' : 'Add Culture Media'}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  Updates live immediately on the Life at Cloudbrain showcase.
                </p>
              </div>
              <button 
                className="cb-btn cb-btn-secondary cb-btn-icon" 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form 
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              <div 
                className="cb-modal-body" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  maxHeight: 'calc(85vh - 130px)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div className="cb-form-group">
                    <label className="cb-form-label">Media Type</label>
                    <select 
                      className="cb-form-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div className="cb-form-group">
                    <label className="cb-form-label">Category</label>
                    <select 
                      className="cb-form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Photos">Photos</option>
                      <option value="Video Showcases">Video Showcases</option>
                      <option value="Hackathons & Events">Hackathons & Events</option>
                      <option value="Team Summits">Team Summits</option>
                    </select>
                  </div>
                </div>

                <div className="cb-form-group">
                  <label className="cb-form-label">Title *</label>
                  <input 
                    type="text" 
                    className="cb-form-input"
                    placeholder="e.g. Annual CloudTech Hackathon 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Media Upload Section: Photo / Poster */}
                <div className="cb-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="cb-form-label" style={{ margin: 0 }}>
                      {formData.type === 'video' ? 'Video Cover / Poster Image *' : 'Photo File or Image *'}
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem', fontSize: '0.75rem' }}>
                      <button 
                        type="button" 
                        onClick={() => setImageUploadMode('file')}
                        style={{
                          background: imageUploadMode === 'file' ? 'var(--admin-accent, #3b82f6)' : 'transparent',
                          color: imageUploadMode === 'file' ? '#ffffff' : 'var(--admin-text-muted)',
                          border: '1px solid var(--admin-border)',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        Upload Device Photo
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setImageUploadMode('url')}
                        style={{
                          background: imageUploadMode === 'url' ? 'var(--admin-accent, #3b82f6)' : 'transparent',
                          color: imageUploadMode === 'url' ? '#ffffff' : 'var(--admin-text-muted)',
                          border: '1px solid var(--admin-border)',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        Paste URL
                      </button>
                    </div>
                  </div>

                  <input 
                    type="file" 
                    ref={imageInputRef} 
                    accept="image/*" 
                    onChange={handlePhotoFileSelect} 
                    style={{ display: 'none' }} 
                  />

                  {imageUploadMode === 'file' ? (
                    <div>
                      {formData.image ? (
                        <div style={{
                          position: 'relative',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid var(--admin-border)',
                          background: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.6rem'
                        }}>
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            style={{ width: '70px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-text)' }}>
                              Photo Selected
                            </p>
                            <p style={{ margin: 0, fontSize: '0.72rem', color: '#10b981' }}>
                              ✓ Ready to save
                            </p>
                          </div>
                          <button
                            type="button"
                            className="cb-btn cb-btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => imageInputRef.current?.click()}
                          >
                            Change Photo
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => imageInputRef.current?.click()}
                          style={{
                            border: '2px dashed var(--admin-border, #334155)',
                            borderRadius: '8px',
                            padding: '1.25rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.02)',
                            transition: 'border-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-accent, #3b82f6)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--admin-border, #334155)'}
                        >
                          <UploadCloud size={28} style={{ color: 'var(--admin-accent, #3b82f6)', margin: '0 auto 6px' }} />
                          <p style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--admin-text)' }}>
                            Click to upload photo from your device
                          </p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                            PNG, JPG, WEBP, or SVG
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input 
                      type="url" 
                      className="cb-form-input"
                      placeholder="https://images.unsplash.com/... or image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value, poster: e.target.value })}
                      required={!formData.image}
                    />
                  )}
                </div>

                {/* Video File / URL Section */}
                {formData.type === 'video' && (
                  <div className="cb-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <label className="cb-form-label" style={{ margin: 0 }}>
                        Video File / Stream
                      </label>
                      <div style={{ display: 'flex', gap: '0.35rem', fontSize: '0.75rem' }}>
                        <button 
                          type="button" 
                          onClick={() => setVideoUploadMode('file')}
                          style={{
                            background: videoUploadMode === 'file' ? 'var(--admin-accent, #3b82f6)' : 'transparent',
                            color: videoUploadMode === 'file' ? '#ffffff' : 'var(--admin-text-muted)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          Upload Video File
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setVideoUploadMode('url')}
                          style={{
                            background: videoUploadMode === 'url' ? 'var(--admin-accent, #3b82f6)' : 'transparent',
                            color: videoUploadMode === 'url' ? '#ffffff' : 'var(--admin-text-muted)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          Paste URL
                        </button>
                      </div>
                    </div>

                    <input 
                      type="file" 
                      ref={videoInputRef} 
                      accept="video/*" 
                      onChange={handleVideoFileSelect} 
                      style={{ display: 'none' }} 
                    />

                    {videoUploadMode === 'file' ? (
                      <div>
                        {formData.videoUrl ? (
                          <div style={{
                            position: 'relative',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid var(--admin-border)',
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.6rem'
                          }}>
                            <Film size={26} style={{ color: 'var(--admin-accent, #3b82f6)', marginLeft: '6px' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-text)' }}>
                                Video File Loaded
                              </p>
                              <p style={{ margin: 0, fontSize: '0.72rem', color: '#10b981' }}>
                                {formData.duration ? `✓ Auto-detected length: ${formData.duration}` : (isDetectingDuration ? 'Detecting duration...' : 'Duration calculated automatically')}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="cb-btn cb-btn-secondary"
                              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              onClick={() => videoInputRef.current?.click()}
                            >
                              Change Video
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => videoInputRef.current?.click()}
                            style={{
                              border: '2px dashed var(--admin-border, #334155)',
                              borderRadius: '8px',
                              padding: '1.25rem',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: 'rgba(255,255,255,0.02)',
                              transition: 'border-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-accent, #3b82f6)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--admin-border, #334155)'}
                          >
                            <UploadCloud size={28} style={{ color: 'var(--admin-accent, #3b82f6)', margin: '0 auto 6px' }} />
                            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--admin-text)' }}>
                              Click to choose video from your device
                            </p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                              MP4, WebM, MOV (Duration detected automatically)
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <input 
                          type="url" 
                          className="cb-form-input"
                          placeholder="https://assets.cloudbrain.tech/video.mp4"
                          value={formData.videoUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, videoUrl: val });
                            if (val) detectVideoDuration(val);
                          }}
                          onBlur={() => {
                            if (formData.videoUrl) detectVideoDuration(formData.videoUrl);
                          }}
                        />
                        {formData.duration && (
                          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#10b981' }}>
                            ✓ Auto-detected length: {formData.duration}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Video Orientation Selector */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <label className="cb-form-label" style={{ marginBottom: '0.4rem' }}>
                        Video Orientation (Player Mode)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, aspectRatio: 'landscape' })}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.65rem 0.75rem',
                            borderRadius: '8px',
                            border: (formData.aspectRatio !== 'portrait') ? '2px solid var(--admin-accent, #3b82f6)' : '1px solid var(--admin-border, #334155)',
                            background: (formData.aspectRatio !== 'portrait') ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.02)',
                            color: (formData.aspectRatio !== 'portrait') ? '#ffffff' : 'var(--admin-text-muted)',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <span style={{ fontSize: '1rem' }}>🖥️ Landscape</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.85 }}>16:9 Full Width</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, aspectRatio: 'portrait' })}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.65rem 0.75rem',
                            borderRadius: '8px',
                            border: (formData.aspectRatio === 'portrait') ? '2px solid var(--admin-accent, #3b82f6)' : '1px solid var(--admin-border, #334155)',
                            background: (formData.aspectRatio === 'portrait') ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.02)',
                            color: (formData.aspectRatio === 'portrait') ? '#ffffff' : 'var(--admin-text-muted)',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <span style={{ fontSize: '1rem' }}>📱 Portrait</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.85 }}>9:16 Full Height (Reel)</span>
                        </button>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', marginTop: '4px', display: 'block' }}>
                        {formData.aspectRatio === 'portrait' 
                          ? 'Vertical / Reel mode: Player full height me bina black side bars ke display hoga.' 
                          : 'Horizontal widescreen: Standard 16:9 full width cinematic display.'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="cb-form-group">
                  <label className="cb-form-label">Location</label>
                  <input 
                    type="text" 
                    className="cb-form-input"
                    placeholder="e.g. San Francisco HQ / Surat Innovation Lab"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                {/* Showcase Checkbox Toggle */}
                <div 
                  className="cb-form-group" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem 1rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px', 
                    border: '1px solid var(--admin-border)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setFormData({ ...formData, showInShowcase: formData.showInShowcase === false })}
                >
                  <input 
                    type="checkbox" 
                    id="showInShowcase" 
                    checked={formData.showInShowcase !== false} 
                    onChange={(e) => setFormData({ ...formData, showInShowcase: e.target.checked })} 
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--admin-accent, #3b82f6)' }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="showInShowcase" style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text)', cursor: 'pointer' }}>
                      Show in Life at Cloudbrain Top Showcase
                    </label>
                    <span style={{ fontSize: '0.74rem', color: 'var(--admin-text-muted)' }}>
                      Agar check hoga to yeh image upar scrolling showcase me dikhegi. Uncheck karne par sirf niche gallery me dikhegi.
                    </span>
                  </div>
                </div>

                <div className="cb-form-group">
                  <label className="cb-form-label">Caption / Story</label>
                  <textarea 
                    className="cb-form-textarea"
                    rows={3}
                    placeholder="Brief highlight of the moment, team, or achievement..."
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  />
                </div>
              </div>

              <div className="cb-modal-footer" style={{ flexShrink: 0 }}>
                <button 
                  type="button" 
                  className="cb-btn cb-btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="cb-btn cb-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving to Database...' : (editingItem ? 'Save Changes' : 'Add to Culture Gallery')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <div className="cb-modal-overlay" onClick={() => setPreviewMedia(null)}>
          <div 
            className="cb-modal-container" 
            style={{ 
              maxWidth: (previewMedia.type === 'video' && previewMedia.aspectRatio === 'portrait') ? '420px' : '720px', 
              padding: 0, 
              overflow: 'hidden',
              transition: 'max-width 0.25s ease'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ 
              position: 'relative', 
              background: '#000000', 
              height: (previewMedia.type === 'video' && previewMedia.aspectRatio === 'portrait') ? '560px' : '420px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <button 
                onClick={() => setPreviewMedia(null)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={18} />
              </button>

              {previewMedia.type === 'video' && previewMedia.videoUrl ? (
                getEmbedInfo(previewMedia.videoUrl) ? (
                  <iframe
                    src={getEmbedInfo(previewMedia.videoUrl).embedUrl}
                    title={previewMedia.title || "Video Preview"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none', 
                      display: 'block' 
                    }}
                  />
                ) : (
                  <video 
                    controls 
                    autoPlay 
                    src={previewMedia.videoUrl} 
                    poster={previewMedia.poster || previewMedia.image}
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: previewMedia.aspectRatio === 'portrait' ? 'contain' : 'cover'
                    }}
                  />
                )
              ) : (
                <img 
                  src={previewMedia.image || previewMedia.poster} 
                  alt={previewMedia.title}
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
                />
              )}
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span className="cb-badge pill-blue" style={{ fontSize: '0.72rem' }}>
                  {previewMedia.category} {previewMedia.aspectRatio === 'portrait' ? '• 📱 Portrait' : ''}
                </span>
                {previewMedia.location && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{previewMedia.location}</span>}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--admin-text-main)' }}>{previewMedia.title}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>{previewMedia.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
