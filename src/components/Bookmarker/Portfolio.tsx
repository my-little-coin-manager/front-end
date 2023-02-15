import axios from "axios";
import React from "react";

function Portfolio() {
  const a = async () => {
    try {
      const checkUser = await axios.get("http://localhost:5000/users");
      console.log(checkUser);
    } catch {
      throw new Error("Whoops!");
    }
    // } catch(error) {
    //     console.log(error);
    //   }
  };
  a();
  return <div></div>;
}

export default Portfolio;
