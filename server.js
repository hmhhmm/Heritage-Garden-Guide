const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock responses for demo mode (when API is unavailable)
const mockResponses = {
  greeting: [
    "Hello! Welcome to the Heritage Garden at Rumah Penghulu Abu Seman. I'm here to help you learn about our collection of traditional Malaysian plants. What would you like to know?",
    "Selamat datang! I can help you discover the rich heritage of Malaysian plants. Feel free to ask about any plant in our garden!"
  ],
  pandan: [
    "Pandan (Pandanus amaryllifolius) is a fragrant tropical plant highly valued in Malaysian cuisine. Its leaves are used to flavor rice, desserts, and beverages. Pandan is also known for its air-purifying properties and is easy to grow in Malaysian climate.",
    "The pandan leaf is often called 'vanilla of the East.' In traditional Malay culture, it's used not just for cooking but also as a natural air freshener. The plant grows well in partial shade and moist soil."
  ],
  serai: [
    "Serai or lemongrass (Cymbopogon citratus) is essential in Malaysian cooking. It adds a citrusy flavor to curries, soups, and teas. Traditionally, it's also used for medicinal purposes - the tea helps with digestion and reduces fever.",
    "Lemongrass is incredibly easy to grow in Malaysia. Just plant the base of fresh stalks in soil, keep them watered, and they'll thrive in full sun. The plant also naturally repels mosquitoes!"
  ],
  kunyit: [
    "Kunyit (turmeric/Curcuma longa) is a golden treasure in Malaysian heritage. The rhizome is used as a spice, natural dye, and traditional medicine. It has anti-inflammatory properties and is a key ingredient in many Malay dishes.",
    "In Malay traditional medicine, turmeric is highly valued. It's used to treat wounds, skin conditions, and digestive issues. The plant prefers partial shade and well-drained soil."
  ],
  hibiscus: [
    "Bunga Raya (Hibiscus rosa-sinensis) is Malaysia's national flower! It symbolizes courage, life, and rapid growth. The flower can be used to make refreshing tea and is also used in traditional hair care.",
    "The hibiscus blooms year-round in Malaysia's tropical climate. In traditional practice, the flowers and leaves are crushed and used as a natural shampoo to promote hair growth and prevent hair loss."
  ],
  general: [
    "Our Heritage Garden showcases plants that have been part of Malaysian culture for centuries. These include culinary herbs like pandan and serai, medicinal plants like kunyit and lengkuas, and ornamental plants like bunga raya.",
    "The plants in our heritage collection serve multiple purposes - culinary, medicinal, and cultural. Many were brought to this region centuries ago and became integral to Malaysian daily life."
  ],
  care: [
    "Most Malaysian heritage plants thrive in warm, humid conditions with regular watering. Plants like pandan and serai prefer partial shade, while herbs like kunyit need well-drained soil. Most are quite resilient in our tropical climate!",
    "For traditional herbs, the key is to mimic their natural environment: warm temperatures, high humidity, and protection from harsh afternoon sun. Regular harvesting actually encourages growth in plants like serai and pandan."
  ],
  uses: [
    "Heritage plants have diverse uses: culinary (pandan for flavoring, serai for tom yam), medicinal (kunyit for inflammation, halia for digestion), cosmetic (hibiscus for hair care), and cultural (offerings and ceremonies).",
    "Traditional Malaysian plants are incredibly versatile. For example, pandan leaves flavor food, freshen homes, and are woven into crafts. Serai is used in cooking, traditional medicine, and as a natural insect repellent."
  ],
  default: [
    "That's an interesting question! While I'm currently in demo mode with limited information, I can tell you about common heritage plants like pandan, serai, kunyit, lengkuas, and bunga raya. What would you like to know?",
    "I'd love to help you learn more about Malaysian heritage plants! Try asking about specific plants like pandan, lemongrass, turmeric, or hibiscus, or ask about their uses and care."
  ]
};

function getMockResponse(message) {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.match(/^(hi|hello|hey|greetings|selamat)/)) {
    return mockResponses.greeting[Math.floor(Math.random() * mockResponses.greeting.length)];
  }
  
  // Pandan
  if (msg.match(/pandan/)) {
    return mockResponses.pandan[Math.floor(Math.random() * mockResponses.pandan.length)];
  }
  
  // Serai/Lemongrass
  if (msg.match(/serai|lemongrass|lemon grass/)) {
    return mockResponses.serai[Math.floor(Math.random() * mockResponses.serai.length)];
  }
  
  // Kunyit/Turmeric
  if (msg.match(/kunyit|turmeric/)) {
    return mockResponses.kunyit[Math.floor(Math.random() * mockResponses.kunyit.length)];
  }
  
  // Hibiscus
  if (msg.match(/hibiscus|bunga raya|national flower/)) {
    return mockResponses.hibiscus[Math.floor(Math.random() * mockResponses.hibiscus.length)];
  }
  
  // Care instructions
  if (msg.match(/care|grow|plant|maintain|water/)) {
    return mockResponses.care[Math.floor(Math.random() * mockResponses.care.length)];
  }
  
  // Uses
  if (msg.match(/use|benefit|purpose|cook|medicine|medicinal/)) {
    return mockResponses.uses[Math.floor(Math.random() * mockResponses.uses.length)];
  }
  
  // General garden info
  if (msg.match(/garden|heritage|collection|what|about|tell me/)) {
    return mockResponses.general[Math.floor(Math.random() * mockResponses.general.length)];
  }
  
  // Default
  return mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)];
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    // Check if API key is available and valid
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      console.log('No API key - using mock responses');
      const mockReply = getMockResponse(message);
      return res.json({ response: mockReply });
    }

    // Build conversation for Gemini Pro (current supported model)
    const systemInstruction = 'You are a helpful assistant for the Heritage Garden at Rumah Penghulu Abu Seman, managed by Badan Warisan Malaysia. You help visitors learn about traditional Malaysian plants, their uses, care instructions, and cultural significance. Be friendly, informative, and concise. Focus on the heritage and cultural aspects of the plants in the collection.';

    let conversationText = systemInstruction + '\n\n';
    if (history && history.length > 0) {
      history.forEach(msg => {
        const who = msg.role === 'assistant' ? 'Assistant' : 'User';
        conversationText += `${who}: ${msg.content}\n`;
      });
      conversationText += '\n';
    }
    conversationText += `User: ${message}\nAssistant:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: conversationText }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    // Safely consume response body: handle non-JSON or empty responses and non-OK statuses
    const rawText = await response.text();
    if (!rawText) {
      throw new Error(`Empty response from Generative API (status ${response.status} ${response.statusText})`);
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      if (!response.ok) {
        throw new Error(`Generative API error ${response.status} ${response.statusText}: ${rawText}`);
      }
      // Non-JSON but OK: treat raw text as result
      data = { result: rawText };
    }

    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));

    // Robust extraction for Gemini Pro response
    let replyText = '';
    try {
      if (data.candidates && data.candidates.length > 0) {
        const cand = data.candidates[0];
        // Gemini Pro returns content.parts[].text
        if (cand.content && cand.content.parts && cand.content.parts.length > 0) {
          replyText = cand.content.parts.map(p => p.text).join('');
        } else if (cand.output) {
          replyText = cand.output;
        }
      }

      if (!replyText && data.result) {
        replyText = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
      }
    } catch (e) {
      console.error('Parse error:', e);
    }

    if (!replyText) replyText = JSON.stringify(data);

    res.json({ response: replyText });
  } catch (error) {
    console.error('Error:', error);
    // Fallback to mock responses if API fails
    console.log('API error - falling back to mock responses');
    const mockReply = getMockResponse(req.body.message);
    res.json({ response: mockReply });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
