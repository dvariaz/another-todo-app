export interface IRefreshTokenRequestDto {
  refreshToken: string;
}

export interface IRefreshTokenResponseDto {
  access_token: string;
}

export interface ILoginResponseDto {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface ILoginErrorResponseDto {
  error: {
    message: string;
    status: number;
  };
}
