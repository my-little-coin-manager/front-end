import { createGlobalStyle } from "styled-components";
import AppleSDGothicNeoB from "../fonts/AppleSDGothicNeoB.ttf";
import AppleSDGothicNeoEB from "../fonts/AppleSDGothicNeoEB.ttf";
import AppleSDGothicNeoH from "../fonts/AppleSDGothicNeoH.ttf";
import AppleSDGothicNeoL from "../fonts/AppleSDGothicNeoL.ttf";
import AppleSDGothicNeoM from "../fonts/AppleSDGothicNeoM.ttf";
import AppleSDGothicNeoR from "../fonts/AppleSDGothicNeoR.ttf";
import AppleSDGothicNeoSB from "../fonts/AppleSDGothicNeoSB.ttf";
import AppleSDGothicNeoT from "../fonts/AppleSDGothicNeoT.ttf";
import AppleSDGothicNeoUL from "../fonts/AppleSDGothicNeoUL.ttf";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: AppleSDGothicNeoB;
    src: url(${AppleSDGothicNeoB});
  }

  @font-face {
    font-family: AppleSDGothicNeoEB;
    src: url(${AppleSDGothicNeoEB});
  }

  @font-face {
    font-family: AppleSDGothicNeoH;
    src: url(${AppleSDGothicNeoH});
  }

  @font-face {
    font-family: AppleSDGothicNeoL;
    src: url(${AppleSDGothicNeoL});
  }
  
  @font-face {
    font-family: AppleSDGothicNeoM;
    src: url(${AppleSDGothicNeoM});
  }

  @font-face {
    font-family: AppleSDGothicNeoR;
    src: url(${AppleSDGothicNeoR});
  }

  @font-face {
    font-family: AppleSDGothicNeoSB;
    src: url(${AppleSDGothicNeoSB});
  }

  @font-face {
    font-family: AppleSDGothicNeoT;
    src: url(${AppleSDGothicNeoT});
  }
  
  @font-face {
    font-family: AppleSDGothicNeoUL;
    src: url(${AppleSDGothicNeoUL});
  }
`;

export default Fonts;
