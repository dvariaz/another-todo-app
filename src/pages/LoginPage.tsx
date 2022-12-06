import { useHistory } from "react-router-dom";

// Components
import AuthForm from "@auth/containers/AuthForm";
import ShapedImage from "@common/components/ShapedImage";

const LoginPage = () => {
  const history = useHistory();

  return (
    <div className="flex w-screen h-screen">
      <div className="page max-w-lg mx-auto my-auto">
        <div className="relative z-30">
          <div className="relative">
            <div className="absolute top-0 w-full flex justify-center">
              <h1 className="font-extrabold text-8xl md:text-9xl uppercase text-primary-shadow-100 opacity-50 tracking-widest">
                Login
              </h1>
            </div>
            <ShapedImage
              src="assets/graphics/lock.png"
              className="relative z-30"
            />
          </div>
          <AuthForm
            onSuccess={() => history.push("/dashboards")}
            onError={() => console.log("an error has occurred")}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
