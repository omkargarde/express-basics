export const HTTP_RESPONSE_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};

export const HTTP_STATUS_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};

export const APP_ERROR_MESSAGE = {
  serverError: "Something went wrong, try again later",
  createdUser: "User created successfully",
  notCreatedUser: "Failed to create new user",
  userAuthenticated: "User Authenticated successfully",
  userAlreadyExist: "User already exists",
  userDoesNotExist: "User does not exist",
  userNotVerified: "user was not verified",
  invalidCredentials: "Invalid user email or password",
  notProvideAllCredentials: "All the required fields are not provided",
  tokenNotProvided: "Token is not provided",
  tokenInvalid: "Token is invalid",
};

export const literals = {
  user: "user",
};
