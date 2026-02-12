# 🚀 VirtualShop AI - Quick Start Guide

## Get Started in 5 Minutes!

### Step 1: Open the Project
Navigate to the project folder where you have all the files:
- `index.html`
- `app.js`
- `styles.css`
- And other supporting files

### Step 2: Start a Local Server

#### Option A: Python (Recommended)
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js / npm
```bash
# Using http-server package
npm install -g http-server
http-server -p 8000
```

#### Option C: Direct Browser
You can also open `index.html` directly in your browser, but some features may not work properly due to CORS restrictions.

### Step 3: Open in Browser
Open your web browser and visit:
```
http://localhost:8000
```

### Step 4: Start Using!

#### Testing the Chat Feature
1. Click on **"Chat"** in the navigation
2. Type a shopping question, e.g., "What are the best running shoes?"
3. Press **Enter** or click the **Send** button
4. Wait for the AI response
5. Click **Listen** to hear the response

#### Testing Voice Input
1. Click the **microphone icon** in the chat
2. Speak your question clearly
3. The app will transcribe your speech
4. Send the message as normal

#### Testing OCR
1. Click on **"OCR"** in the navigation
2. Click on the upload area or drag an image
3. Take a screenshot of text or use any image with text
4. Click **"Extract Text"**
5. View or copy the extracted text

#### Exploring Other Sections
- **Search**: Find products using keywords
- **Cart**: View shopping cart summary
- **Payment**: Complete payment process

### Common Issues & Solutions

#### "CORS Error" or "Failed to load styles.css"
- **Solution**: Make sure you're using a local server, not opening file directly
- Use `python -m http.server` command above

#### "Speech Recognition Not Working"
- **Solution**: 
  - Use Chrome, Edge, or Firefox (best support)
  - Check your microphone permissions
  - Ensure speakers/microphone are connected
  - Refresh the page

#### "AI Not Responding"
- **Solution**:
  - Check internet connection
  - Verify the API key is valid
  - Open browser console (F12) and check for errors
  - Try a simpler message

#### "OCR Not Working"
- **Solution**:
  - Use a clearer image
  - Try JPG or PNG format
  - Ensure image has readable text
  - Check browser console for errors

### Feature Tips

#### For Better Chat Experience
- Be specific with your questions
- Use natural language
- The AI understands shopping-related queries best
- Long paragraphs work better than single words

#### For Better Voice Input
- Speak clearly at normal volume
- Avoid background noise
- Pause between words
- Chrome/Edge works best for voice

#### For Better OCR
- Use clear, high-contrast images
- Ensure text is straight (not rotated)
- Use good lighting
- Avoid blurry photos

### Browser Console (Developer Tools)

To access browser console for debugging:
1. Press **F12** or **Ctrl+Shift+I** (Windows) / **Cmd+Option+I** (Mac)
2. Go to **Console** tab
3. You'll see logs and any errors

Useful commands to type in console:
```javascript
// Check if speech recognition is available
window.SpeechRecognition || window.webkitSpeechRecognition

// Check API Key
console.log(API_KEY)

// View current configuration
console.log(voiceConfig)
```

### Customization Quick Tips

#### Change Colors
Edit `styles.css` and find these color variables:
```css
#00bfff  /* Cyan - main accent */
#0a2342  /* Dark Navy - primary */
#4a90e2  /* Soft Blue - secondary */
```

#### Change Language
Edit `styles.css` or `app.js`:
```javascript
const voiceConfig = {
    lang: 'fr-FR',  // Change to French
    rate: 1.0
};
```

#### Change API Key
Find this line in `app.js`:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

### Performance Tips

- Clear browser cache if CSS doesn't update: `Ctrl+Shift+Delete`
- Use modern browser (Chrome, Firefox, Safari, Edge)
- Disable browser extensions if things don't work
- Ensure 10+ Mbps internet connection for best experience

### Getting Your Own API Key

1. Visit: https://aistudio.google.com
2. Click "Get API Key"
3. Create a new project
4. Copy your API key
5. Replace the key in `app.js`:
   ```javascript
   const API_KEY = 'paste-your-key-here';
   ```

### File Structure Reference

```
├── index.html              ← Main page (open this)
├── app.js                  ← Chat & UI logic (400+ lines)
├── app.ts                  ← TypeScript source (for reference)
├── styles.css              ← Styling (1000+ lines)
├── package.json            ← Project metadata
├── tsconfig.json           ← TypeScript config
├── README.md               ← Full documentation
├── ENHANCEMENT_SUMMARY.md  ← What's new
└── .gitignore              ← Git config
```

### Need More Help?

1. **Full Guide**: Read `README.md`
2. **What's New**: Read `ENHANCEMENT_SUMMARY.md`
3. **Console Errors**: Open F12 → Console tab
4. **Feature Info**: Check comments in `app.js`
5. **Styling**: Check `styles.css` for class names

### Next Steps

After running locally:
1. Explore all sections of the website
2. Test voice features with different accents
3. Try OCR with various images
4. Customize colors/styling if needed
5. Deploy to a hosting service (Netlify, Vercel, GitHub Pages, etc.)

### Deployment

To deploy online:
1. Use Netlify (drag & drop files)
2. Use Vercel (import git repo)
3. Use GitHub Pages (push to gh-pages branch)
4. Use any static hosting service

Simply upload these files:
- index.html
- app.js (or app.ts + compile)
- styles.css
- .gitignore
- README.md

### Troubleshooting Checklist

- [ ] Using `python -m http.server` or similar?
- [ ] Checked browser console (F12)?
- [ ] Using modern browser (Chrome, Firefox, Safari, Edge)?
- [ ] Connected to internet?
- [ ] Microphone/speaker connected for voice features?
- [ ] Using HTTPS for sensitive features?
- [ ] Files in same directory?

### Performance Metrics

Typical load times:
- Page Load: < 2 seconds
- Chat Response: 2-5 seconds (depends on AI)
- OCR Processing: 5-10 seconds (first time loads library)
- Voice Input: < 1 second recognition

### Features Status

- ✅ Chat with AI
- ✅ Voice Input
- ✅ Voice Output
- ✅ OCR Scanning
- ✅ Responsive Design
- ✅ Modern UI
- ✅ Error Handling

### Security Notes

- API key is demo only - use your own for production
- No sensitive data stored locally
- All communications via HTTPS recommended
- Input is properly escaped
- No tracking or analytics included

---

**You're all set! Enjoy using VirtualShop AI! 🎉**

For detailed information, see README.md and ENHANCEMENT_SUMMARY.md
