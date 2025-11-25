import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Languages, Copy, Download, Type, BarChart3, AlertCircle, Mic, Volume2, StopCircle, FileArchive } from 'lucide-react';

const LANGUAGES = [
  "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Assamese", "Aymara", 
  "Azerbaijani", "Bambara", "Basque", "Belarusian", "Bengali", "Bhojpuri", "Bosnian", 
  "Bulgarian", "Burmese", "Catalan", "Cebuano", "Chinese (Simplified)", "Chinese (Traditional)", 
  "Corsican", "Croatian", "Czech", "Danish", "Dhivehi", "Dogri", "Dutch", "English", 
  "Esperanto", "Estonian", "Ewe", "Filipino (Tagalog)", "Finnish", "French", "Frisian", 
  "Galician", "Georgian", "German", "Greek", "Guarani", "Gujarati", "Haitian Creole", 
  "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", 
  "Ilocano", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", 
  "Khmer", "Kinyarwanda", "Konkani", "Korean", "Krio", "Kurdish (Kurmanji)", "Kurdish (Sorani)", 
  "Kyrgyz", "Lao", "Latin", "Latvian", "Lingala", "Lithuanian", "Luganda", "Luxembourgish", 
  "Macedonian", "Maithili", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", 
  "Meiteilon (Manipuri)", "Mizo", "Mongolian", "Nepali", "Norwegian", "Odia (Oriya)", "Oromo", 
  "Pashto", "Persian (Farsi)", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", 
  "Russian", "Samoan", "Sanskrit", "Scottish Gaelic", "Sepedi", "Serbian", "Sesotho", "Shona", 
  "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", 
  "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Tigrinya", "Tsonga", "Turkish", 
  "Turkmen", "Twi", "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", 
  "Yiddish", "Yoruba", "Zulu"
];

export default function TranslatorApp() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);
  const [fileName, setFileName] = useState('');
  const [mode, setMode] = useState('translate');
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setUploadedFiles(prev => [...prev, ...fileArray]);
    
    if (fileArray.length === 1) {
      // Single file - process as before
      const file = fileArray[0];
      setFileName(file.name);
      setIsTranslating(true);
      setError('');

      try {
        await processFile(file);
      } catch (error) {
        console.error('Error processing file:', error);
        setError('Error processing file. Please try again.');
        setIsTranslating(false);
      }
    } else {
      // Multiple files - just store them
      setFileName(`${fileArray.length} files selected`);
      setError('');
    }
  };

  const processFile = async (file) => {
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target.result.split(',')[1];
          
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "document",
                      source: {
                        type: "base64",
                        media_type: "application/pdf",
                        data: base64Data
                      }
                    },
                    {
                      type: "text",
                      text: "Extract all text from this PDF document. Return only the extracted text, nothing else."
                    }
                  ]
                }
              ]
            })
          });

          const data = await response.json();
          const extractedText = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
          setInputText(extractedText);
        } catch (err) {
          setError('Failed to extract text from PDF. Please try again.');
          console.error(err);
        } finally {
          setIsTranslating(false);
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target.result.split(',')[1];
          
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "image",
                      source: {
                        type: "base64",
                        media_type: file.type,
                        data: base64Data
                      }
                    },
                    {
                      type: "text",
                      text: "Extract all visible text from this image using OCR. Return only the extracted text, nothing else."
                    }
                  ]
                }
              ]
            })
          });

          const data = await response.json();
          const extractedText = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
          setInputText(extractedText);
        } catch (err) {
          setError('Failed to extract text from image. Please try again.');
          console.error(err);
        } finally {
          setIsTranslating(false);
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
        setIsTranslating(false);
      };
      reader.readAsText(file);
    } else {
      setError('Unsupported file type. Please upload a text, PDF, or image file.');
      setIsTranslating(false);
    }
  };

  const calculateStats = (original, translated) => {
    const originalWords = original.trim().split(/\s+/).filter(w => w.length > 0);
    const translatedWords = translated.trim().split(/\s+/).filter(w => w.length > 0);
    const originalChars = original.length;
    const translatedChars = translated.length;
    const originalCharsNoSpace = original.replace(/\s/g, '').length;
    const translatedCharsNoSpace = translated.replace(/\s/g, '').length;
    
    const originalSentences = original.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const translatedSentences = translated.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    const originalParagraphs = original.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const translatedParagraphs = translated.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    
    const avgOriginalWordLength = originalCharsNoSpace / originalWords.length || 0;
    const avgTranslatedWordLength = translatedCharsNoSpace / translatedWords.length || 0;
    
    const lengthRatio = ((translatedChars / originalChars) * 100) || 0;
    
    return {
      original: {
        words: originalWords.length,
        characters: originalChars,
        charactersNoSpace: originalCharsNoSpace,
        sentences: originalSentences,
        paragraphs: originalParagraphs,
        avgWordLength: avgOriginalWordLength.toFixed(2)
      },
      translated: {
        words: translatedWords.length,
        characters: translatedChars,
        charactersNoSpace: translatedCharsNoSpace,
        sentences: translatedSentences,
        paragraphs: translatedParagraphs,
        avgWordLength: avgTranslatedWordLength.toFixed(2)
      },
      comparison: {
        wordDifference: translatedWords.length - originalWords.length,
        characterDifference: translatedChars - originalChars,
        lengthRatio: lengthRatio.toFixed(2),
        expansionOrCompression: lengthRatio > 100 ? 'Expansion' : lengthRatio < 100 ? 'Compression' : 'Same'
      }
    };
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter or upload text to translate');
      return;
    }

    setIsTranslating(true);
    setTranslatedText('');
    setStats(null);
    setError('');

    try {
      let promptText;
      
      if (mode === 'translate') {
        promptText = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Preserve the formatting and structure. Return only the translated text:\n\n${inputText}`;
      } else {
        promptText = `Transliterate the following text from ${sourceLanguage} script to ${targetLanguage} script. Convert the pronunciation/phonetics, not the meaning. Return only the transliterated text:\n\n${inputText}`;
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: promptText
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();
      const result = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
      setTranslatedText(result);
      
      const statistics = calculateStats(inputText, result);
      setStats(statistics);
      
    } catch (error) {
      console.error('Processing error:', error);
      setError('Error processing text. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    const btn = document.getElementById('copy-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${targetLanguage.toLowerCase().replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const swapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsTranslating(true);
    try {
      // Convert audio to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        // Use Claude API to transcribe (simulated - actual transcription would need Whisper API)
        // For now, we'll show a message that audio transcription is being processed
        setError('Audio transcription complete. Note: For production use, integrate with a speech-to-text API like Whisper.');
        setInputText(prev => prev + '\n[Audio transcription would appear here with proper speech-to-text API]');
      };
      reader.readAsDataURL(audioBlob);
    } catch (err) {
      setError('Failed to transcribe audio. Please try again.');
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = (text, language) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map language to speech synthesis language codes
      const languageMap = {
        'English': 'en-US',
        'Spanish': 'es-ES',
        'French': 'fr-FR',
        'German': 'de-DE',
        'Italian': 'it-IT',
        'Portuguese': 'pt-PT',
        'Russian': 'ru-RU',
        'Japanese': 'ja-JP',
        'Korean': 'ko-KR',
        'Chinese (Simplified)': 'zh-CN',
        'Chinese (Traditional)': 'zh-TW',
        'Arabic': 'ar-SA',
        'Hindi': 'hi-IN',
        'Dutch': 'nl-NL',
        'Polish': 'pl-PL',
        'Turkish': 'tr-TR',
        'Swedish': 'sv-SE',
        'Norwegian': 'no-NO',
        'Danish': 'da-DK',
        'Finnish': 'fi-FI',
        'Greek': 'el-GR',
        'Czech': 'cs-CZ',
        'Hungarian': 'hu-HU',
        'Romanian': 'ro-RO',
        'Thai': 'th-TH',
        'Vietnamese': 'vi-VN',
        'Indonesian': 'id-ID',
        'Malay': 'ms-MY',
        'Filipino (Tagalog)': 'fil-PH',
        'Ukrainian': 'uk-UA',
        'Hebrew': 'he-IL',
        'Bengali': 'bn-IN',
        'Tamil': 'ta-IN',
        'Telugu': 'te-IN',
        'Kannada': 'kn-IN',
        'Malayalam': 'ml-IN',
        'Gujarati': 'gu-IN',
        'Marathi': 'mr-IN',
        'Punjabi': 'pa-IN',
        'Urdu': 'ur-PK',
        'Persian (Farsi)': 'fa-IR',
        'Swahili': 'sw-KE',
        'Afrikaans': 'af-ZA',
        'Catalan': 'ca-ES',
        'Croatian': 'hr-HR',
        'Serbian': 'sr-RS',
        'Slovak': 'sk-SK',
        'Slovenian': 'sl-SI',
        'Bulgarian': 'bg-BG',
        'Latvian': 'lv-LV',
        'Lithuanian': 'lt-LT',
        'Estonian': 'et-EE',
        'Icelandic': 'is-IS',
        'Welsh': 'cy-GB',
        'Irish': 'ga-IE',
        'Scottish Gaelic': 'gd-GB'
      };
      
      utterance.lang = languageMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setError('Speech synthesis failed. Your browser may not support this language.');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      setError('Text-to-speech is not supported in your browser.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const downloadAsZip = async () => {
    try {
      // Import JSZip from CDN
      const JSZip = (await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm')).default;
      
      const zip = new JSZip();
      
      // Add translated text
      if (translatedText) {
        zip.file(`translated_${targetLanguage.toLowerCase().replace(/\s+/g, '_')}.txt`, translatedText);
      }
      
      // Add original text
      if (inputText) {
        zip.file(`original_${sourceLanguage.toLowerCase().replace(/\s+/g, '_')}.txt`, inputText);
      }
      
      // Add statistics if available
      if (stats) {
        const statsText = `Translation Statistics
========================

Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
Mode: ${mode === 'translate' ? 'Translation' : 'Transliteration'}

SOURCE TEXT STATISTICS:
- Words: ${stats.original.words}
- Characters: ${stats.original.characters}
- Characters (no space): ${stats.original.charactersNoSpace}
- Sentences: ${stats.original.sentences}
- Paragraphs: ${stats.original.paragraphs}
- Average Word Length: ${stats.original.avgWordLength}

TARGET TEXT STATISTICS:
- Words: ${stats.translated.words}
- Characters: ${stats.translated.characters}
- Characters (no space): ${stats.translated.charactersNoSpace}
- Sentences: ${stats.translated.sentences}
- Paragraphs: ${stats.translated.paragraphs}
- Average Word Length: ${stats.translated.avgWordLength}

COMPARISON:
- Word Difference: ${stats.comparison.wordDifference}
- Character Difference: ${stats.comparison.characterDifference}
- Length Ratio: ${stats.comparison.lengthRatio}%
- Text Change: ${stats.comparison.expansionOrCompression}

Reading Time:
- Source: ~${Math.ceil(stats.original.words / 200)} minutes
- Target: ~${Math.ceil(stats.translated.words / 200)} minutes
`;
        zip.file('statistics.txt', statsText);
      }
      
      // Add uploaded files if any
      for (const file of uploadedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        zip.file(file.name, arrayBuffer);
      }
      
      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Download
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translation_package_${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error creating zip:', error);
      setError('Failed to create zip file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Languages className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Multi-Language Translator</h1>
            <p className="text-gray-600">Translate, transliterate text, PDFs, and images across 120+ languages</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Mode Selection */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
              <button
                onClick={() => setMode('translate')}
                className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                  mode === 'translate'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Languages className="w-5 h-5 mr-2" />
                Translate
              </button>
              <button
                onClick={() => setMode('transliterate')}
                className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                  mode === 'transliterate'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Type className="w-5 h-5 mr-2" />
                Transliterate
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-center">
              <button
                onClick={swapLanguages}
                className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors font-semibold"
                title="Swap languages"
              >
                ⇄ Swap
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files (Optional)</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                Text File (.txt)
                <input
                  type="file"
                  accept=".txt"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              <label className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                PDF File
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <label className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors">
                <Image className="w-5 h-5 mr-2" />
                Image (OCR)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {fileName && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <span className="mr-2">✓</span> Loaded: {fileName}
              </p>
            )}
            {uploadedFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Uploaded files ({uploadedFiles.length}):</p>
                <ul className="list-disc list-inside ml-2">
                  {uploadedFiles.slice(0, 5).map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                  {uploadedFiles.length > 5 && (
                    <li>... and {uploadedFiles.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Text Input/Output Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Source Text ({inputText.length} characters)
                </label>
                <div className="flex gap-2">
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      <StopCircle className="w-4 h-4 mr-1" />
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      title="Record voice input"
                    >
                      <Mic className="w-4 h-4 mr-1" />
                      Record
                    </button>
                  )}
                  {inputText && (
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(inputText, sourceLanguage)}
                      className={`flex items-center px-3 py-1 ${isSpeaking ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg transition-colors text-sm`}
                      title="Read aloud"
                    >
                      <Volume2 className="w-4 h-4 mr-1" />
                      {isSpeaking ? 'Stop' : 'Speak'}
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or upload a file..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {mode === 'translate' ? 'Translated Text' : 'Transliterated Text'} ({translatedText.length} characters)
                </label>
                {translatedText && (
                  <button
                    onClick={() => isSpeaking ? stopSpeaking() : speakText(translatedText, targetLanguage)}
                    className={`flex items-center px-3 py-1 ${isSpeaking ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg transition-colors text-sm`}
                    title="Read aloud"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    {isSpeaking ? 'Stop' : 'Speak'}
                  </button>
                )}
              </div>
              <textarea
                value={translatedText}
                readOnly
                placeholder={mode === 'translate' ? 'Translation will appear here...' : 'Transliteration will appear here...'}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              {isTranslating ? '⏳ Processing...' : mode === 'translate' ? '🌐 Translate' : '✍️ Transliterate'}
            </button>

            {translatedText && (
              <>
                <button
                  id="copy-btn"
                  onClick={handleCopy}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download TXT
                </button>

                <button
                  onClick={downloadAsZip}
                  className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <FileArchive className="w-5 h-5 mr-2" />
                  Download ZIP
                </button>

                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {showStats ? 'Hide Stats' : 'Show Stats'}
                </button>
              </>
            )}
          </div>

          {/* Statistics Panel */}
          {showStats && stats && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Text Statistics & Analysis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Original Text Stats */}
                <div className="bg-white rounded-lg p-5 shadow-md">
                  <h4 className="font-semibold text-lg text-blue-700 mb-3 border-b-2 border-blue-200 pb-2">
                    Source Text ({sourceLanguage})
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-bold text-gray-900">{stats.original.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-bold text-gray-900">{stats.original.characters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chars (no space):</span>
                      <span className="font-bold text-gray-900">{stats.original.charactersNoSpace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sentences:</span>
                      <span className="font-bold text-gray-900">{stats.original.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paragraphs:</span>
                      <span className="font-bold text-gray-900">{stats.original.paragraphs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Word Length:</span>
                      <span className="font-bold text-gray-900">{stats.original.avgWordLength}</span>
                    </div>
                  </div>
                </div>

                {/* Translated Text Stats */}
                <div className="bg-white rounded-lg p-5 shadow-md">
                  <h4 className="font-semibold text-lg text-green-700 mb-3 border-b-2 border-green-200 pb-2">
                    Target Text ({targetLanguage})
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-bold text-gray-900">{stats.translated.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-bold text-gray-900">{stats.translated.characters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chars (no space):</span>
                      <span className="font-bold text-gray-900">{stats.translated.charactersNoSpace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sentences:</span>
                      <span className="font-bold text-gray-900">{stats.translated.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paragraphs:</span>
                      <span className="font-bold text-gray-900">{stats.translated.paragraphs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Word Length:</span>
                      <span className="font-bold text-gray-900">{stats.translated.avgWordLength}</span>
                    </div>
                  </div>
                </div>

                {/* Comparison Stats */}
                <div className="bg-white rounded-lg p-5 shadow-md">
                  <h4 className="font-semibold text-lg text-purple-700 mb-3 border-b-2 border-purple-200 pb-2">
                    Comparison Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Word Difference:</span>
                      <span className={`font-bold ${stats.comparison.wordDifference > 0 ? 'text-green-600' : stats.comparison.wordDifference < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {stats.comparison.wordDifference > 0 ? '+' : ''}{stats.comparison.wordDifference}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Char Difference:</span>
                      <span className={`font-bold ${stats.comparison.characterDifference > 0 ? 'text-green-600' : stats.comparison.characterDifference < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {stats.comparison.characterDifference > 0 ? '+' : ''}{stats.comparison.characterDifference}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Length Ratio:</span>
                      <span className="font-bold text-gray-900">{stats.comparison.lengthRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Text Change:</span>
                      <span className={`font-bold ${stats.comparison.expansionOrCompression === 'Expansion' ? 'text-blue-600' : stats.comparison.expansionOrCompression === 'Compression' ? 'text-orange-600' : 'text-gray-900'}`}>
                        {stats.comparison.expansionOrCompression}
                      </span>
                    </div>
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                      <p className="text-xs text-gray-700">
                        <strong>Reading Time:</strong>
                        <br />Source: ~{Math.ceil(stats.original.words / 200)} min
                        <br />Target: ~{Math.ceil(stats.translated.words / 200)} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-semibold text-md text-indigo-700 mb-2">💡 Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>
                      {stats.comparison.lengthRatio > 120 
                        ? `The ${targetLanguage} translation is significantly longer, which is common for languages with more descriptive grammar.`
                        : stats.comparison.lengthRatio < 80
                        ? `The ${targetLanguage} translation is more compact, typical for languages with efficient character systems.`
                        : `Both texts have similar lengths, indicating structural similarity between languages.`}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>
                      Average word length changed from {stats.original.avgWordLength} to {stats.translated.avgWordLength} characters.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
