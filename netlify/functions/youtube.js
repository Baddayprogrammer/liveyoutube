// netlify/functions/youtube.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Prendiamo la chiave e l'ID del canale dalle variabili d'ambiente (che imposteremo dopo su Netlify)
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    return { statusCode: 500, body: "Chiavi mancanti nella configurazione!" };
  }

  try {
    // Chiediamo a YouTube se c'è una live in corso
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Se "items" non è vuoto, vuol dire che c'è un video live
    const isLive = data.items && data.items.length > 0;
    
    // Se è live, prendiamo il link del video, altrimenti niente
    const liveVideoId = isLive ? data.items[0].id.videoId : null;

    return {
      statusCode: 200,
      body: JSON.stringify({ live: isLive, videoId: liveVideoId }),
      headers: {
        'Content-Type': 'application/json',
        // Questo permette al tuo sito di leggere la risposta
        'Access-Control-Allow-Origin': '*' 
      }
    };

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};