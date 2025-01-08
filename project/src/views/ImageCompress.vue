<script setup>
import { ref } from 'vue'

const file = ref(null)
const compressedImage = ref(null)
const compressionLevel = ref(80)

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0]
  if (!uploadedFile) return
  
  if (!uploadedFile.type.startsWith('image/')) {
    alert('请选择有效的图片文件')
    return
  }
  
  file.value = uploadedFile
  compressImage(uploadedFile)
}

const compressImage = (imageFile) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.src = e.target.result
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // 保持原始宽高比
      const maxWidth = 800
      const scale = Math.min(maxWidth / img.width, 1)
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      canvas.toBlob((blob) => {
        compressedImage.value = URL.createObjectURL(blob)
      }, 'image/jpeg', compressionLevel.value / 100)
    }
  }
  reader.readAsDataURL(imageFile)
}

const downloadImage = () => {
  if (!compressedImage.value) return
  
  const link = document.createElement('a')
  link.href = compressedImage.value
  link.download = `compressed_${file.value.name}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="image-compress-container">
    <h1>图片压缩</h1>
    
    <div class="upload-section">
      <input 
        type="file" 
        accept="image/*"
        @change="handleFileUpload"
      >
    </div>

    <div v-if="compressedImage" class="preview-section">
      <h3>压缩结果预览</h3>
      <img :src="compressedImage" alt="压缩后的图片">
      <div class="controls">
        <label>
          压缩质量 ({{ compressionLevel }}%):
          <input
            type="range"
            min="10"
            max="100"
            v-model="compressionLevel"
            @input="compressImage(file)"
          >
        </label>
        <button @click="downloadImage">下载压缩图片</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-compress-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-section {
  margin: 20px 0;
}

.preview-section {
  margin-top: 30px;
}

.preview-section img {
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #40a9ff;
}

input[type="range"] {
  width: 300px;
  margin-left: 10px;
}
</style>
