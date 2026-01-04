exports.handler = async function(event, context) {
  // Prendiamo le chiavi dalle impostazioni di Netlify
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    return { statusCode: 500, body: "Chiavi mancanti!" };
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
    
    // Usiamo il fetch nativo (senza require)
    const response = await fetch(url);
    const data = await response.json();

    const isLive = data.items && data.items.length > 0;
    const liveVideoId = isLive ? data.items[0].id.videoId : null;

    return {
      statusCode: 200,
      body: JSON.stringify({ live: isLive, videoId: liveVideoId }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    };

  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
