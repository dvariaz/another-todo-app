import { useHistory } from "react-router-dom";

// Components
import AuthForm from "@auth/containers/AuthForm";

const LoginPage = () => {
  const history = useHistory();

  return (
    <div className="page max-w-lg mx-auto">
      <h1 className="page-title">Login</h1>
      <div>
        <div className="border-8 border-gray-200 rounded-3xl inline-block my-5 mx-auto">
          <i className="isax isax-user text-9xl text-gray-200" />
        </div>
        <AuthForm
          onSuccess={() => history.push("/dashboards")}
          onError={() => console.log("an error has occurred")}
        />
      </div>
    </div>
  );
};

export default LoginPage;
