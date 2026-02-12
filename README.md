# VirtualShop AI 🛒

An intelligent AI-powered virtual shopping assistant with advanced features including:
- **AI Chat**: Powered by Google Gemini 2.0 Flash for intelligent shopping advice
- **Voice Support**: Hands-free shopping with speech recognition and text-to-speech
- **OCR Scanner**: Extract text from product labels using Tesseract.js
- **Modern UI**: Beautiful, responsive design with smooth animations
- **TypeScript**: Fully typed codebase for better code quality and maintainability

## Features

### 🤖 AI Assistant
- Real-time conversation with Gemini AI
- Natural language understanding for shopping queries
- Automatic URL detection and linking
- Loading states and error handling

### 🎤 Voice Features
- Speech-to-text for accepting voice commands
- Text-to-speech to read responses aloud
- Listening state indicator with visual feedback

### 📱 OCR Text Scanner
- Upload product images
- Extract text using Tesseract.js
- Copy extracted text to clipboard
- Download extracted text as file

### 🎨 User Interface
- Modern gradient design with dark theme
- Responsive layout for all devices
- Smooth animations and transitions
- Accessibility features (ARIA labels, keyboard support)
- Toast notifications for user feedback

### 💳 Shopping Features
- Shopping cart management
- Secure payment form
- Order summary
- Price formatting

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Compiled from TypeScript)
- **TypeScript**: For type safety and better code quality
- **APIs**:
  - Google Gemini 2.0 Flash for AI responses
  - Web Speech API for voice recognition
  - Web Synthesis API for text-to-speech
  - Tesseract.js for OCR
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
