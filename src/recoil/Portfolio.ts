import axios from "axios";
import { atom } from "recoil";

function Mydata() {
  const mydata = async () => {
    try {
      let res = await axios.get("http://localhost:5000/users");
      res = res.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  mydata();
}

export default Mydata;

export const portFolio = atom({
  key: "Portfolio",
  default: ""
});
