import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
// import { GetAWSAccountIdDto } from '~/modules/aws/dto/get-account-id.dto';
import {
  CognitoIdentityClient,
  CreateIdentityPoolCommand
} from '@aws-sdk/client-cognito-identity';
import * as AwsConfig from '../../config/aws';
import * as AWS from 'aws-sdk/global';

//Identity
import {
  STSClient,
  AssumeRoleCommand,
  GetCallerIdentityCommand
} from '@aws-sdk/client-sts';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { SignInDto } from '~/modules/aws/dto/get-account-id.dto';
// Set the AWS Region.
const REGION = process.env.AWS_COGNITO_REGION; //e.g. "us-east-1"
// Create an Amazon STS service client object.
const stsClient = new STSClient({ region: REGION });

@Injectable()
export class AwsService {
  protected readonly client;
  constructor(
    protected readonly awsService: HttpService,
    @Inject('AWS_GET_ID_URL')
    protected readonly getIdUrl: string
  ) {
    this.client = new CognitoIdentityClient({
      region: 'ap-northeast-1'
    });
  }

  // getId(dto: GetAWSAccountIdDto) {
  //   const { AccountId, IdentityPoolId } = dto;
  //   console.log('Why am i not running!', dto);
  //   return (async () => {
  //     let result;
  //     try {
  //       result = await this.awsService.post(
  //         this.getIdUrl,
  //         {
  //           AccountId,
  //           IdentityPoolId
  //           // IdentityPoolId:
  //           //   'arn:aws:cognito-idp:ap-northeast-1:520474630204:userpool/ap-northeast-1_P45RBIfJA'
  //         }
  //         //   {
  //         //     headers: {
  //         //       'X-AMZ-TARGET':
  //         //         'com.amazonaws.cognito.identity.model.AWSCognitoIdentityService.GetId'
  //         //     }
  //         //   }
  //       );
  //     } catch (error) {
  //       console.log('This is the error: ', error);
  //     }

  //     return result;
  //   })();
  // }

  signIn(email, password) {
    return new Promise((resolve) => {
      AwsConfig.getCognitoUser(email).authenticateUser(
        AwsConfig.getAuthDetails(email, password),
        {
          onSuccess: (result) => {
            const token = {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken()
            };
            return resolve({
              statusCode: 200,
              response: AwsConfig.decodeJWTToken(token)
            });
          },

          onFailure: (err) => {
            return resolve({
              statusCode: 400,
              response: err.message || JSON.stringify(err)
            });
          }
        }
      );
    });
  }

  idkWhatIamDoing(dto: SignInDto) {
    return new Promise((resolve) => {
      const { email, password, identityPool } = dto;
      const authenticationData = {
        Username: email,
        Password: password
      };
      const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      const poolData = {
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID, // Your user pool id here
        ClientId: process.env.AWS_COGNITO_CLIENT_ID // Your client id here
      };

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      const userData = {
        Username: email,
        Pool: userPool
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = process.env.AWS_COGNITO_REGION;

          console.log('--------------: ', result.getIdToken());
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPool, // your identity pool id here
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_PkWqfSutY':
                result.getIdToken().getJwtToken()
            }
          });

          //@ts-ignore
          AWS.config.credentials.refresh((error) => {
            if (error) {
              console.error(error);
            } else {
              return resolve({
                secret: AWS.config.credentials.secretAccessKey,
                access: AWS.config.credentials.accessKeyId,
                session: AWS.config.credentials.sessionToken
              });
            }
          });
        },

        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
          return resolve({
            err: err.message
          });
        }
      });
    });
  }

  getTempCredential(dto: SignInDto) {
    return new Promise((resolve) => {
      const { email, password, identityPool } = dto;
      const authenticationData = {
        Username: email,
        Password: password
      };
      const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      const poolData = {
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID, // Your user pool id here
        ClientId: process.env.AWS_COGNITO_CLIENT_ID // Your client id here
      };

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      const userData = {
        Username: email,
        Pool: userPool
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, result) {
          if (result) {
            console.log('You are now logged in.');

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = process.env.AWS_COGNITO_REGION;

            // Add the User's Id Token to the Cognito credentials login map.
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
              Logins: {
                'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_PkWqfSutY':
                  result.getIdToken().getJwtToken()
              }
            });

            console.log(AWS.config);
            return resolve(
              //   {
              //   secret: AWS.config.apigateway.credentials.secretAccessKey,
              //   access: AWS.config.apigateway.credentials.accessKeyId
              // }
              AWS.config
            );
          }
        });
      }
      //call refresh method in order to authenticate user and get new temp credentials
      //@ts-ignore
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Successfully logged!');
          return resolve(AWS.config);
        }
      });
    });
  }

  async assumeRole() {
    const params = {
      RoleArn:
        'arn:aws:iam::520474630204:role/Cognito_nohostedui_cat_accessAuth_Role', //ARN_OF_ROLE_TO_ASSUME
      RoleSessionName: 'session1',
      DurationSeconds: 60 * 60
    };

    try {
      //Assume Role
      const data = await stsClient.send(new AssumeRoleCommand(params));
      const rolecreds = {
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
      };
      return rolecreds;
      //Get Amazon Resource Name (ARN) of current identity
      try {
        const stsParams = { credentials: rolecreds };
        const stsClient = new STSClient(stsParams);
        const results = await stsClient.send(
          new GetCallerIdentityCommand(rolecreds)
        );
        console.log('Success', results);
      } catch (err) {
        console.log(err, err.stack);
      }
    } catch (err) {
      console.log('Error', err);
      return {};
    }
  }
}
