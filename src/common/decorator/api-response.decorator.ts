import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiResponse as ApiResponseModel } from '~base/base.response';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ApiResponseSchema = <T extends Type<unknown>>(
  model?: T,
  isArray = false,
  primitiveDataType: string = null
) => {
  let resultSchema: unknown = {};
  if (model || primitiveDataType) {
    if (isArray) {
      resultSchema = {
        type: 'array',
        items: primitiveDataType
          ? {
              type: primitiveDataType
            }
          : { $ref: getSchemaPath(model) }
      };
    } else {
      resultSchema = primitiveDataType
        ? {
            type: primitiveDataType
          }
        : {
            $ref: getSchemaPath(model)
          };
    }
  } else {
    resultSchema = { default: null };
  }

  return applyDecorators(
    model
      ? ApiExtraModels(ApiResponseModel, model)
      : ApiExtraModels(ApiResponseModel),
    ApiResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(ApiResponseModel)
          },
          {
            properties: {
              correlationId: {
                type: 'string',
                format: 'uuid'
              },
              result: resultSchema
            }
          }
        ]
      }
    })
  );
};
