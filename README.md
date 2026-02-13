# VirtualShop AI - Smart Shopping Assistant

An intelligent AI-powered virtual shopping assistant with voice support, OCR scanning, and Gemini AI integration. Shop smarter with hands-free voice commands, instant product recommendations, and real-time text scanning.

## ✨ Features

### 🤖 AI Shopping Chat
- Real-time conversation with Google Gemini AI
- Natural language understanding for shopping queries
- Instant product recommendations and advice
- Audio responses with text-to-speech

### 🎤 Voice Control
- Hands-free shopping using Web Speech API
- Voice input for searching and chatting
- Audio feedback with synthesis
- Browser-based speech recognition

### 📸 OCR Text Scanning
- Upload and scan product labels and images
- Extract text instantly using Tesseract.js
- Copy extracted text to clipboard
- Download text as .txt file
- Drag-and-drop image support

### 🔍 Product Search
- Full-text product search
- Voice-enabled search
- Instant results filtering
- Product recommendations

### 🛒 Shopping Cart
- Add/remove products
- Adjust quantities
- Real-time cart updates
- Automatic tax and shipping calculation

### 💳 Secure Payment
- Complete checkout form
- Billing and shipping address collection
- Card validation
- Order summary display
- Toast notifications for user feedback

### 📱 Responsive Design
- Mobile-friendly interface
- Hamburger menu for mobile devices
- Tablet optimization
- Touch-friendly buttons and inputs

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Modern web browser

### Installation

```bash
# 1. Clone or navigate to project
cd virtualshop-ai

# 2. Install dependencies
npm install

# 3. Build TypeScript
npm run build

# 4. Start development server
npm run dev
```

Visit `http://localhost:5000` in your browser.

## 📖 Usage

### AI Chat
1. Go to **Chat** section
2. Type your question or use voice input (microphone icon)
3. Receive AI-powered shopping advice

### Search Products
1. Use **Search** section
2. Enter product name or use voice search
3. Add items to cart directly from results

### Scan with OCR
1. Open **OCR** section
2. Upload image or drag-and-drop
3. Click "Extract Text"
4. Copy or download results

### Checkout
1. Review items in **Cart**
2. Adjust quantities as needed
3. Click "Proceed to Checkout"
4. Fill payment information
5. Submit order

## ⚙️ Available Commands

```bash
npm run dev          # Start server on port 5000
npm run build        # Compile TypeScript
npm start            # Build and show completion
npm run validate     # Check TypeScript without emitting
npm run compile-ts   # Manual TypeScript compilation
```

## 🏗️ Project Structure

```
virtualshop-ai/
├── public/
│   ├── index.html          # Main HTML
│   ├── styles.css          # Styling
│   └── dist/
│       ├── app.js          # Compiled JavaScript
│       ├── app.js.map      # Source map
│       └── app.d.ts        # Type definitions
├── src/
│   └── app.ts              # TypeScript source
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Security

- Client-side OCR processing
- HTML escaping for XSS prevention
- No sensitive data stored locally
- HTTPS recommended for production
- Input validation on forms

## 🎨 Customization

### Colors (in `styles.css`)
- Primary: `#00bfff` (Cyan)
- Background: `#0f0f1e` (Dark)
- Accent: `#1a3a52`

### Products
Edit `productsDatabase` in `src/app.ts`:
```typescript
const productsDatabase: Product[] = [
  { id: '1', name: 'Product', price: 99.99, description: 'Description' }
];
```

### Voice Language (in `src/app.ts`)
```typescript
const voiceConfig: VoiceConfig = {
  lang: 'en-US',  // Change to other languages
  rate: 1.0       // Speech rate (0.1-10)
};
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Speech not working | Use Chrome/Edge, allow microphone |
| OCR not loading | Check Tesseract.js CDN connection |
| API errors | Verify Gemini API key and quota |
| Styling issues | Clear cache, check styles.css loads |

## 🌐 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Opera
- ⚠️ Safari (limited voice API)

## 📄 License

MIT License - Open source and free to use

## 🔮 Future Improvements

- User accounts and order history
- Advanced filtering
- Real payment gateway
- Multi-language support
- Mobile app versions
- Real inventory integration
- Customer reviews

---

**Smart Shopping Powered by AI** 🚀

- **Libraries**:
  - Font Awesome for icons
  - Tesseract.js for text recognition


## Getting Started

### Prerequisites
- Modern web browser with support for:
  - Web Speech API
  - Web Audio API
  - Fetch API
  - ES2020+ JavaScript

## Building from TypeScript

## Configuration

### API Key
The application uses a Google Gemini API key. To use your own key:
1. Get a free API key from [Google AI Studio](https://aistudio.google.com)
2. Replace the `API_KEY` constant in `app.js` or `app.ts`

### Voice Language
Modify the `voiceConfig` object to change the language:
```javascript
const voiceConfig = {
    lang: 'en-US', // Change to other language codes
    rate: 1.0      // Speech rate (0.1 to 10)
};
```

## Usage Guide

### Chat Section
1. Type or speak your shopping question
2. Press Enter or click the Send button
3. Wait for AI response
4. Click "Listen" to hear the response

### Search Section
1. Enter product name or keyword
2. Click Search or use voice input
3. Browse results

### OCR Scanner
1. Click to upload an image
2. Click "Extract Text"
3. Copy or download the extracted text

### Cart & Payment
1. Add items to cart
2. Review order summary
3. Complete payment with card details

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Best experience |
| Firefox | ✅ Full | Excellent support |
| Safari  | ✅ Full | iOS 14.5+ recommended |
| Edge    | ✅ Full | Chromium-based |
| Opera   | ✅ Full | Good support |
| IE 11   | ❌ No   | Not supported |

## Troubleshooting

## Security

- HTML escaping for user input
- Safe URL detection and validation
- No sensitive data stored locally
- HTTPS recommended for deployment

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color scheme
- Readable font sizes
- Semantic HTML structure

## Future Enhancements

- [ ] Multi-language support
- [ ] User authentication
- [ ] Product recommendations using ML
- [ ] Integration with e-commerce APIs
- [ ] Progressive Web App (PWA) features
- [ ] Dark/Light mode toggle
- [ ] Chat history persistence
- [ ] Advanced filtering and sorting

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review error messages in browser console (F12)

## Credits

- Google Gemini AI API
- Tesseract.js for OCR
- Font Awesome for icons
- Modern CSS3 and Web APIs

## Changelog

### Version 2.0.0 (Current)
- ✨ Complete rewrite in TypeScript
- 🎨 Modern UI redesign with gradients and animations
- 🔧 Improved code quality and type safety
- 📱 Enhanced responsive design
- ♿ Better accessibility support
- 🛡️ Better error handling and validation
- 📚 Comprehensive documentation
- 🧹 Code cleanup and optimization

### Version 1.0.0
- Initial release with basic features

---

**Made with ❤️ by the VirtualShop AI Team**

Last Updated: February 2026
