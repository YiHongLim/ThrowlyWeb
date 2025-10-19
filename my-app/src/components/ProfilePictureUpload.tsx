import React, { useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

interface ProfilePictureUploadProps {
  profilePic: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  size?: number;
  className?: string;
  disabled?: boolean;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  profilePic,
  onImageSelect,
  onImageRemove,
  size = 100,
  className = '',
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileSelect = (file: File) => {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Profile picture must be smaller than 5MB');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    
    onImageSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Clear the input so the same file can be selected again
    e.target.value = '';
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`
          relative cursor-pointer transition-all duration-300 ease-in-out
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${isDragOver ? 'scale-110 shadow-2xl' : 'hover:scale-105 hover:shadow-lg'}
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Perfect Circle Container */}
        <div
          className={`
            w-full h-full rounded-full border-3 transition-all duration-300 overflow-hidden
            ${isDragOver
              ? 'border-[#ff6f73] bg-gradient-to-br from-[#fff5f5] to-[#ffe8e8]'
              : profilePic
              ? 'border-gray-200 shadow-lg'
              : 'border-dashed border-gray-300 hover:border-[#ff6f73] hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100'
            }
          `}
          style={{
            aspectRatio: '1 / 1', // Ensures perfect circle
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {profilePic ? (
            <div className="relative w-full h-full">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  aspectRatio: '1 / 1', // Ensures perfect circle
                  borderRadius: '50%', // Force perfect circle
                }}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-all duration-200 shadow-lg"
                title="Remove photo"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <UserOutlined 
                style={{ 
                  fontSize: `${size * 0.9}px`, 
                  color: isDragOver ? '#ff6f73' : '#9CA3AF'
                }} 
              />
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          style={{ display: 'none' }}
          disabled={disabled}
        />
      </div>

      {/* Upload text */}
      <p className="text-sm text-gray-600 mt-3 font-medium">
        Profile Picture Upload
      </p>
    </div>
  );
};

export default ProfilePictureUpload;
