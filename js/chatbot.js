// ===== AI CHATBOT INTEGRATION =====
// This file handles the AI chatbot functionality

class AIChatbot {
    constructor(config) {
        this.config = config;
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        if (!this.config.isFeatureEnabled('CHATBOT')) {
            console.log('Chatbot is disabled');
            return;
        }

        console.log('Chatbot initializing...');
        this.createChatbotUI();
        this.attachEventListeners();
        this.loadChatHistory();
        this.showPopupNotification(); // Show popup after page load
        console.log('Chatbot initialized successfully!');
    }

    createChatbotUI() {
        console.log('Creating chatbot UI...');
        const chatbotHTML = `
            <div class="chatbot-container ${this.config.get('CHATBOT_THEME')}" id="chatbot">
                <!-- Chatbot Toggle Button -->
                <button class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge" id="chatbot-badge">1</span>
                </button>

                <!-- Chatbot Window -->
                <div class="chatbot-window" id="chatbot-window">
                    <!-- Header -->
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="chatbot-header-text">
                                <h4>${this.config.get('CHATBOT_NAME')}</h4>
                                <span class="chatbot-status">
                                    <span class="status-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Messages -->
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="chatbot-message bot-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <p>${this.config.get('CHATBOT_WELCOME_MESSAGE')}</p>
                                <span class="message-time">${this.getCurrentTime()}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="chatbot-quick-actions" id="chatbot-quick-actions">
                        <button class="quick-action" data-message="Tell me about web development services">
                            <i class="fas fa-globe"></i>
                            Web Dev
                        </button>
                        <button class="quick-action" data-message="I'm interested in AI solutions">
                            <i class="fas fa-brain"></i>
                            AI Solutions
                        </button>
                        <button class="quick-action" data-message="Get a quote">
                            <i class="fas fa-dollar-sign"></i>
                            Quote
                        </button>
                    </div>

                    <!-- Input -->
                    <div class="chatbot-input">
                        <input 
                            type="text" 
                            id="chatbot-input-field" 
                            placeholder="Type a message..."
                            autocomplete="off"
                        />
                        <button class="chatbot-send" id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        console.log('Chatbot HTML injected');
        this.injectStyles();
        console.log('Chatbot styles injected');
    }

    injectStyles() {
        const styles = `
            <style>
                .chatbot-container {
                    position: fixed;
                    ${this.config.get('CHATBOT_POSITION').includes('right') ? 'right: 20px;' : 'left: 20px;'}
                    ${this.config.get('CHATBOT_POSITION').includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                }

                .chatbot-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #1a1a1a, #333333);
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                }

                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
                }

                .chatbot-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .chatbot-window {
                    position: absolute;
                    ${this.config.get('CHATBOT_POSITION').includes('right') ? 'right: 0;' : 'left: 0;'}
                    bottom: 80px;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideUp 0.3s ease;
                }

                .chatbot-window.open {
                    display: flex;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .chatbot-header {
                    background: linear-gradient(45deg, #1a1a1a, #333333);
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbot-header-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .chatbot-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .chatbot-header-text h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .chatbot-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    opacity: 0.9;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .chatbot-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    transition: transform 0.2s ease;
                }

                .chatbot-close:hover {
                    transform: scale(1.1);
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    background: #f8fafc;
                }

                .chatbot-message {
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .user-message {
                    flex-direction: row-reverse;
                }

                .message-avatar {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(45deg, #1a1a1a, #333333);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }

                .user-message .message-avatar {
                    background: linear-gradient(45deg, #94a3b8, #64748b);
                }

                .message-content {
                    max-width: 70%;
                }

                .message-content p {
                    background: white;
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    margin: 0 0 0.25rem 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .user-message .message-content p {
                    background: linear-gradient(45deg, #1a1a1a, #333333);
                    color: white;
                }

                .message-time {
                    font-size: 0.75rem;
                    color: #94a3b8;
                    padding: 0 0.5rem;
                }

                .chatbot-quick-actions {
                    padding: 0.75rem 1rem;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    gap: 0.5rem;
                    overflow-x: auto;
                }

                .quick-action {
                    padding: 0.5rem 1rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .quick-action:hover {
                    background: #1a1a1a;
                    color: white;
                    border-color: #1a1a1a;
                }

                .chatbot-input {
                    padding: 1rem;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    gap: 0.75rem;
                }

                #chatbot-input-field {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s ease;
                }

                #chatbot-input-field:focus {
                    border-color: #1a1a1a;
                }

                .chatbot-send {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(45deg, #1a1a1a, #333333);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .chatbot-send:hover {
                    transform: scale(1.1);
                }

                .typing-indicator {
                    display: flex;
                    gap: 0.25rem;
                    padding: 0.75rem 1rem;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #94a3b8;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                    }
                    30% {
                        transform: translateY(-10px);
                    }
                }

                @media (max-width: 480px) {
                    .chatbot-window {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input-field');
        const quickActions = document.querySelectorAll('.quick-action');

        toggle?.addEventListener('click', () => this.toggleChatbot());
        close?.addEventListener('click', () => this.closeChatbot());
        send?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const message = action.dataset.message;
                this.sendMessage(message);
            });
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const badge = document.getElementById('chatbot-badge');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window?.classList.add('open');
            badge.style.display = 'none';
        } else {
            window?.classList.remove('open');
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        window?.classList.remove('open');
        this.isOpen = false;
    }

    async sendMessage(text = null) {
        const input = document.getElementById('chatbot-input-field');
        const message = text || input?.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        
        if (input) input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I\'m having some issues. Please try again or contact via email: letandat1709@gmail.com', 'bot');
            console.error('Chatbot error:', error);
        }

        // Save to history
        this.saveChatHistory();
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageHTML = `
            <div class="chatbot-message ${sender}-message">
                <div class="message-avatar">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${this.getCurrentTime()}</span>
                </div>
            </div>
        `;

        messagesContainer?.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer?.scrollTo(0, messagesContainer.scrollHeight);

        this.messages.push({ text, sender, time: new Date().toISOString() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot-message typing-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;

        messagesContainer?.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer?.scrollTo(0, messagesContainer.scrollHeight);
    }

    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        typingMessage?.remove();
    }

    async getAIResponse(message) {
        const chatbotConfig = this.config.getChatbotConfig();
        
        console.log('Getting AI response for:', message);
        console.log('Chatbot config:', chatbotConfig);
        
        // Check if API key is configured
        if (!chatbotConfig.apiKey) {
            console.warn('No API key configured, using mock responses');
            return this.getMockResponse(message);
        }

        try {
            // Use OpenRouter API if configured
            if (chatbotConfig.provider === 'openrouter') {
                console.log('Using OpenRouter API with model:', chatbotConfig.model);
                
                const requestBody = {
                    model: chatbotConfig.model,
                    messages: [
                        { 
                            role: 'system', 
                            content: 'You are DatBot, a helpful AI assistant for Le Tan Dat\'s portfolio. Le Tan Dat is a freelance fullstack developer specializing in Web Development, Mobile Apps, AI Solutions, and Game Development. Be professional, friendly, and concise. Answer questions about his services, skills, and how to contact him. Email: letandat1709@gmail.com, Phone: 0937833154, Location: Ho Chi Minh City, Vietnam'
                        },
                        { role: 'user', content: message }
                    ]
                };
                
                console.log('Request body:', requestBody);
                
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${chatbotConfig.apiKey}`,
                        'HTTP-Referer': window.location.href,
                        'X-Title': 'DatBot Portfolio Assistant'
                    },
                    body: JSON.stringify(requestBody)
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('OpenRouter API error:', response.status, errorText);
                    
                    // Handle rate limit and not found errors
                    if (response.status === 429) {
                        console.warn('Rate limit hit, falling back to mock responses');
                        return this.getMockResponse(message);
                    }
                    
                    if (response.status === 404) {
                        console.warn('Model not found, falling back to mock responses');
                        return this.getMockResponse(message);
                    }
                    
                    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                console.log('API response:', data);
                
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    return data.choices[0].message.content;
                } else {
                    console.error('Unexpected API response format:', data);
                    throw new Error('Unexpected API response format');
                }
            }

            // Fallback to OpenAI if configured
            if (chatbotConfig.provider === 'openai') {
                console.log('Using OpenAI API');
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${chatbotConfig.apiKey}`
                    },
                    body: JSON.stringify({
                        model: chatbotConfig.model,
                        messages: [
                            { 
                                role: 'system', 
                                content: 'You are DatBot, a helpful AI assistant for Le Tan Dat\'s portfolio, a freelance fullstack developer.'
                            },
                            { role: 'user', content: message }
                        ],
                        max_tokens: chatbotConfig.maxTokens,
                        temperature: chatbotConfig.temperature
                    })
                });

                const data = await response.json();
                return data.choices[0].message.content;
            }

            // If no API configured, use mock responses
            console.log('No API provider configured, using mock responses');
            return this.getMockResponse(message);

        } catch (error) {
            console.error('AI API Error:', error);
            console.log('Falling back to mock responses');
            
            // Check if it's a rate limit error
            if (error.message && error.message.includes('429')) {
                // Return a friendly message about rate limit
                const rateLimitResponse = this.getMockResponse(message);
                return rateLimitResponse + '\n\n💡 Note: AI is temporarily busy. I\'m using smart responses based on your question!';
            }
            
            return this.getMockResponse(message);
        }
    }

    getMockResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        const responses = {
            'web': 'I provide professional web development services using React, Vue.js, Angular, and .NET Core. I can build responsive, modern websites and web applications tailored to your needs. Would you like to discuss your project?',
            'mobile': 'I develop cross-platform mobile apps using React Native and Flutter for both iOS and Android. What kind of mobile app are you looking to build?',
            'ai': 'I have extensive experience with AI/ML solutions including Machine Learning, Natural Language Processing, and Computer Vision. I can help integrate AI into your business. What AI solution interests you?',
            'game': 'I create engaging 2D/3D games using Unity for mobile and desktop platforms. What type of game are you thinking about?',
            'price': 'Project pricing varies based on scope and requirements. For an accurate quote, please fill out the contact form below or email me at letandat1709@gmail.com with your project details!',
            'contact': 'You can reach me at:\n📧 Email: letandat1709@gmail.com\n📱 Phone: 0937833154\n📍 Location: Ho Chi Minh City, Vietnam\n\nOr use the contact form on this page!',
            'hello': 'Hello! 👋 I\'m DatBot, here to help you learn about Le Tan Dat\'s services. He specializes in Web Development, Mobile Apps, AI Solutions, and Game Development. What would you like to know?',
            'default': 'Thank you for your message! I can help you with:\n• Web Development\n• Mobile Apps\n• AI Solutions\n• Game Development\n• UI/UX Design\n• Technical Consulting\n\nWhat service interests you? Or contact directly at letandat1709@gmail.com'
        };

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) return responses.hello;
        if (lowerMessage.includes('web')) return responses.web;
        if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) return responses.mobile;
        if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) return responses.ai;
        if (lowerMessage.includes('game')) return responses.game;
        if (lowerMessage.includes('price') || lowerMessage.includes('quote') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) return responses.price;
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) return responses.contact;
        
        return responses.default;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatbot_history', JSON.stringify(this.messages));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('chatbot_history');
            if (history) {
                this.messages = JSON.parse(history);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    // Show popup notification
    showPopupNotification() {
        // Don't show if already shown in this session
        if (sessionStorage.getItem('chatbot_popup_shown')) {
            return;
        }

        // Wait 3 seconds before showing popup
        setTimeout(() => {
            const popup = document.createElement('div');
            popup.className = 'chatbot-popup-notification';
            popup.innerHTML = `
                <div class="popup-content">
                    <button class="popup-close" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="popup-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h4>Hi! I'm here to help 👋</h4>
                    <p>Have questions about my services? Feel free to ask!</p>
                    <button class="popup-cta" onclick="document.getElementById('chatbot-toggle').click(); this.parentElement.parentElement.remove();">
                        <i class="fas fa-comments"></i>
                        Start Chat
                    </button>
                </div>
            `;

            document.body.appendChild(popup);

            // Add styles for popup
            const popupStyles = `
                <style>
                    .chatbot-popup-notification {
                        position: fixed;
                        ${this.config.get('CHATBOT_POSITION').includes('right') ? 'right: 20px;' : 'left: 20px;'}
                        bottom: 100px;
                        z-index: 9998;
                        animation: slideInUp 0.5s ease, bounce 2s ease 0.5s;
                    }

                    .popup-content {
                        background: white;
                        border-radius: 15px;
                        padding: 1.5rem;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        max-width: 300px;
                        position: relative;
                    }

                    .popup-close {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: none;
                        border: none;
                        color: #94a3b8;
                        cursor: pointer;
                        font-size: 1rem;
                        padding: 0.25rem;
                        transition: color 0.2s ease;
                    }

                    .popup-close:hover {
                        color: #1a1a1a;
                    }

                    .popup-icon {
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(45deg, #1a1a1a, #333333);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.5rem;
                        margin: 0 auto 1rem;
                    }

                    .popup-content h4 {
                        margin: 0 0 0.5rem 0;
                        color: #1a1a1a;
                        font-size: 1.1rem;
                        text-align: center;
                    }

                    .popup-content p {
                        margin: 0 0 1rem 0;
                        color: #64748b;
                        font-size: 0.9rem;
                        text-align: center;
                        line-height: 1.5;
                    }

                    .popup-cta {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background: linear-gradient(45deg, #1a1a1a, #333333);
                        color: white;
                        border: none;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    }

                    .popup-cta:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    }

                    @keyframes slideInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0);
                        }
                        40% {
                            transform: translateY(-10px);
                        }
                        60% {
                            transform: translateY(-5px);
                        }
                    }

                    @media (max-width: 480px) {
                        .chatbot-popup-notification {
                            left: 20px;
                            right: 20px;
                        }

                        .popup-content {
                            max-width: 100%;
                        }
                    }
                </style>
            `;

            if (!document.querySelector('#popup-styles')) {
                const styleElement = document.createElement('div');
                styleElement.id = 'popup-styles';
                styleElement.innerHTML = popupStyles;
                document.head.appendChild(styleElement);
            }

            // Mark as shown
            sessionStorage.setItem('chatbot_popup_shown', 'true');

            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.style.animation = 'slideInUp 0.3s ease reverse';
                    setTimeout(() => popup.remove(), 300);
                }
            }, 10000);

        }, 3000);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for config to be fully loaded
    setTimeout(() => {
        if (typeof config !== 'undefined') {
            console.log('Initializing chatbot with config:', config);
            new AIChatbot(config);
        } else {
            console.error('Config not found! Chatbot cannot initialize.');
        }
    }, 100);
});
