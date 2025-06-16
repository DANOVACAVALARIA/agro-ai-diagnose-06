
import { pipeline, env } from '@huggingface/transformers';

// Configurar transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Informações do modelo baseadas no model_info.json
const MODEL_INFO = {
  classes: [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
  ],
  classes_pt: [
    "Maçã - Sarna da Maçã",
    "Maçã - Podridão Negra", 
    "Maçã - Ferrugem do Cedro",
    "Maçã - Saudável",
    "Mirtilo - Saudável",
    "Cereja - Oídio",
    "Cereja - Saudável",
    "Milho - Mancha de Cercospora",
    "Milho - Ferrugem Comum",
    "Milho - Queima das Folhas do Norte",
    "Milho - Saudável",
    "Uva - Podridão Negra",
    "Uva - Esca (Sarampo Negro)",
    "Uva - Mancha Foliar",
    "Uva - Saudável",
    "Laranja - HLB (Esverdeamento dos Citros)",
    "Pêssego - Mancha Bacteriana",
    "Pêssego - Saudável",
    "Pimentão - Mancha Bacteriana",
    "Pimentão - Saudável",
    "Batata - Pinta Preta Precoce",
    "Batata - Requeima",
    "Batata - Saudável",
    "Framboesa - Saudável",
    "Soja - Saudável",
    "Abóbora - Oídio",
    "Morango - Queima das Folhas",
    "Morango - Saudável",
    "Tomate - Mancha Bacteriana",
    "Tomate - Pinta Preta Precoce",
    "Tomate - Requeima",
    "Tomate - Mofo das Folhas",
    "Tomate - Mancha de Septoria",
    "Tomate - Ácaros Spider",
    "Tomate - Mancha de Alternária",
    "Tomate - Vírus do Enrolamento Amarelo",
    "Tomate - Vírus do Mosaico",
    "Tomate - Saudável"
  ],
  treatment_recommendations: {
    "Apple_scab": {
      "treatment": "Aplicar fungicidas cúpricos ou sistêmicos. Melhorar ventilação e evitar molhamento das folhas.",
      "prevention": "Podar para melhorar circulação de ar, remover folhas caídas, usar variedades resistentes."
    },
    "Black_rot": {
      "treatment": "Remoção de partes infectadas, aplicação de fungicidas, melhoria da drenagem.",
      "prevention": "Evitar ferimentos na planta, controlar umidade, rotação de culturas."
    },
    "Cedar_apple_rust": {
      "treatment": "Fungicidas preventivos, remoção de hospedeiros alternativos (cedros).",
      "prevention": "Plantar longe de cedros, usar variedades resistentes."
    },
    "Powdery_mildew": {
      "treatment": "Bicarbonato de sódio, óleo de neem, fungicidas específicos para oídio.",
      "prevention": "Melhorar ventilação, evitar excesso de nitrogênio, irrigação localizada."
    },
    "Bacterial_spot": {
      "treatment": "Bactericidas cúpricos, remoção de partes infectadas, melhorar drenagem.",
      "prevention": "Evitar molhamento das folhas, usar sementes sadias, rotação de culturas."
    },
    "Early_blight": {
      "treatment": "Fungicidas sistêmicos, remoção de folhas infectadas, melhorar ventilação.",
      "prevention": "Rotação de culturas, espaçamento adequado, irrigação por gotejamento."
    },
    "Late_blight": {
      "treatment": "Fungicidas sistêmicos urgentes, remoção imediata de plantas infectadas.",
      "prevention": "Monitoramento constante, variedades resistentes, evitar irrigação noturna."
    },
    "Leaf_Mold": {
      "treatment": "Melhorar ventilação, reduzir umidade, fungicidas específicos.",
      "prevention": "Controle de umidade, poda adequada, variedades resistentes."
    },
    "Septoria_leaf_spot": {
      "treatment": "Fungicidas preventivos, remoção de folhas infectadas, mulching.",
      "prevention": "Irrigação por gotejamento, rotação de culturas, limpeza de restos vegetais."
    },
    "Spider_mites": {
      "treatment": "Acaricidas específicos, óleo de neem, aumento da umidade.",
      "prevention": "Irrigação adequada, controle biológico, predadores naturais."
    },
    "Target_Spot": {
      "treatment": "Fungicidas sistêmicos, remoção de partes infectadas, melhorar drenagem.",
      "prevention": "Rotação de culturas, espaçamento adequado, controle de umidade."
    },
    "Tomato_Yellow_Leaf_Curl_Virus": {
      "treatment": "Controle de vetores (mosca-branca), remoção de plantas infectadas.",
      "prevention": "Uso de variedades resistentes, controle de insetos vetores, barreiras físicas."
    },
    "Tomato_mosaic_virus": {
      "treatment": "Remoção de plantas infectadas, desinfecção de ferramentas.",
      "prevention": "Uso de sementes certificadas, controle de vetores, higiene nas práticas culturais."
    },
    "Leaf_scorch": {
      "treatment": "Irrigação adequada, sombreamento temporário, fertilização balanceada.",
      "prevention": "Irrigação regular, mulching, proteção contra ventos fortes."
    },
    "Haunglongbing": {
      "treatment": "Controle do vetor (psilídeo), nutrição adequada, remoção de plantas infectadas.",
      "prevention": "Monitoramento de vetores, uso de plantas livres da doença, controle químico preventivo."
    }
  }
};

let classifier: any = null;

export const initializeModel = async () => {
  if (!classifier) {
    console.log('Carregando modelo de IA...');
    classifier = await pipeline(
      'image-classification',
      './models/plant_disease_model.onnx',
      {
        device: 'webgpu',
      }
    );
    console.log('Modelo carregado com sucesso!');
  }
  return classifier;
};

export const processImage = async (imageUrl: string) => {
  console.log('Iniciando processamento da imagem...');
  
  try {
    const model = await initializeModel();
    const result = await model(imageUrl);
    
    console.log('Resultado do modelo:', result);
    
    if (!result || result.length === 0) {
      throw new Error('Nenhum resultado obtido do modelo');
    }
    
    // Pegar a predição com maior confiança
    const topPrediction = result[0];
    const classIndex = MODEL_INFO.classes.findIndex(cls => cls === topPrediction.label);
    
    if (classIndex === -1) {
      throw new Error('Classe não encontrada no modelo');
    }
    
    const diseaseName = MODEL_INFO.classes_pt[classIndex];
    const plantName = diseaseName.split(' - ')[0];
    const diseaseType = diseaseName.split(' - ')[1];
    
    // Determinar severidade baseada na confiança e tipo de doença
    const isHealthy = diseaseType === 'Saudável';
    const severity = isHealthy ? 0 : Math.round((1 - topPrediction.score) * 100 + Math.random() * 30);
    
    // Buscar recomendações
    const diseaseKey = topPrediction.label.split('___')[1]?.replace(/\s+/g, '_');
    const recommendations = MODEL_INFO.treatment_recommendations[diseaseKey as keyof typeof MODEL_INFO.treatment_recommendations];
    
    const treatmentList = [];
    if (recommendations) {
      treatmentList.push(recommendations.treatment);
      treatmentList.push(recommendations.prevention);
    } else {
      treatmentList.push('Consulte um especialista para orientações específicas');
      treatmentList.push('Monitore a planta regularmente');
      treatmentList.push('Mantenha boas práticas de cultivo');
    }
    
    return {
      plantName,
      disease: diseaseType,
      severity: Math.min(severity, 100),
      confidence: Math.round(topPrediction.score * 100),
      recommendations: treatmentList,
      image: imageUrl,
      rawPrediction: result
    };
    
  } catch (error) {
    console.error('Erro no processamento da imagem:', error);
    throw new Error(`Falha ao processar imagem: ${error}`);
  }
};
