# Multi-Language Translator & Transliterator with OCR,speech, voice recording and many more ....& Statistics

A powerful, AI-powered translation and transliteration application that supports 120+ languages with built-in OCR capabilities, PDF processing, and comprehensive text statistics.

![Languages](https://img.shields.io/badge/Languages-120+-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![AI Powered](https://img.shields.io/badge/AI-Claude_Sonnet_4-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Features
- 🌍 **120+ Languages Support** - Translate between over 120 languages including major world languages and regional dialects
- 🔤 **Transliteration Mode** - Convert text from one script to another based on pronunciation (e.g., "Hello" → "हेलो")
- 📊 **Advanced Text Statistics** - Comprehensive analysis of source and target text with insights
- 📄 **PDF Text Extraction** - Upload PDF documents and extract text automatically
- 🖼️ **Image OCR** - Extract text from images (JPG, PNG, JPEG, etc.)
- 📝 **Text File Support** - Upload .txt files directly
- ⇄ **Language Swap** - Quickly swap source and target languages
- 📋 **Copy to Clipboard** - One-click copy of translated/transliterated text
- 💾 **Download Results** - Save translations/transliterations as .txt files
- 🎨 **Modern UI** - Clean, responsive interface with intuitive mode switching
- ⚡ **Real-time Processing** - Fast AI-powered translations, transliterations, and OCR

### Statistical Analysis Features (NEW!)
- 📈 **Word Count Analysis** - Track words in both source and target text
- 📏 **Character Metrics** - Total characters with/without spaces
- 📑 **Document Structure** - Sentence and paragraph counting
- 📊 **Comparison Metrics** - Word/character differences and length ratios
- 🔍 **Text Expansion/Compression** - Understand how languages differ in length
- ⏱️ **Reading Time Estimates** - Approximate reading time for both texts
- 💡 **Smart Insights** - Automatic analysis and explanations of translation patterns
- 📐 **Average Word Length** - Character distribution analysis

### Translation vs Transliteration

| Feature | Translation | Transliteration |
|---------|------------|-----------------|
| **Purpose** | Convert meaning | Convert script/sound |
| **Example 1** | "Hello" (EN) → "नमस्ते" (HI) | "Hello" (EN) → "हेलो" (HI) |
| **Example 2** | "Computer" (EN) → "कंप्यूटर" (HI meaning) | "Computer" (EN) → "कंप्यूटर" (HI sound) |
| **Use Case** | Understanding foreign text | Writing names, keeping pronunciation |

## 🌐 Supported Languages

The app supports translation and transliteration between any pair of the following 120+ languages:

Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Aymara, Azerbaijani, Bambara, Basque, Belarusian, Bengali, Bhojpuri, Bosnian, Bulgarian, Burmese, Catalan, Cebuano, Chinese (Simplified), Chinese (Traditional), Corsican, Croatian, Czech, Danish, Dhivehi, Dogri, Dutch, English, Esperanto, Estonian, Ewe, Filipino (Tagalog), Finnish, French, Frisian, Galician, Georgian, German, Greek, Guarani, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hmong, Hungarian, Icelandic, Igbo, Ilocano, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Kinyarwanda, Konkani, Korean, Krio, Kurdish (Kurmanji), Kurdish (Sorani), Kyrgyz, Lao, Latin, Latvian, Lingala, Lithuanian, Luganda, Luxembourgish, Macedonian, Maithili, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Meiteilon (Manipuri), Mizo, Mongolian, Nepali, Norwegian, Odia (Oriya), Oromo, Pashto, Persian (Farsi), Polish, Portuguese, Punjabi, Quechua, Romanian, Russian, Samoan, Sanskrit, Scottish Gaelic, Sepedi, Serbian, Sesotho, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tajik, Tamil, Tatar, Telugu, Thai, Tigrinya, Tsonga, Turkish, Turkmen, Twi, Ukrainian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, and Zulu.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- React 18+
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sayantanr/MLTT-LATEST.git
cd MLTT-LATEST
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 📖 How to Use

### Choose Your Mode

**Step 1**: Select between two modes using the toggle buttons:
- **Translate Mode** - Convert meaning from one language to another
- **Transliterate Mode** - Convert script/pronunciation while keeping the sound

### Translation Mode

1. **Select Languages**: Choose your source and target languages from the dropdown menus
2. **Enter Text**: Type or paste text into the "Source Text" area
3. **Translate**: Click the "Translate" button
4. **Get Results**: View your translation in the "Translated Text" area
5. **View Statistics**: Click "Show Stats" to see detailed analysis

**Example**:
- Input: "Good morning" (English)
- Output: "Buenos días" (Spanish)
- Stats: Word count, character count, reading time, etc.

### Transliteration Mode

1. **Select Languages**: Choose your source and target scripts
2. **Enter Text**: Type text you want to convert to another script
3. **Transliterate**: Click the "Transliterate" button
4. **Get Results**: View the phonetic conversion in the target script
5. **View Statistics**: Analyze how the text changed

**Examples**:
- Input: "John" (English) → Output: "जॉन" (Hindi)
- Input: "Tokyo" (English) → Output: "টোকিও" (Bengali)
- Input: "Pizza" (English) → Output: "پیزا" (Urdu)

### Upload Files

#### Text Files (.txt)
- Click the "Text File (.txt)" button
- Select your .txt file
- Text will automatically populate in the source area

#### PDF Files
- Click the "PDF File" button
- Select your PDF document
- AI will extract all text from the PDF
- Extracted text appears in the source area

#### Images (OCR)
- Click the "Image (OCR)" button
- Select an image file (JPG, PNG, etc.)
- AI will perform OCR and extract visible text
- Extracted text appears in the source area

### View Statistics

After translation/transliteration:
1. Click the **"Show Stats"** button
2. View comprehensive analysis including:
   - Source text metrics (words, characters, sentences, paragraphs)
   - Target text metrics
   - Comparison analysis (differences, ratios, expansion/compression)
   - Reading time estimates
   - Smart insights about language patterns

### Additional Features

- **Swap Languages**: Click the "⇄ Swap" button to quickly reverse source and target languages
- **Copy Result**: Click the "Copy" button to copy translated/transliterated text to clipboard
- **Download Result**: Click the "Download" button to save result as a .txt file

## 🛠️ Technical Details

### Built With

- **React** - Frontend framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Claude AI (Anthropic)** - Translation, transliteration, and OCR engine

### Architecture

The app uses Claude AI's API to perform:
- Text-to-text translation (meaning-based)
- Text-to-text transliteration (script/sound-based)
- PDF text extraction
- OCR from images
- Language and script detection

### Statistics Calculation

The app calculates:
- **Word Count**: Splits text by whitespace
- **Character Count**: Total characters including/excluding spaces
- **Sentence Count**: Splits by sentence terminators (. ! ?)
- **Paragraph Count**: Splits by double line breaks
- **Average Word Length**: Characters per word
- **Length Ratio**: Percentage comparison of text lengths
- **Reading Time**: Based on 200 words per minute average

## 📝 File Format Support

| Format | Extension | Support |
|--------|-----------|---------|
| Text | .txt | ✅ Full |
| PDF | .pdf | ✅ Full |
| Images | .jpg, .jpeg, .png, .gif, .bmp | ✅ OCR |

## ⚙️ Configuration

### API Setup

The app requires access to the Anthropic API. The API endpoint is configured to use:
- Model: `claude-sonnet-4-20250514`
- Max tokens: 1000 per request

## 🎯 Use Cases

### Translation Use Cases
- **Travel**: Understand signs, menus, and documents in foreign countries
- **Business**: Translate business documents and communications
- **Education**: Study materials in multiple languages
- **Research**: Translate research papers and articles
- **Content Creation**: Localize content for global audiences

### Transliteration Use Cases
- **Names**: Write your name in different scripts (John → जॉन)
- **Branding**: Create brand names in local scripts while keeping pronunciation
- **Language Learning**: Learn how words are written in different alphabets
- **Social Media**: Post messages using different scripts
- **Documents**: Include foreign words/names in documents with proper script
- **Cultural Context**: Preserve pronunciation of cultural terms

### Statistics Use Cases
- **Content Planning**: Understand text expansion for layout design
- **Translation Quality**: Analyze translation patterns and consistency
- **Language Learning**: Study structural differences between languages
- **Document Management**: Track document length across languages
- **SEO Optimization**: Plan multilingual content with length considerations
- **Publishing**: Estimate reading time for multilingual content

### Real-World Examples

**Translation with Stats**:
- Input: "Welcome to our restaurant" (English - 27 chars, 4 words)
- Output: "आपका हमारे रेस्तरां में स्वागत है" (Hindi - 35 chars, 6 words)
- Analysis: 29.6% expansion, common for English to Hindi

**Transliteration with Stats**:
- Input: "McDonald's" (English - 10 chars, 1 word)
- Output: "मैकडॉनल्ड्स" (Hindi - 12 chars, 1 word)
- Analysis: 20% expansion due to character system differences

## 🔒 Privacy & Security

- All processing happens through secure API calls
- No text data is stored permanently
- Files are processed in-memory only
- No user data retention
- Statistics calculated client-side

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Large PDF files (>10MB) may take longer to process
- Complex image layouts may affect OCR accuracy
- Very long texts may need to be processed in chunks
- Transliteration accuracy varies by language pair (best for major languages)
- Statistics are approximations based on standard text analysis methods

## 🗺️ Roadmap

- [ ] Add bulk file translation/transliteration
- [ ] Export statistics as CSV or PDF
- [ ] Support for audio file transcription and translation
- [ ] Translation/transliteration history and favorites
- [ ] Offline mode for common languages
- [ ] Browser extension version
- [ ] Mobile app version
- [ ] Side-by-side comparison mode (translate + transliterate)
- [ ] Custom glossary support for consistent transliterations
- [ ] Advanced statistics (readability scores, complexity analysis)
- [ ] Batch processing for multiple files
- [ ] API integration for developers

## 💬 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🙏 Acknowledgments

- Anthropic for Claude AI
- Lucide for beautiful icons
- The open-source community
- All contributors and users providing feedback

## 📊 Stats

- **Languages**: 120+
- **File Types**: 3 (Text, PDF, Images)
- **Translation Pairs**: 14,400+
- **Transliteration Pairs**: 14,400+
- **Modes**: 2 (Translate & Transliterate)
- **Statistics Metrics**: 15+
- **AI Model**: Claude Sonnet 4

## 🌟 Key Differentiators

Unlike other translation tools, this app offers:
1. **Dual Mode**: Switch between translation and transliteration
2. **Script Flexibility**: Convert text to 120+ different scripts
3. **OCR Support**: Extract and process text from images and PDFs
4. **Comprehensive Statistics**: Detailed analysis of text transformations
5. **No Storage**: Privacy-focused with no data retention
6. **AI-Powered**: Leverages advanced Claude AI for accurate results
7. **Smart Insights**: Automatic analysis of translation patterns
8. **All-in-One**: Translation + Transliteration + OCR + Statistics in one tool

## 📈 Statistics Features Breakdown

### Source Text Metrics
- Word count
- Character count (with spaces)
- Character count (without spaces)
- Sentence count
- Paragraph count
- Average word length

### Target Text Metrics
- All source metrics for translated/transliterated text
- Side-by-side comparison

### Comparison Analysis
- Word difference (±)
- Character difference (±)
- Length ratio (%)
- Expansion/Compression indicator
- Reading time estimates

### Smart Insights
- Automatic pattern detection
- Language-specific explanations
- Structural analysis
- Contextual recommendations

## 🎓 Educational Value

This tool is perfect for:
- **Linguistics Students**: Study language structure and patterns
- **Translation Students**: Understand text transformation metrics
- **Language Teachers**: Demonstrate language differences
- **Researchers**: Analyze cross-linguistic patterns
- **Writers**: Optimize content for multilingual audiences

---

Made with ❤️ by the community | Powered by Claude AI

**Star this repo if you find it useful! ⭐**
