// ==========================================
// M23 SPORT - IA CHATBOT (OpenRouter via Gemini)
// ==========================================

// ⚠️ SECURITY WARNING ⚠️
// The API Key is hardcoded here, BUT we will prefer a key in localStorage if available.
const DEFAULT_KEY = "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";
let API_KEY = localStorage.getItem('m23_custom_api_key') || DEFAULT_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// System Prompt
const SYSTEM_INSTRUCTION_TEXT = `
Actúa como 'Jorge', experto en ventas de M23 Sport.

REGLAS DE ORO (FORMATO):
1. **RESPUESTAS CORTAS**: Máximo 2 o 3 frases. Ve al grano.
2. **CERO DRAMA**: Solo escribe lo que le dices al cliente.
3. **RESPETO TOTAL**: Trata de "Usted". NUNCA uses "compa", "manito", "parcero".
4. **NO ES OFICIAL**: La camiseta de Colombia se vende como "Edición Especial" o "Tributo". NUNCA digas que es la "Oficial de la Federación".

FLUJO DE CONVERSACIÓN:
1. **Saludo**: "¡Hola! Bienvenido a M23 Sport. ¿En qué le puedo servir hoy?" (NO PÍDAS NOMBRE).
2. **Si pregunta por Colombia**:
   - ACLARA: "Es la Edición Especial (Solo camiseta). Cuesta $55.000."
   - ADVIERTE: "Viene sin estampar y el precio es fijo."
   - PREGUNTA: "¿Qué talla busca?"
3. **Si pregunta por Equipos (Dotación)**:
   - PREGUNTA: "¿Para cuántas personas son?" (Solo ahí das precios).
   - Menos de 6: $55.000 (Camisa+Pantaloneta).
   - Más de 6: $47.000 (Incluye medias y estampados).

CIERRE:
- Si compra: "Perfecto. Para pago y envío, toque el botón de WhatsApp abajo 👇".
`;

let chatHistory = [];
// Initial System Message for context
const initialMessages = [
    { role: "system", content: SYSTEM_INSTRUCTION_TEXT }
];

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    injectChatWidget();
    // Check if we have a key
    if (!localStorage.getItem('m23_custom_api_key')) {
        console.warn("Using default (potentially leaked) key. User can update it in chat if it fails.");
    }
});

// --- 2. UI INJECTION ---
// --- 2. UI INJECTION ---
function injectChatWidget() {
    // 1. Sales Banner (Right side)
    const banner = document.createElement('div');
    banner.className = 'sales-banner';
    banner.id = 'salesBanner';

    const bannerContent = document.createElement('div');
    bannerContent.className = 'sales-banner-content';
    bannerContent.innerHTML = `
            <div class="sales-icon">⚽</div>
            <div class="sales-text">
                <strong>¿Quieres uniformar a tu equipo?</strong>
                <span>Consulta con un asesor ahora</span>
            </div>
            <div class="sales-arrow"><i class="fas fa-comment-dots"></i></div>
    `;
    bannerContent.onclick = openChatWindow;

    banner.appendChild(bannerContent);
    document.body.appendChild(banner);

    // 2. Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.id = 'chatWindow';

    // Populate Product Options
    let productOptions = '<option value="" disabled selected>Selecciona un diseño...</option>';
    if (window.products && Array.isArray(window.products)) {
        window.products.forEach(p => {
            productOptions += `<option value="${p.title}">${p.title}</option>`;
        });
    } else {
        // Fallback if products not loaded yet
        for (let i = 1; i <= 10; i++) {
            productOptions += `<option value="Modelo ${i}">Modelo ${i}</option>`;
        }
    }

    chatWindow.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">
                <i class="fas fa-user-tie"></i> Jorge - Asesor M23
            </div>
            <button class="chat-close" id="chatCloseBtn">&times;</button>
        </div>
        
        <!-- Product Selector Area -->
        <div class="product-selector-area" style="padding: 10px; background: #f8f9fa; border-bottom: 1px solid #eee;">
            <select id="chatProductSelect" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;" onchange="handleProductSelection()">
                ${productOptions}
            </select>
        </div>

        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                Hola 👋 <br>
                Cuéntame, ¿cuál diseño del catálogo te gustó más?
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="Escribe aquí..." onkeypress="handleChatKey(event)">
            <button onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    document.getElementById('chatCloseBtn').onclick = toggleChatWindow;
}

// --- 3. LOGIC ---
function toggleChatWindow() {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');

    window.classList.toggle('active');

    // Banner Visibility Logic
    if (window.classList.contains('active')) {
        if (banner) banner.style.display = 'none'; // Hide banner when chat is open
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    } else {
        if (banner) banner.style.display = 'block'; // Show banner when chat is closed
    }
}

function openChatWindow() {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');

    if (!window.classList.contains('active')) {
        window.classList.add('active');
        if (banner) banner.style.display = 'none'; // Hide banner
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

function handleProductSelection() {
    const select = document.getElementById('chatProductSelect');
    const selectedProduct = select.value;
    if (selectedProduct) {
        const input = document.getElementById('chatInput');
        input.value = `Me interesa el ${selectedProduct}`;
        sendMessage();
    }
}

// Global function called from Catalog Buttons
window.openChatWithProduct = function (modelId) {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');
    const colombiaModal = document.getElementById('colombiaModal');

    // 1. Close Colombia Modal if open
    if (colombiaModal) {
        // Force close regardless of current state to be safe, or check display
        colombiaModal.style.display = 'none';
    }

    // 2. Open Chat
    if (!window.classList.contains('active')) {
        window.classList.add('active');
        if (banner) banner.style.display = 'none';
    }

    // 3. Set Message
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = `Hola, me interesa el uniforme Diseño ${modelId}`;
        input.focus();
        // 4. Send Message automatically
        sendMessage();
    }
};

window.saveNewKey = function () {
    const input = document.getElementById('newApiKeyInput');
    if (input && input.value.trim().length > 10) {
        const key = input.value.trim();
        localStorage.setItem('m23_custom_api_key', key);
        API_KEY = key;
        alert("✅ Llave guardada. ¡Intenta preguntar de nuevo!");

        // Remove the error message input form to clean up
        const errorDiv = input.closest('.message');
        if (errorDiv) errorDiv.remove();

        // Optionally clear input
    } else {
        alert("⚠️ Por favor ingresa una llave válida.");
    }
};

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();

    if (!userText) return;

    // Add User Message
    appendMessage(userText, 'user-message');
    input.value = '';

    // --- PHASE 1: SIMULATE READING (Delay) ---
    const readingDelay = Math.floor(Math.random() * 1000) + 1500;
    await new Promise(r => setTimeout(r, readingDelay));

    // --- PHASE 2: TYPING INDICATOR ---
    const loadingId = 'loading-' + Date.now();
    appendMessage('<i>Jorge está escribiendo...</i>', 'bot-message loading', loadingId);

    // Prepare Messages Payload (OpenAI Format for OpenRouter)
    // History + Current
    let messagesPayload = [...initialMessages, ...chatHistory];
    messagesPayload.push({ role: "user", content: userText });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://m23sport.com', // Optional: Your site URL
                'X-Title': 'M23 Sport Chatbot' // Optional: Your site name
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528:free",
                messages: messagesPayload
            })
        });

        const data = await response.json();

        // Remove Loading/Typing
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        // --- ERROR HANDLING & KEY RECOVERY ---
        if (data.error) {
            console.error("API Error Response:", data.error);
            let errorMsg = data.error.message || "Error desconocido";

            // Check for key issues specifically
            if (JSON.stringify(errorMsg).toLowerCase().includes('key')) {
                const recoveryHtml = `
                    <strong>⚠️ Error de Autenticación:</strong><br>
                    ${errorMsg}<br><br>
                    <span>Ingresa una API Key válida (OpenRouter):</span>
                    <div style="display:flex; gap:5px; margin-top:5px;">
                        <input type="text" id="newApiKeyInput" placeholder="sk-or-v1-..." style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px;">
                        <button onclick="saveNewKey()" style="background:var(--primary); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Guardar</button>
                    </div>
                `;
                appendMessage(recoveryHtml, 'bot-message error');
            } else {
                appendMessage(`⚠️ Falta técnica: ${errorMsg}`, 'bot-message error');
            }
            return;
        }

        if (data.choices && data.choices[0] && data.choices[0].message) {
            const botText = data.choices[0].message.content;

            // Append Bot Response
            appendMessage(botText, 'bot-message');

            // Save to history
            chatHistory.push({ role: "user", content: userText });
            chatHistory.push({ role: "assistant", content: botText });

        } else {
            console.warn("Unexpected API response structure:", data);
            appendMessage("⚠️ (Sin respuesta)", 'bot-message error');
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        appendMessage("⚠️ Error de conexión.", 'bot-message error');
    }
}

function appendMessage(text, className, id = null) {
    const msgContainer = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    if (id) div.id = id;

    // Convert newlines to <br> and bold text
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    div.innerHTML = formattedText;

    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
