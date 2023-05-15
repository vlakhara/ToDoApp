import axios from "axios";
import AppLayout from "./AppLayout";
import CommonContainer from "./common/CommonContainer";
import { useCookies } from "react-cookie";
function App() {
  const [cookies] = useCookies(["access_token"]);
  axios.defaults.headers.common["token"] = cookies["access_token"];
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <CommonContainer>
      <AppLayout />
    </CommonContainer>
  );
}

export default App;
