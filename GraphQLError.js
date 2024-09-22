import { GraphQLError } from 'graphql';

export const throwNewGQLError = (code) => {
  switch (code) {
    case 'RESULTS_IS_ALREADY_EXIST':
      throw new GraphQLError('Results already exist', {
        extensions: {
          code: 'RESULTS_IS_ALREADY_EXIST',
          http: { status: 400 },
        },
      });

    case 'WRONG_PDF_FILE':
      throw new GraphQLError('Wrong pdf file', {
        extensions: {
          code: 'WRONG_PDF_FILE',
          http: { status: 400 },
        },
      });

    case 'USER_IS_NOT_AUTHENTICATED':
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'USER_IS_NOT_AUTHENTICATED',
          http: { status: 401 },
        },
      });

    case 'USER_NOT_FOUND':
      throw new GraphQLError('Такого пользователя не существует', {
        extensions: {
          code: 'USER_NOT_FOUND',
          http: { status: 404 },
        },
      });

    case 'PASSWORD_IS_NOT_CORRECT':
      throw new GraphQLError('Не верный пароль', {
        extensions: {
          code: 'PASSWORD_IS_NOT_CORRECT',
          http: { status: 400 },
        },
      });

    case 'USER_IS_ALREADY_EXIST':
      throw new GraphQLError('User is already exist', {
        extensions: {
          code: 'USER_IS_ALREADY_EXIST',
          http: { status: 400 },
        },
      });

    default:
      throw new GraphQLError('UnKnow error', {
        extensions: {
          code,
          http: { status: 400 },
        },
      });
  }
};
