import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { bookmarker } from "../../recoil/BookMarker";

function BookMarker() {
  const [myBookMarker, setMyBookMarker] = useRecoilState(bookmarker);
  const a = async () => {
    try {
      const checkUser: any = await axios.get("http://localhost:5000/users");
      setMyBookMarker(checkUser);
      console.log(checkUser);
    } catch {
      throw new Error("Whoops!");
    }
    // } catch(error) {
    //     console.log(error);
    //   }
  };
  a();
  return <div>{myBookMarker}</div>;
}

export default BookMarker;
