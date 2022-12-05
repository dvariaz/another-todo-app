import { useState } from "react";

// Types
import { IUserCredentials } from "@auth/types/login";

// Hooks
import { useLoginMutation } from "@api/services/AuthService";
import { useAppDispatch } from "@common/hooks/rtk";

// Actions
import { AuthActions } from "@auth/store/slice";

interface IAuthFormProps {
  onSuccess: () => void;
  onError: (err: any) => void;
}

const AuthForm = ({ onSuccess, onError }: IAuthFormProps) => {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget) as unknown as Iterable<
      [IUserCredentials, FormDataEntryValue]
    >;
    const userCredentials = Object.fromEntries(formData);

    try {
      const data: any = await loginMutation(userCredentials).unwrap();
      dispatch(
        AuthActions.setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        })
      );

      setError("");
      onSuccess && onSuccess();
    } catch (err: any) {
      setError(err.data.message);
      onError && onError(err.data);
    }
  };

  return (
    <form className="max-w-lg p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type="text" className="input p-2" />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        autoComplete="off"
        className="input p-2"
      />
      {error && <div>{error}</div>}
      <button className="btn btn-primary mt-8">Log In</button>
    </form>
  );
};

export default AuthForm;
