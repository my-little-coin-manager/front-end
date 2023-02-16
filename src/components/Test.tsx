import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { testatom } from "../recoil/store";

function Test() {
  const [test, setTest] = useRecoilState(testatom);
  const plus = () => setTest(test + 1);
  const a = async () => {
    try {
      let res: any = await axios.get("http://localhost:5000/users");
      res = res.data;
      console.log(...res);
    } catch {
      throw new Error("Whoops!");
    }
    // } catch(error) {
    //     console.log(error);
    //   }
  };
  a();
  return (
    <div>
      Count : {test}
      <br />
      <button onClick={plus}>plus 1 !</button>
    </div>
  );
}

export default Test;
