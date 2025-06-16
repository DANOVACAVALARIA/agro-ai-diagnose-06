
import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Detectar se é mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Area - apenas no desktop */}
      {!isMobile && (
        <Card 
          className={`border-2 border-dashed transition-all duration-200 ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-green-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-12 text-center">
            <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Arraste e solte sua imagem aqui
            </h3>
            <p className="text-gray-500 mb-6">
              ou use os botões abaixo
            </p>
          </div>
        </Card>
      )}

      {/* Mobile Card */}
      {isMobile && (
        <Card className="border-2 border-gray-300">
          <div className="p-8 text-center">
            <Smartphone className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Análise de Plantas
            </h3>
            <p className="text-gray-500 mb-6">
              Use a câmera ou selecione uma foto da galeria
            </p>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camera Button */}
        <Button
          onClick={openCamera}
          size="lg"
          className="w-full bg-green-500 hover:bg-green-600 h-14"
        >
          <Camera className="mr-2 h-5 w-5" />
          {isMobile ? 'Abrir Câmera' : 'Usar Câmera'}
        </Button>

        {/* Gallery/File Button */}
        <Button
          onClick={openGallery}
          variant="outline"
          size="lg"
          className="w-full border-green-500 text-green-600 hover:bg-green-50 h-14"
        >
          <Upload className="mr-2 h-5 w-5" />
          {isMobile ? 'Galeria' : 'Selecionar Arquivo'}
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Dicas para uma boa foto:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use boa iluminação natural</li>
          <li>• Foque nas folhas afetadas</li>
          <li>• Mantenha a câmera estável</li>
          <li>• Evite sombras na planta</li>
          <li>• Enquadre bem a área problemática</li>
        </ul>
      </div>

      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        capture="environment"
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
