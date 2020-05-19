'use strict'
const dialogFlow = require('dialogflow');
const structJson = require('./structJson');
const config = require('../config/keys');
const sessionId = config. dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials});




module.exports = {
  textQuery: async function(text, userID, parameters = {}){
    let sessionPath = sessionClient.sessionPath(projectID, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode
        },
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };
    let responses = await sessionClient.detectIntent(request)
    responses = await self.handleAction(responses);  
    return responses;
  },
  eventQuery: async function(event, userID, parameters = {}){
    let sessionPath = sessionClient.sessionPath(projectID, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structJson.jsonToStructProto(parameters),
          languageCode: config.dialogFlowSessionLanguageCode
        },
      },
    };
    let responses = await sessionClient.detectIntent(request)
    responses = await self.handleAction(responses);  
    return responses;
  },
  handleAction: function(responses){
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case 'DefaultWelcomeIntent-yes':
        if (queryResult.allRequiredParamsPresent) {
          
        }
        break;
    }
    
    return responses;
  }
}

