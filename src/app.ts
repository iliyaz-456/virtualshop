// VirtualShop AI - TypeScript Version
// Type Definitions and Interfaces

interface VoiceConfig {
  lang: string;
  rate: number;
}

interface GeminiContent {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text: string;
      }>;
    };
  }>;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  readonly isFinal: boolean;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((event: SpeechRecognitionEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

// Web Speech API types
type SpeechRecognitionConstructor = {
  new (): SpeechRecognition;
};

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
  Tesseract?: any;
}

// Constants
const API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Voice Configuration
const voiceConfig: VoiceConfig = {
  lang: 'en-US',
  rate: 1.0
};

// DOM Elements with proper null checks
const messageInput = document.getElementById('messageInput') as HTMLInputElement | null;
const messageContainer = document.getElementById('messageContainer') as HTMLDivElement | null;
const chatBody = document.getElementById('chatBody') as HTMLDivElement | null;
const micBtn = document.getElementById('micBtn') as HTMLButtonElement | null;
const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement | null;
const sendBtn = document.getElementById('sendBtn') as HTMLButtonElement | null;
const loadingIndicator = document.getElementById('loadingIndicator') as HTMLDivElement | null;

// State Management
let recognition: SpeechRecognition | null = null;
let isSpeaking = false;
let isListening = false;
let cartItems: CartItem[] = [];

// Sample products database
const productsDatabase: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-canceling headphones' },
  { id: '2', name: 'Smart Watch', price: 199.99, description: 'Advanced health tracking smartwatch' },
  { id: '3', name: 'USB-C Cable', price: 15.99, description: 'Fast charging USB-C cable' },
  { id: '4', name: 'Phone Case', price: 24.99, description: 'Protective phone case' },
  { id: '5', name: 'Screen Protector', price: 12.99, description: 'Tempered glass screen protector' },
  { id: '6', name: 'Portable Charger', price: 49.99, description: '20000mAh power bank' },
  { id: '7', name: 'Tablet Stand', price: 34.99, description: 'Adjustable tablet stand' },
  { id: '8', name: 'Keyboard', price: 89.99, description: 'Mechanical wireless keyboard' }
];

/**
 * Show toast notification
 */
function showToast(message: string, type: string = 'info'): void {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Add a message to the chat container
 */
function addMessage(text: string, isBot: boolean): void {
  if (!messageContainer || !chatBody) return;
  
  const div = document.createElement('div');
  div.className = isBot ? 'bot-message' : 'user-message';
  div.innerHTML = text;
  div.setAttribute('aria-label', `${isBot ? 'Bot' : 'User'} message: ${text.replace(/<[^>]*>/g, '')}`);
  messageContainer.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Convert URLs in text to clickable links
 */
function linkifyUrls(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url: string) => {
    try {
      new URL(url);
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    } catch {
      return url;
    }
  });
}

/**
 * Escape special characters for safe use in string templates
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char: string) => map[char]);
}

function getProductInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : 'P';
}

function getProductTag(price: number): string {
  if (price >= 150) return 'Premium';
  if (price >= 60) return 'Top Pick';
  return 'Everyday';
}

/**
 * Speak text using Web Speech API
 */
function speak(text: string): void {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceConfig.lang;
  utterance.rate = voiceConfig.rate;

  utterance.onstart = (): void => {
    isSpeaking = true;
  };

  utterance.onend = (): void => {
    isSpeaking = false;
  };

  utterance.onerror = (event: SpeechSynthesisErrorEvent): void => {
    console.error('Speech synthesis error:', event.error);
    isSpeaking = false;
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Send message to Gemini AI
 */
async function sendMessage(): Promise<void> {
  if (!messageInput || !sendBtn || !messageContainer || !loadingIndicator) return;
  
  const userText = messageInput.value.trim();
  
  if (!userText) {
    return;
  }

  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
    addMessage('<span class="error-message">Error: Missing Gemini API key. Add your key before sending messages.</span>', true);
    return;
  }

  sendBtn.disabled = true;
  sendBtn.classList.add('loading');

  addMessage(escapeHtml(userText), false);
  messageInput.value = '';

  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userText
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as GeminiContent;
    let botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

    botText = linkifyUrls(escapeHtml(botText));

    const audioButton = `
      <button class="audio-btn" title="Speak response" onclick="speakText('${botText.replace(/'/g, "&#39;").replace(/"/g, '&quot;')}')">
        <i class="fas fa-volume-up"></i> Listen
      </button>
    `;

    addMessage(botText + '<br>' + audioButton, true);
  } catch (error: unknown) {
    let errorMessage = 'An error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    addMessage(`<span class="error-message">Error: ${escapeHtml(errorMessage)}</span>`, true);
    console.error('Send message error:', error);
  } finally {
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.classList.remove('loading');
    }
  }
}

/**
 * Initialize Speech Recognition
 */
function initSpeechRecognition(): void {
  const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
  const SpeechRecognitionAPI = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
  
  if (!SpeechRecognitionAPI) {
    console.warn('Speech Recognition API not supported in this browser');
    if (micBtn) {
      micBtn.disabled = true;
      micBtn.title = 'Speech Recognition not supported';
    }
    return;
  }

  recognition = new SpeechRecognitionAPI();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = voiceConfig.lang;

  recognition.onstart = (): void => {
    isListening = true;
    if (micBtn) {
      micBtn.classList.add('listening');
    }
  };

  recognition.onresult = (event: SpeechRecognitionEvent): void => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    if (messageInput) {
      messageInput.value = messageInput.value + ' ' + transcript;
    }
  };

  recognition.onend = (): void => {
    isListening = false;
    if (micBtn) {
      micBtn.classList.remove('listening');
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    showToast('Speech recognition error', 'error');
  };
}

/**
 * Speak text from the page (for dynamic text)
 */
function speakText(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  const decodedText = textarea.value;
  const cleanText = decodedText.replace(/<[^>]*>/g, '');
  speak(cleanText);
}

/**
 * Clear chat and stop speech
 */
function clearChat(): void {
  if (messageContainer) {
    messageContainer.innerHTML = '<div class="bot-message welcome-message"><p>👋 Hello! I\'m your AI shopping assistant. Ask me anything about products, pricing, recommendations, or anything else you need help with!</p></div>';
  }
  window.speechSynthesis.cancel();
  isSpeaking = false;
  showToast('Chat cleared', 'success');
}

/**
 * Show specific section in navigation
 */
function showSection(sectionId: string): void {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section: Element) => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(sectionId) as HTMLElement | null;
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLinks = document.querySelectorAll('a[data-target]');
  navLinks.forEach((link: Element) => {
    if ((link as HTMLAnchorElement).getAttribute('data-target') === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Search for products
 */
function searchProducts(): void {
  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const searchResults = document.getElementById('searchResults') as HTMLDivElement | null;
  
  if (!searchInput || !searchResults) return;
  
  const query = searchInput.value.trim().toLowerCase();
  
  if (!query) {
    searchResults.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>Enter a search term</p></div>';
    return;
  }

  const results = productsDatabase.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No products found matching your search</p></div>';
    return;
  }

  searchResults.innerHTML = results.map(product => `
    <div class="product-card">
      <div class="product-media" aria-hidden="true">
        <span class="product-initial">${getProductInitial(product.name)}</span>
        <span class="product-tag">${getProductTag(product.price)}</span>
      </div>
      <div class="product-header">
        <h3>${escapeHtml(product.name)}</h3>
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
      <p class="product-description">${escapeHtml(product.description)}</p>
      <div class="product-footer">
        <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');

  showToast(`Found ${results.length} product(s)`, 'success');
}

/**
 * Add product to cart
 */
function addToCart(id: string, name: string, price: number): void {
  const existingItem = cartItems.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, name, price, quantity: 1 });
  }

  updateCartDisplay();
  showToast(`${name} added to cart!`, 'success');
}

/**
 * Update cart display
 */
function updateCartDisplay(): void {
  const cartItemsContainer = document.getElementById('cartItems') as HTMLDivElement | null;
  
  if (!cartItemsContainer) return;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-inbox"></i>
        <p>Your cart is empty</p>
        <button class="btn btn-primary" onclick="showSection('searchSection')">
          Continue Shopping
        </button>
      </div>
    `;
    updateCartSummary();
    return;
  }

  cartItemsContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div class="item-details">
        <h3>${escapeHtml(item.name)}</h3>
        <span class="item-price">$${item.price.toFixed(2)}</span>
      </div>
      <div class="item-controls">
        <button class="btn btn-sm" onclick="updateQuantity('${item.id}', -1)">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="btn btn-sm" onclick="updateQuantity('${item.id}', 1)">+</button>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');

  updateCartSummary();
}

/**
 * Update item quantity in cart
 */
function updateQuantity(id: string, change: number): void {
  const item = cartItems.find(item => item.id === id);
  
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartDisplay();
    }
  }
}

/**
 * Remove item from cart
 */
function removeFromCart(id: string): void {
  cartItems = cartItems.filter(item => item.id !== id);
  updateCartDisplay();
  showToast('Item removed from cart', 'success');
}

/**
 * Update cart summary (totals)
 */
function updateCartSummary(): void {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const subtotalEl = document.getElementById('subtotal') as HTMLElement | null;
  const shippingEl = document.getElementById('shipping') as HTMLElement | null;
  const taxEl = document.getElementById('tax') as HTMLElement | null;
  const totalEl = document.getElementById('total') as HTMLElement | null;
  const paymentTotalEl = document.getElementById('paymentTotal') as HTMLElement | null;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (paymentTotalEl) paymentTotalEl.textContent = `$${total.toFixed(2)}`;
}

/**
 * Perform OCR on uploaded image
 */
async function performOCR(): Promise<void> {
  const fileInput = document.getElementById('ocrFile') as HTMLInputElement | null;
  const ocrResult = document.getElementById('ocrResult') as HTMLDivElement | null;
  const ocrProgress = document.getElementById('ocrProgress') as HTMLDivElement | null;
  const doOCRBtn = document.getElementById('doOCR') as HTMLButtonElement | null;

  if (!fileInput?.files?.length || !ocrResult || !ocrProgress || !doOCRBtn) return;

  const file = fileInput.files[0];
  
  if (!file.type.startsWith('image/')) {
    showToast('Please select a valid image file', 'error');
    return;
  }

  ocrProgress.style.display = 'block';
  doOCRBtn.disabled = true;
  ocrResult.innerHTML = '';

  try {
    const windowWithTesseract = window as unknown as WindowWithSpeechRecognition;
    if (!windowWithTesseract.Tesseract) {
      throw new Error('Tesseract.js library not loaded');
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return;

      const img = e.target.result as string;
      const worker = await windowWithTesseract.Tesseract.createWorker();

      try {
        const result = await worker.recognize(img);
        const extractedText = result.data.text;

        if (!extractedText.trim()) {
          showToast('No text found in image', 'warning');
          ocrResult.innerHTML = '<p class="no-text">No text could be extracted from the image</p>';
        } else {
          ocrResult.innerHTML = `<div class="extracted-text"><p>${escapeHtml(extractedText)}</p></div>`;
          document.getElementById('ocrActions')!.style.display = 'flex';
          showToast('Text extracted successfully!', 'success');
        }
      } finally {
        await worker.terminate();
        ocrProgress.style.display = 'none';
        doOCRBtn.disabled = false;
      }
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.error('OCR error:', error);
    showToast('Failed to extract text from image', 'error');
    ocrProgress.style.display = 'none';
    doOCRBtn.disabled = false;
  }
}

/**
 * Copy extracted text to clipboard
 */
function copyOCRText(): void {
  const textElement = document.querySelector('.extracted-text p');
  if (textElement?.textContent) {
    navigator.clipboard.writeText(textElement.textContent).then(() => {
      showToast('Text copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy text', 'error');
    });
  }
}

/**
 * Download extracted text
 */
function downloadOCRText(): void {
  const textElement = document.querySelector('.extracted-text p');
  if (textElement?.textContent) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textElement.textContent));
    element.setAttribute('download', 'extracted-text.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Text downloaded!', 'success');
  }
}

/**
 * Clear OCR result
 */
function clearOCRResult(): void {
  const fileInput = document.getElementById('ocrFile') as HTMLInputElement | null;
  const imagePreview = document.getElementById('imagePreview') as HTMLImageElement | null;
  const ocrResult = document.getElementById('ocrResult') as HTMLDivElement | null;
  const ocrActions = document.getElementById('ocrActions') as HTMLDivElement | null;

  if (fileInput) fileInput.value = '';
  if (imagePreview) imagePreview.src = '';
  if (ocrResult) ocrResult.innerHTML = '';
  if (ocrActions) ocrActions.style.display = 'none';

  showToast('OCR cleared', 'success');
}

/**
 * Initialize on DOM ready
 */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', (): void => {
  // Initialize speech recognition
  initSpeechRecognition();

  // Mic button listener
  if (micBtn) {
    micBtn.addEventListener('click', (): void => {
      if (recognition && !isListening) {
        recognition.start();
      }
    });
  }

  // Send button listener
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Message input listener
  if (messageInput) {
    messageInput.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Stop button listener
  if (stopBtn) {
    stopBtn.addEventListener('click', clearChat);
  }

  // Navigation links
  const navLinks = document.querySelectorAll('a[data-target]');
  navLinks.forEach((link: Element) => {
    link.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      const target = (link as HTMLAnchorElement).getAttribute('data-target');
      if (target) {
        showSection(target);
      }
    });
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger') as HTMLElement | null;
  const navMenu = document.querySelector('.nav-menu') as HTMLElement | null;

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (): void => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach((link: Element) => {
      (link as HTMLElement).addEventListener('click', (): void => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Search functionality
  const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement | null;
  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const searchMicBtn = document.getElementById('searchMicBtn') as HTMLButtonElement | null;

  if (searchBtn) {
    searchBtn.addEventListener('click', searchProducts);
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchProducts();
      }
    });
  }

  if (searchMicBtn && recognition) {
    searchMicBtn.addEventListener('click', (): void => {
      if (!isListening) {
        recognition!.start();
        const tempInput = searchInput;
        
        recognition!.onresult = (event: SpeechRecognitionEvent): void => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          if (tempInput) {
            tempInput.value = transcript;
          }
        };
      }
    });
  }

  // OCR functionality
  const fileUploadWrapper = document.getElementById('fileUploadWrapper') as HTMLElement | null;
  const ocrFile = document.getElementById('ocrFile') as HTMLInputElement | null;
  const imagePreview = document.getElementById('imagePreview') as HTMLImageElement | null;
  const doOCRBtn = document.getElementById('doOCR') as HTMLButtonElement | null;
  const copyTextBtn = document.getElementById('copyTextBtn') as HTMLButtonElement | null;
  const downloadTextBtn = document.getElementById('downloadTextBtn') as HTMLButtonElement | null;
  const clearTextBtn = document.getElementById('clearTextBtn') as HTMLButtonElement | null;

  if (fileUploadWrapper && ocrFile && imagePreview) {
    fileUploadWrapper.addEventListener('click', (): void => {
      ocrFile.click();
    });

    fileUploadWrapper.addEventListener('dragover', (e: DragEvent): void => {
      e.preventDefault();
      fileUploadWrapper.classList.add('dragover');
    });

    fileUploadWrapper.addEventListener('dragleave', (): void => {
      fileUploadWrapper.classList.remove('dragover');
    });

    fileUploadWrapper.addEventListener('drop', (e: DragEvent): void => {
      e.preventDefault();
      fileUploadWrapper.classList.remove('dragover');
      if (e.dataTransfer?.files) {
        ocrFile.files = e.dataTransfer.files;
        const file = ocrFile.files[0];
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          if (ev.target?.result) {
            imagePreview.src = ev.target.result as string;
            if (doOCRBtn) doOCRBtn.disabled = false;
          }
        };
        reader.readAsDataURL(file);
      }
    });

    ocrFile.addEventListener('change', (): void => {
      if (ocrFile.files?.length) {
        const file = ocrFile.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            imagePreview.src = e.target.result as string;
            if (doOCRBtn) doOCRBtn.disabled = false;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (doOCRBtn) {
    doOCRBtn.addEventListener('click', performOCR);
  }

  if (copyTextBtn) {
    copyTextBtn.addEventListener('click', copyOCRText);
  }

  if (downloadTextBtn) {
    downloadTextBtn.addEventListener('click', downloadOCRText);
  }

  if (clearTextBtn) {
    clearTextBtn.addEventListener('click', clearOCRResult);
  }

  // Cart checkout
  const checkoutBtn = document.getElementById('checkoutBtn') as HTMLButtonElement | null;
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (): void => {
      if (cartItems.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
      }
      showSection('paymentSection');
    });
  }

  // Payment form submission
  const paymentForm = document.getElementById('paymentForm') as HTMLFormElement | null;
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e: Event): void => {
      e.preventDefault();

      // Validate form
      const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement)?.value;
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
        showToast('Invalid card number', 'error');
        return;
      }

      showToast('Processing payment...', 'info');

      // Simulate payment processing
      setTimeout(() => {
        showToast('Payment successful! Order confirmed.', 'success');
        cartItems = [];
        updateCartDisplay();
        paymentForm.reset();
        showSection('landingSection');
      }, 2000);
    });
  }

  // Initialize cart display
  updateCartDisplay();

  // Styles are handled in public/styles.css
});

