import AWS from 'aws-sdk';
import jwt_decode from 'jwt-decode';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
let cognitoAttributeList = [];

export interface ICognitoUserPoolData {
  UserPoolId: string;
  ClientId: string;
  endpoint?: string;
  AdvancedSecurityDataCollectionFlag?: boolean;
}

const poolData: ICognitoUserPoolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
};

const attributes = (key, value) => {
  return {
    Name: key,
    Value: value
  };
};

export function setCognitoAttributeList(email, agent) {
  let attributeList = [];
  attributeList.push(attributes('email', email));
  attributeList.forEach((element) => {
    cognitoAttributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(element)
    );
  });
}

export function getCognitoAttributeList() {
  return cognitoAttributeList;
}

export function getCognitoUser(email) {
  const userData = {
    Username: email,
    Pool: getUserPool()
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
}

export function getUserPool() {
  return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

export function getAuthDetails(email, password) {
  var authenticationData = {
    Username: email,
    Password: password
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

export function initAWS(
  region = process.env.AWS_COGNITO_REGION,
  identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID
) {
  AWS.config.region = region; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  });
}

export function decodeJWTToken(token) {
  //@ts-ignore
  const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken);
  return { token, email, exp, uid: sub, auth_time, token_use };
}
