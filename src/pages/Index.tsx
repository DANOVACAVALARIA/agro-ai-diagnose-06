
import React, { useState } from 'react';
import { Camera, Upload, FileText, History, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import DiagnosisResult from '@/components/DiagnosisResult';
import DiagnosisHistory from '@/components/DiagnosisHistory';
import { processImage } from '@/utils/imageProcessor';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, processing, diagnosis, history
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setCurrentStep('processing');
    setError(null);

    try {
      console.log('Processando imagem com IA...');
      const result = await processImage(imageUrl);
      console.log('Resultado do diagnóstico:', result);
      
      setDiagnosisData(result);
      setCurrentStep('diagnosis');
    } catch (error) {
      console.error('Erro no diagnóstico:', error);
      setError('Erro ao processar a imagem. Tente novamente.');
      setCurrentStep('upload');
    }
  };

  const resetFlow = () => {
    setCurrentStep('upload');
    setSelectedImage(null);
    setDiagnosisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">agro.IA</h1>
                <p className="text-sm text-gray-600">Diagnóstico Inteligente de Plantas</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentStep('history')}
              className="flex items-center space-x-2"
            >
              <History className="h-4 w-4" />
              <span>Histórico</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">❌ Erro</h4>
              <p className="text-sm text-red-800">{error}</p>
              <Button 
                onClick={resetFlow}
                className="mt-3 bg-red-500 hover:bg-red-600"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Diagnosticar Planta</CardTitle>
                <p className="text-green-100">
                  Tire uma foto da sua planta para análise com IA
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <ImageUpload onImageSelected={handleImageSelected} />
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'processing' && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardContent className="p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analisando sua planta...
                </h3>
                <p className="text-gray-600 mb-4">
                  Nossa IA está processando a imagem para identificar possíveis problemas
                </p>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Imagem sendo processada"
                    className="w-32 h-32 object-cover rounded-lg mx-auto opacity-75"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'diagnosis' && diagnosisData && (
          <div className="max-w-4xl mx-auto">
            <DiagnosisResult
              diagnosis={diagnosisData}
              onNewDiagnosis={resetFlow}
            />
          </div>
        )}

        {currentStep === 'history' && (
          <div className="max-w-6xl mx-auto">
            <DiagnosisHistory onBack={() => setCurrentStep('upload')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 agro.IA - Tecnologia a serviço da agricultura
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Diagnóstico inteligente com IA para plantas e cultivos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
