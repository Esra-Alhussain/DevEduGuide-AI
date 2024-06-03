const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function getCourseRecommendations(agent) {
    const userPreferences = agent.parameters; // Extract parameters from user input
    const recommendedCourses = 'Here are some courses based on your preferences...'; // Implement your logic

    agent.add(recommendedCourses);
  }

  let intentMap = new Map();
  intentMap.set('GetCourseRecommendations', getCourseRecommendations);
  agent.handleRequest(intentMap);
});
