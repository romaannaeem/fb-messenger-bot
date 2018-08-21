const API_AI_TOKEN = 'bba14d00a7484bb6b58015f29e86a7da';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN =
  'EAAJ2ZC12B79EBAAZBjkY5NZBRgTa3RuNqo52ZAW2KeTD6tIUmB99YdsuF97trpGMW7EVxTxtKvaLuavd0xpAHlAWMTrZC6TSZAAxZC9Wv1qa1sZBZAIvjgZBZAyVKBXM3ozx877t6C4pA7lan0KLPqkjbKp6SLCuf5sdrjpPaao5ZBozSsv3QuXukc0J';

const request = require('request');
const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text }
    }
  });
};
module.exports = event => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: 'crowdbotics_bot'
  });
  apiaiSession.on('response', response => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
