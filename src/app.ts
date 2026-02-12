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
}

// Constants
const API_KEY = 'AIzaSyAzr65vxkOF_TmzS1fEbJOZn0MNBhcoA-U';
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
    messageContainer.innerHTML = '';
  }
  window.speechSynthesis.cancel();
  isSpeaking = false;
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
  }

  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach((item: Element) => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('data-target') === sectionId) {
      link.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });
}

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
});

