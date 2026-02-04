// ===== ENVIRONMENT CONFIGURATION =====
// This file loads environment variables and provides configuration for the application

class Config {
    constructor() {
        this.env = this.loadEnv();
        console.log('Config initialized:', this.env.ENABLE_CHATBOT);
    }

    // Load environment variables
    loadEnv() {
        try {
            // For client-side deployment, we'll use inline config
            // In production with backend, you would load from actual .env file
            
            const envConfig = {
                // AI Chatbot - OpenRouter (Primary)
                OPENROUTER_API_KEY: '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',
                OPENROUTER_MODEL: 'arcee-ai/trinity-large-preview:free',
                
                // AI Chatbot - Alternatives
                OPENAI_API_KEY: '',
                OPENAI_MODEL: 'gpt-4',
                OPENAI_MAX_TOKENS: 2000,
                OPENAI_TEMPERATURE: 0.7,
                
                ANTHROPIC_API_KEY: '',
                ANTHROPIC_MODEL: 'claude-3-sonnet-20240229',
                
                GOOGLE_API_KEY: '',
                GOOGLE_MODEL: 'gemini-pro',
                
                // Chatbot Settings
                CHATBOT_NAME: 'DatBot',
                CHATBOT_WELCOME_MESSAGE: 'Hello! How can I help you with Le Tan Dat\'s services?',
                CHATBOT_LANGUAGE: 'en',
                CHATBOT_POSITION: 'bottom-right',
                CHATBOT_THEME: 'dark',
                
                // Email - SMTP
                SMTP_HOST: 'smtp.gmail.com',
                SMTP_PORT: 587,
                SMTP_USER: 'letandat1709@gmail.com',
                SMTP_PASSWORD: 'aihg xlhb owog rbjm',
                SMTP_FROM: 'Le Tan Dat Portfolio',
                SMTP_TO: 'letandat1709@gmail.com',
                
                // Email - EmailJS
                EMAILJS_SERVICE_ID: '',
                EMAILJS_TEMPLATE_ID: '',
                EMAILJS_PUBLIC_KEY: '',
                
                // Analytics
                GA_TRACKING_ID: '',
                FB_PIXEL_ID: '',
                
                // Social Media
                GITHUB_URL: '',
                LINKEDIN_URL: '',
                FACEBOOK_URL: '',
                TWITTER_URL: '',
                
                // Contact
                CONTACT_EMAIL: 'letandat1709@gmail.com',
                CONTACT_PHONE: '0937833154',
                CONTACT_ADDRESS: 'Ho Chi Minh City, Vietnam',
                
                // API
                API_BASE_URL: '',
                API_TIMEOUT: 30000,
                
                // Feature Flags
                ENABLE_CHATBOT: true,
                ENABLE_ANALYTICS: false,
                ENABLE_CONTACT_FORM: true,
                ENABLE_PORTFOLIO_FILTER: true,
                
                // Security
                RECAPTCHA_SITE_KEY: '',
                
                // Development
                NODE_ENV: 'production',
                DEBUG_MODE: false
            };
            
            console.log('Config loaded successfully');
            return envConfig;
        } catch (error) {
            console.error('Error loading environment variables:', error);
            return {};
        }
    }

    // Get environment variable
    get(key, defaultValue = null) {
        return this.env[key] !== undefined ? this.env[key] : defaultValue;
    }

    // Check if feature is enabled
    isFeatureEnabled(feature) {
        const key = `ENABLE_${feature.toUpperCase()}`;
        return this.get(key, false);
    }

    // Get chatbot config
    getChatbotConfig() {
        return {
            name: this.get('CHATBOT_NAME'),
            welcomeMessage: this.get('CHATBOT_WELCOME_MESSAGE'),
            language: this.get('CHATBOT_LANGUAGE'),
            position: this.get('CHATBOT_POSITION'),
            theme: this.get('CHATBOT_THEME'),
            // Priority: OpenRouter > OpenAI > Anthropic > Google
            apiKey: this.get('OPENROUTER_API_KEY') || this.get('OPENAI_API_KEY') || this.get('ANTHROPIC_API_KEY') || this.get('GOOGLE_API_KEY'),
            model: this.get('OPENROUTER_MODEL') || this.get('OPENAI_MODEL') || this.get('ANTHROPIC_MODEL') || this.get('GOOGLE_MODEL'),
            provider: this.get('OPENROUTER_API_KEY') ? 'openrouter' : 
                     this.get('OPENAI_API_KEY') ? 'openai' :
                     this.get('ANTHROPIC_API_KEY') ? 'anthropic' : 'google',
            maxTokens: this.get('OPENAI_MAX_TOKENS'),
            temperature: this.get('OPENAI_TEMPERATURE')
        };
    }

    // Get email config
    getEmailConfig() {
        return {
            // SMTP Config
            smtp: {
                host: this.get('SMTP_HOST'),
                port: this.get('SMTP_PORT'),
                user: this.get('SMTP_USER'),
                password: this.get('SMTP_PASSWORD'),
                from: this.get('SMTP_FROM'),
                to: this.get('SMTP_TO')
            },
            // EmailJS Config
            emailjs: {
                serviceId: this.get('EMAILJS_SERVICE_ID'),
                templateId: this.get('EMAILJS_TEMPLATE_ID'),
                publicKey: this.get('EMAILJS_PUBLIC_KEY')
            }
        };
    }

    // Get analytics config
    getAnalyticsConfig() {
        return {
            gaTrackingId: this.get('GA_TRACKING_ID'),
            fbPixelId: this.get('FB_PIXEL_ID')
        };
    }

    // Get social media links
    getSocialLinks() {
        return {
            github: this.get('GITHUB_URL'),
            linkedin: this.get('LINKEDIN_URL'),
            facebook: this.get('FACEBOOK_URL'),
            twitter: this.get('TWITTER_URL')
        };
    }

    // Get contact info
    getContactInfo() {
        return {
            email: this.get('CONTACT_EMAIL'),
            phone: this.get('CONTACT_PHONE'),
            address: this.get('CONTACT_ADDRESS')
        };
    }

    // Validate configuration
    validate() {
        const errors = [];

        if (this.isFeatureEnabled('CHATBOT') && !this.get('OPENROUTER_API_KEY') && !this.get('OPENAI_API_KEY') && !this.get('ANTHROPIC_API_KEY') && !this.get('GOOGLE_API_KEY')) {
            errors.push('Chatbot is enabled but no API key is configured');
        }

        if (this.isFeatureEnabled('CONTACT_FORM') && !this.get('SMTP_USER') && !this.get('EMAILJS_SERVICE_ID')) {
            errors.push('Contact form is enabled but email service is not configured');
        }

        if (this.isFeatureEnabled('ANALYTICS') && !this.get('GA_TRACKING_ID')) {
            errors.push('Analytics is enabled but Google Analytics is not configured');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Debug mode logging
    log(...args) {
        if (this.get('DEBUG_MODE')) {
            console.log('[Config]', ...args);
        }
    }
}

// Create singleton instance
const config = new Config();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
