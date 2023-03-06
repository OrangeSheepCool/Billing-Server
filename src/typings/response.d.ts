type ResponseData<T> = {
  data?: T;
  message?: string;
};

type SignInResponse = ResponseData<{
  access_token: string;
}>;
type SignUpResponse = ResponseData<undefined>;

type UpdateUserResponse = ResponseData<undefined>;
