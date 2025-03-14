

export interface SuccessResponse {
  isSuccess: true,
  Message: string
}

interface UserData {
  id: string;
  username: string;
}

export interface UserInfo {
  isSuccess: true,
  data: UserData,
  ErrMessage?: string;
}
