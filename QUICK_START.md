# VirtualShop AI - Quick Start Guide

Welcome to VirtualShop AI! This guide will help you get started in just a few minutes.

## ⚡ 5-Minute Setup

### Step 1: Installation (2 minutes)
```bash
# Navigate to the project folder
cd virtualshop-ai

# Install required packages
npm install

# Build the TypeScript code
npm run build
```

### Step 2: Start Development Server (1 minute)
```bash
npm run dev
```

Your browser should open to `http://localhost:5000`

### Step 3: Start Using! (2 minutes)
- Click "Home" to see the landing page
- Click "Chat" to talk with the AI
- Try "Search" to browse products
- Use "OCR" to scan images
- Add items to your "Cart"
- Proceed through "Payment" to checkout

## 🎯 Using Each Feature

### AI Chat Assistant
```
1. Click the "Chat" button in the navigation
2. Type a question like "What headphones do you recommend?"
3. Press Enter or click the Send button
4. Click "Listen" to hear the AI response out loud
5. Use the microphone icon to talk instead of typing
```

**Tips:**
- The AI responds to any shopping-related question
- Ask for product recommendations
- Ask about prices, features, or availability

### Product Search
```
1. Go to the "Search" section
2. Type what you're looking for (e.g., "headphones")
3. Click the Search button or press Enter
4. Click "Add to Cart" on any product you like
5. The product is added to your cart!
```

**Pro Tips:**
- Use the microphone to search by voice
- Search results appear instantly
- You can add multiple items at once

### OCR Text Scanner
```
1. Navigate to the "OCR" section
2. Click or drag an image into the upload area
3. For example: Product boxes, labels, documents
4. Click "Extract Text" to scan
5. Copy the text or download it as a file
```

**What Works:**
- Product labels and packaging
- Document text
- Screenshots and photos
- Support formats: JPG, PNG, BMP (Max 5MB)

### Shopping Cart
```
1. Go to "Cart" to see your items
2. Increase/decrease quantities with +/- buttons
3. Click trash icon to remove an item
4. Review the total price
5. Click "Proceed to Checkout"
```

**Features:**
- See subtotal, shipping, and tax
- Automatic calculations
- Easy quantity adjustments
- Remove unwanted items anytime

### Payment Checkout
```
1. Fill in your personal information
2. Enter billing address
3. Add card details (any valid format for demo)
4. Check the "I agree to terms" box
5. Click "Complete Payment"
```

**Note:** This is a demo - no real payment is processed

## 🎤 Voice Features

### Using Voice Input
1. Look for the **microphone icon** (🎤)
2. Click it to start listening
3. Speak clearly
4. The app will transcribe your words
5. Your text appears in the input field

### Listening to Responses
1. The AI will send you a response
2. Click the **"Listen"** button
3. The response will be read aloud
4. An audio indicator shows it's playing

**Requirements:**
- Chrome, Firefox, or Edge browser
- Microphone permissions granted
- Quiet environment works best

## 📱 Mobile Usage

The app works great on phones and tablets!

### Mobile Tips:
- Use the **hamburger menu** (☰) for navigation
- Tap products to add them to cart
- Voice works on mobile too
- Rotate screen for better viewing
- Use landscape mode for typing

## 💡 Pro Tips & Tricks

### Faster Shopping
- Use voice to search faster
- Talk naturally to the AI
- Save time with voice checkout

### Better OCR Results
- Use well-lit images
- Camera photos work better than screenshots
- Straight angles work best
- Clean, clear text is easiest to scan

### Smart AI Use
- Be specific with questions
- "headphones under $100" gets better results
- Ask follow-up questions
- The AI remembers context

## ⚙️ Settings & Preferences

### Change Voice Language
- Edit `src/app.ts`
- Find `voiceConfig.lang`
- Change from 'en-US' to another language
- Rebuild: `npm run build`

### Adjust Voice Speed
- In `src/app.ts`, change `voiceConfig.rate`
- Values: 0.1 (slow) to 10 (fast)
- 1.0 is normal speed

### Customize Products
- Edit `productsDatabase` in `src/app.ts`
- Add/remove/modify products
- Change prices and descriptions
- Rebuild the project

## 🆘 Troubleshooting

### "Microphone Not Working"
- ✅ Check browser permissions
- ✅ Allow microphone access when prompted
- ✅ Try Chrome or Firefox
- ✅ Ensure you have a working microphone

### "OCR Not Extracting Text"
- ✅ Use a clearer image
- ✅ Ensure text is readable
- ✅ Try JPG or PNG format
- ✅ Check file size (max 5MB)

### "Chat Not Responding"
- ✅ Check internet connection
- ✅ Verify API key in code
- ✅ Check browser console for errors
- ✅ Try refreshing the page

### "Website Not Loading"
- ✅ Make sure server is running (`npm run dev`)
- ✅ Check browser address: http://localhost:5000
- ✅ Clear browser cache
- ✅ Try a different browser

## 📞 Getting Help

### When Something Breaks
1. Open Developer Tools (F12)
2. Check the Console tab for errors
3. Look at the error message
4. Try the troubleshooting tips above
5. Restart the server if needed

### Common Errors

**"Cannot find module..."** 
→ Run `npm install`

**"TypeScript compilation errors"**
→ Run `npm run build` again

**"Blank page"**
→ Hard refresh (Ctrl+Shift+R) or check console

**"Buttons not working"**
→ Check JavaScript is enabled
→ Clear browser cache

## 🎓 Learning More

### Understanding the Code
- Check `README.md` for full documentation
- Look at `ENHANCEMENTS.md` for technical details
- Review comments in `src/app.ts`
- TypeScript files are in `src/`
- Compiled JavaScript is in `public/dist/`

### Customization Guide
See README.md section: "🎨 Customization"
- Colors and theme
- Adding new products
- Voice settings
- UI modifications

### Development
```bash
npm run dev       # Start development
npm run build     # Rebuild TypeScript
npm run validate  # Check code without building
```

## 🚀 Next Steps

1. **Explore the app** - Try all features
2. **Customize it** - Change colors, products
3. **Build on it** - Add your own features
4. **Deploy it** - Put it on a web server
5. **Improve it** - Make it your own!

## 📊 Feature Checklist

- [ ] Used AI Chat
- [ ] Tried voice input
- [ ] Searched for products
- [ ] Used OCR scanner
- [ ] Added items to cart
- [ ] Completed checkout
- [ ] Tested on mobile
- [ ] Customized settings

## 🎉 You're Ready!

You now know the basics. Enjoy using VirtualShop AI!

**Tips:**
- Explore all sections
- Try voice features
- Customize it to your liking
- Share your feedback

---

For more detailed information, see the main README.md file.

**Happy Shopping! 🛍️**
