import React from "react";
import styled from "styled-components";
import Fotter from "./Fotter";
import { Helmet } from "react-helmet";

function Us() {
  return (
    <Wrapper>
      <Helmet title="من نحن">
        <title>من نحن</title>
        <meta name="description" content="من نحن" data-react-helmet="true" />
      </Helmet>
      <Title>من نحن</Title>

      <Desc>
        <center>
          <img src="../images/logos/logo.svg" alt="Logo" />
        </center>
        دوام هي فكرة نوعية بامتياز، تتماشى مع المستقبل وتنتقي من خيرات الماضي،
        وما بين هذا وذاك تظل العلوم والمعارف هي حجر الزاوية في بناء شخصية
        الإنسان وتعديل السلوك المجتمعي. أننا ندرك أن الهدف المنشود ليس أمرً
        سهلًا ولكننا وبنفس القوة نؤمن أن الاطلاع والمعرفة هما أساس الثقافة
        والعلم، ولا سبيل للارتقاء بالفكر أو العمل للمجتمع إلا من باب العلم. من
        هنا جاءت البداية، وقررنا اختيار هذا الطريق الوعر نحو التصدي لغابة من
        الأفكار والثقافات والسلوكيات الخاطئة بل وتقديم البديل الموثوق لمساعدة
        أنفسنا ومجتمعنا على تصحيح الأفكار الخاطئة وإنشاء ثقافة على أُسس وقواعد
        وأدلة وبراهين. بالإضافة إلى انتهاج استخدام لغتنا العربية بهدف مساعدتها
        على استعادة مكانتها الطبيعية بين اللغات، وذلك ايمانا منا بتذليل جميع
        العقبات أمام الرواد بنقل كل شيء مفيد وذو منطق وصلة ومبني على دراسات
        وأبحاث وتجارب واجتهادات ومنشورات ومحاضرات باللغات المختلفة وتقديمها في
        محتوى عربي مفيد ومتميز وموثوق.
      </Desc>
      <Fotter />
    </Wrapper>
  );
}

export default Us;

const Wrapper = styled.div`
  width: 1234px;
  margin: auto;
  padding-top: 200px;
  direction: rtl;

  @media (max-width: 1270px) {
    margin: 0px auto;
    width: 80%;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
`;

const Desc = styled.p`
  text-align: justify;
  direction: rtl;
  font-size: 23px;
  margin-bottom: 30px;
  line-height: 160%;
  background: #dddddd14;
  padding: 50px;
  border-radius: 20px;
  @media (max-width: 1270px) {
    font-size: 18px;
  }
`;
