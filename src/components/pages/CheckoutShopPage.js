import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useSelector } from "react-redux";
import Paypal from "../Paypal";
import SvgLoading from "../SvgLoading";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function CheckoutShopPage({ match }) {
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    const data = await fetch(
      `${config.siteUrl}/wp-json/wcm/api/products/${match.params.id}`
    );
    const items = await data.json();
    setItems(items);
    console.log(items);
  };
  const form = useRef();
  const [items, setItems] = useState([]);
  const [billing_first_name, setBilling_first_name] = useState("");
  const [billing_last_name, setBilling_last_name] = useState("");

  const [billing_country, setBilling_country] = useState("");
  const [billing_address_1, setBilling_address_1] = useState("");
  const [billing_city, setBilling_city] = useState("");

  const [billing_postcode, setBilling_postcode] = useState("");
  const [billing_phone, setBilling_phone] = useState("");
  const [billing_email, setBilling_email] = useState("");
  const [payment_method, setPayment_method] = useState("bacs");

  const [orderId, setorderId] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangebilling_first_name = (e) => {
    const billing_first_name = e.target.value;
    setBilling_first_name(billing_first_name);
  };
  const onChangebilling_last_name = (e) => {
    const billing_last_name = e.target.value;
    setBilling_last_name(billing_last_name);
  };

  const onChangebilling_country = (e) => {
    const billing_country = e.target.value;
    setBilling_country(billing_country);
  };
  const onChangebilling_address_1 = (e) => {
    const billing_address_1 = e.target.value;
    setBilling_address_1(billing_address_1);
  };

  const onChangebilling_city = (e) => {
    const billing_city = e.target.value;
    setBilling_city(billing_city);
  };

  const onChangebilling_postcode = (e) => {
    const billing_postcode = e.target.value;
    setBilling_postcode(billing_postcode);
  };

  const onChangebilling_phone = (e) => {
    const billing_phone = e.target.value;
    setBilling_phone(billing_phone);
  };

  const onChangebilling_email = (e) => {
    const billing_email = e.target.value;
    setBilling_email(billing_email);
  };
  const handlePayment_method = (e) => {
    const payment_method = e.target.value;
    setPayment_method(payment_method);
  };

  const data = {
    set_paid: false,
    status: "on-hold",
    line_items: [
      {
        product_id: items.id,
        quantity: 1,
        subtotal: items.sale_price,
        total: items.sale_price,
      },
    ],
    customer_id: currentUser && currentUser.user.id,
    payment_method: "bacs",
    payment_method_title: "Bank",
    billing: {
      first_name: billing_first_name,
      last_name: billing_last_name,
      address_1: billing_address_1,
      city: billing_city,
      country: billing_country,
      email: billing_email,
      phone: billing_phone,
      postcode: billing_postcode,
    },
  };

  const paypalData = {
    set_paid: false,
    status: "on-hold",
    line_items: [
      {
        product_id: items.id,
        quantity: 1,
        subtotal: items.sale_price,
        total: items.sale_price,
      },
    ],
    customer_id: currentUser ? currentUser.user.id : "",
    payment_method: "paypal",
    payment_method_title: "Paypal",
    billing: {
      first_name: billing_first_name,
      last_name: billing_last_name,
      address_1: billing_address_1,
      city: billing_city,
      country: billing_country,
      email: billing_email,
      phone: billing_phone,
      postcode: billing_postcode,
    },
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(data));
    if (
      billing_first_name !== "" &&
      billing_last_name !== "" &&
      billing_address_1 !== "" &&
      billing_city !== "" &&
      billing_country !== "" &&
      billing_email !== "" &&
      billing_phone !== "" &&
      billing_postcode !== ""
    ) {
      setLoading(true);

      if (payment_method == "paypal") {
        console.log("paypal");
      } else if (payment_method == "bacs") {
        fetch(
          `https://cors-anywhere.herokuapp.com/https://devam.website/wp-json/wcm/api/orders`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "dwm-tkn": currentUser.cookie,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);

            console.log("تمت الشراء بنجاح", responseJson.id);
            setorderId(responseJson.id);
            console.log(responseJson);
            console.log(currentUser.cookie);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "تمت عملية الطلب بنجاح",
              showConfirmButton: false,
              timer: 1800,
            });

            setTimeout(() => {
              window.location.href = `/order-received/${responseJson.id}`;
            }, 2500);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "من فضلك يرجى تعبئة جميع الحقول",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };

  return (
    <div>
      {isLoaded ? (
        currentUser ? (
          <Wrapper>
            <ContentWrapper>
              <Head>إتمام الطلب</Head>
              <FormsWrapper></FormsWrapper>
            </ContentWrapper>
            <FormsWrapper>
              <Order>
                <FormHeader style={{ marginBottom: "50px" }}>طلبك</FormHeader>

                <table style={{ width: "100%" }}>
                  <thead>
                    <tr
                      style={{
                        textAlign: "right",
                        marginBottom: "20px",
                        padding: "10px",
                        borderTop: "1px solid #ddd",
                      }}
                    >
                      <th
                        style={{
                          textAlign: "right",
                          padding: "10px",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        المنتج
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        المجموع
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "right", marginBottom: "20px" }}>
                    <tr
                      style={{
                        textAlign: "right",
                        marginBottom: "40px",
                        paddingBottom: "40px",
                        borderTop: "1px solid #ddd",
                      }}
                    >
                      <td style={{ textAlign: "right", padding: "10px" }}>
                        {items.name}&nbsp; <strong>×&nbsp;1</strong>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span>
                          <bdi>
                            <span style={{ textAlign: "right" }}>$</span>
                            {items.price}
                          </bdi>
                        </span>{" "}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr style={{ textAlign: "right", marginBottom: "20px" }}>
                      <th
                        style={{
                          textAlign: "right",
                          marginBottom: "20px",
                          padding: "10px",
                        }}
                      >
                        المجموع
                      </th>
                      <td style={{ textAlign: "right" }}>
                        <span>
                          <bdi>
                            <span style={{ textAlign: "right" }}>$</span>
                            {items.price}
                          </bdi>
                        </span>
                      </td>
                    </tr>

                    <tr style={{ textAlign: "right", marginBottom: "20px" }}>
                      <th style={{ textAlign: "right", padding: "10px" }}>
                        الإجمالي
                      </th>
                      <td>
                        <strong>
                          <span style={{ textAlign: "right" }}>
                            <bdi style={{ textAlign: "right" }}>
                              <span style={{ textAlign: "right" }}>$</span>
                              {items.price}
                            </bdi>
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <ul style={{ marginTop: "20px" }}>
                  <li
                    style={{
                      direction: "rtl",
                      textAlign: "right",
                      fontSize: "20px",
                      background: "#000",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      id="payment_method_bacs"
                      type="radio"
                      name="payment_method"
                      checked={payment_method === "bacs"}
                      value="bacs"
                      onChange={handlePayment_method}
                    />

                    <label
                      htmlFor="payment_method_bacs"
                      style={{
                        direction: "rtl",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      حوالة مصرفية مباشرة
                    </label>
                    <div>
                      <p
                        style={{
                          lineHeight: "140%",
                          marginTop: "20px",
                          fontSize: "14px",
                        }}
                      >
                        قم بإجراء حوالة مباشرة لأحد حساباتنا المصرفية. الرجاء
                        استخدام رقم طلبك كمرجع لعملية الدفع. لن يتم شحن طلبك حتى
                        يتم التأكد من عملية الدفع.
                      </p>
                    </div>
                  </li>
                  <li
                    style={{
                      direction: "rtl",
                      textAlign: "right",
                      fontSize: "20px",
                      background: "#000",
                      padding: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={payment_method === "paypal"}
                      value="paypal"
                      data-order_button_text="التوجه إلى PayPal"
                      style={{ marginTop: "10px" }}
                      onChange={handlePayment_method}
                    />
                    <label
                      htmlFor="payment_method_paypal"
                      style={{ marginRight: "10px" }}
                    ></label>
                    PayPal
                    <div style={{ display: "none" }}>
                      <p>
                        الدفع بواسطة PayPal؛ يمكنك الدفع باستخدام بطاقتك
                        الائتمانية إذا لم يكن لديك حساب على PayPal.
                      </p>
                    </div>
                  </li>
                </ul>
              </Order>
              <BillDetails>
                <FormHeader>تفاصيل الفاتورة</FormHeader>
                <Base onSubmit={handleLogin} ref={form}>
                  <Label>الاسم الأول</Label>
                  <InputText
                    placeholder="الاسم الأول"
                    id="billing_first_name"
                    type="billing_first_name"
                    name="billing_first_name"
                    onChange={onChangebilling_first_name}
                    value={billing_first_name}
                  />
                  <Label>الاسم الأخير</Label>

                  <InputText
                    placeholder="الاسم الأخير"
                    id="billing_last_name"
                    type="billing_last_name"
                    name="billing_last_name"
                    value={billing_last_name}
                    onChange={onChangebilling_last_name}
                  />

                  <Label>الدولة/المنطقة</Label>

                  <InputSelect
                    name="billing_country"
                    id="billing_country"
                    autocomplete="country"
                    tabindex="-1"
                    aria-hidden="true"
                    value={billing_country}
                    onChange={onChangebilling_country}
                  >
                    <option value="default">تحديد دولة / منطقة…</option>
                    <option value="IS">آيسلندا</option>
                    <option value="ET">أثيوبيا</option>
                    <option value="AZ">أذربيجان</option>
                    <option value="ER">إرتريا</option>
                    <option value="AM">أرمينيا</option>
                    <option value="AW">أروبا</option>
                    <option value="ES">إسبانيا</option>
                    <option value="AU">أستراليا</option>
                    <option value="EE">استونيا</option>
                    <option value="AF">أفغانستان</option>
                    <option value="IO">إقليم المحيط الهندي البريطاني</option>
                    <option value="PS">الأراضي الفلسطينية</option>
                    <option value="AR">الأرجنتين</option>
                    <option value="JO">الأردن</option>
                    <option value="TF">الأقاليم الجنوبية الفرنسية</option>
                    <option value="EC">الاكوادور</option>
                    <option value="AE">الإمارات العربية المتحدة</option>
                    <option value="AL">ألبانيا</option>
                    <option value="BH">البحرين</option>
                    <option value="BR">البرازيل</option>
                    <option value="PT">البرتغال</option>
                    <option value="BS">البهاما</option>
                    <option value="BA">البوسنة والهرسك</option>
                    <option value="ME">الجبل الأسود</option>
                    <option value="DZ">الجزائر</option>
                    <option value="DK">الدنمارك</option>
                    <option value="DM">الدومينيكان</option>
                    <option value="CV">الرأس الأخضر</option>
                    <option value="SV">السلفادور</option>
                    <option value="SN">السنغال</option>
                    <option value="SD">السودان</option>
                    <option value="SE">السويد</option>
                    <option value="EH">الصحراء الغربية</option>
                    <option value="SO">الصومال</option>
                    <option value="CN">الصين</option>
                    <option value="IQ">العراق</option>
                    <option value="GA">الغابون</option>
                    <option value="VA">الفاتيكان</option>
                    <option value="PH">الفلبين</option>
                    <option value="AQ">القارة القطبية الجنوبية</option>
                    <option value="CM">الكاميرون</option>
                    <option value="CG">الكونغو (برازافيل)</option>
                    <option value="CD">الكونغو (كينشاسا)</option>
                    <option value="KW">الكويت</option>
                    <option value="MV">المالديف</option>
                    <option value="DE">ألمانيا</option>
                    <option value="MA">المغرب</option>
                    <option value="MX">المكسيك</option>
                    <option value="SA">المملكة العربية السعودية</option>
                    <option value="GB">المملكة المتحدة</option>
                    <option value="NO">النرويج</option>
                    <option value="AT">النمسا</option>
                    <option value="NE">النيجر</option>
                    <option value="IN">الهند</option>
                    <option value="US">الولايات المتحدة الأمريكية</option>
                    <option value="JP">اليابان</option>
                    <option value="YE">اليمن</option>
                    <option value="GR">اليونان</option>
                    <option value="AG">أنتيغوا وباربودا</option>
                    <option value="AD">أندورا</option>
                    <option value="ID">إندونيسيا</option>
                    <option value="AO">أنغولا</option>
                    <option value="AI">أنغويلا</option>
                    <option value="UY">أوروغواي</option>
                    <option value="UZ">أوزبكستان</option>
                    <option value="UG">أوغندا</option>
                    <option value="UA">أوكرانيا</option>
                    <option value="IR">إيران</option>
                    <option value="IE">أيرلندا</option>
                    <option value="IT">إيطاليا</option>
                    <option value="PG">بابوا غينيا الجديدة</option>
                    <option value="PY">باراغواي</option>
                    <option value="BB">باربادوس</option>
                    <option value="PK">باكستان</option>
                    <option value="PW">بالاو</option>
                    <option value="PA">بانما</option>
                    <option value="BM">برمودا</option>
                    <option value="BN">بروناي</option>
                    <option value="BE">بلجيكا</option>
                    <option value="BG">بلغاريا</option>
                    <option value="BZ">بليز</option>
                    <option value="BD">بنغلاديش</option>
                    <option value="BJ">بنين</option>
                    <option value="BT">بوتان</option>
                    <option value="BW">بوتسوانا</option>
                    <option value="PR">بورتوريكو</option>
                    <option value="BF">بوركينا فاسو</option>
                    <option value="BI">بوروندي</option>
                    <option value="PL">بولندا</option>
                    <option value="BO">بوليفيا</option>
                    <option value="PF">بولينيزيا الفرنسية</option>
                    <option value="PN">بيتكيرن</option>
                    <option value="PE">بيرو</option>
                    <option value="BY">بيلاروسيا</option>
                    <option value="TH">تايلاند</option>
                    <option value="TW">تايوان</option>
                    <option value="TM">تركمانستان</option>
                    <option value="TR">تركيا</option>
                    <option value="TT">ترينيداد وتوباغو</option>
                    <option value="TD">تشاد</option>
                    <option value="CL">تشيلي</option>
                    <option value="TZ">تنزانيا</option>
                    <option value="TG">توغو</option>
                    <option value="TV">توفالو</option>
                    <option value="TK">توكيلاو</option>
                    <option value="TN">تونس</option>
                    <option value="TO">تونغا</option>
                    <option value="TL">تيمور الشرقية</option>
                    <option value="JM">جامايكا</option>
                    <option value="GI">جبل طارق</option>
                    <option value="GL">جرينلاند</option>
                    <option value="AX">جزر آلاند</option>
                    <option value="VG">جزر العذراء (المملكة المتحدة)</option>
                    <option value="VI">
                      جزر العذراء (الولايات المتحدة الأمريكية)
                    </option>
                    <option value="KM">جزر القمر</option>
                    <option value="BQ">جزر المملكة الهولندية الكاريبية</option>
                    <option value="UM">
                      جزر الولايات المتحدة الصغيرة النائية
                    </option>
                    <option value="TC">جزر تركس وكايكوس</option>
                    <option value="SB">جزر سليمان</option>
                    <option value="FO">جزر فارو</option>
                    <option value="FK">جزر فوكلاند</option>
                    <option value="KY">جزر كايمان</option>
                    <option value="CK">جزر كوك</option>
                    <option value="CC">جزر كوكوس (كيلينغ)</option>
                    <option value="MH">جزر مارشال</option>
                    <option value="MP">جزر ماريانا الشمالية</option>
                    <option value="BV">جزيرة بوفيه</option>
                    <option value="CX">جزيرة كريسماس</option>
                    <option value="IM">جزيرة مان</option>
                    <option value="NF">جزيرة نورفولك</option>
                    <option value="HM">جزيرة هيرد وجزر ماكدونالد</option>
                    <option value="CF">جمهورية إفريقيا الوسطى</option>
                    <option value="CZ">جمهورية التشيك</option>
                    <option value="DO">جمهورية الدومنيكان</option>
                    <option value="ZA">جنوب أفريقيا</option>
                    <option value="SS">جنوب السودان</option>
                    <option value="GE">جورجيا</option>
                    <option value="GS">جورجيا الجنوبية وجزر ساندويتش</option>
                    <option value="GF">جويانا الفرنسية</option>
                    <option value="DJ">جيبوتي</option>
                    <option value="JE">جيرزي</option>
                    <option value="RW">رواندا</option>
                    <option value="RU">روسيا</option>
                    <option value="RO">رومانيا</option>
                    <option value="RE">ريونيون</option>
                    <option value="ZM">زامبيا</option>
                    <option value="ZW">زيمبابوي</option>
                    <option value="CI">ساحل العاج</option>
                    <option value="WS">ساموا</option>
                    <option value="AS">ساموا الأمريكية</option>
                    <option value="PM">سان بيير وميكلون</option>
                    <option value="ST">سان تومي وبرينسيبي</option>
                    <option value="SM">سان مارينو</option>
                    <option value="BL">سانت بارتيليمي</option>
                    <option value="VC">سانت فنسنت وجزر غرينادين</option>
                    <option value="KN">سانت كيتس ونيفيس</option>
                    <option value="LC">سانت لوسيا</option>
                    <option value="MF">سانت مارتن (الجزء الفرنسي)</option>
                    <option value="SX">سانت مارتن (الجزءالهولندي)</option>
                    <option value="SH">سانت هيلينا</option>
                    <option value="LK">سريلانكا</option>
                    <option value="SJ">سفالبارد</option>
                    <option value="SK">سلوفاكيا</option>
                    <option value="SI">سلوفينيا</option>
                    <option value="SG">سنغافورة</option>
                    <option value="SZ">سوازيلاند</option>
                    <option value="SY">سوريا</option>
                    <option value="SR">سورينام</option>
                    <option value="CH">سويسرا</option>
                    <option value="SL">سيراليون</option>
                    <option value="SC">سيشيل</option>
                    <option value="RS">صربيا</option>
                    <option value="TJ">طاجيكستان</option>
                    <option value="OM">عمان</option>
                    <option value="GM">غامبيا</option>
                    <option value="GH">غانا</option>
                    <option value="GD">غرينادا</option>
                    <option value="GT">غواتيمالا</option>
                    <option value="GP">غوادلوب</option>
                    <option value="GU">غوام</option>
                    <option value="GY">غيانا</option>
                    <option value="GG">غيرنسي</option>
                    <option value="GN">غينيا</option>
                    <option value="GQ">غينيا الاستوائية</option>
                    <option value="GW">غينيا بيساو</option>
                    <option value="VU">فانواتو</option>
                    <option value="FR">فرنسا</option>
                    <option value="IL">فلسطين المحتلة (إسرائيل)</option>
                    <option value="VE">فنزويلا</option>
                    <option value="FI">فنلندا</option>
                    <option value="VN">فيتنام</option>
                    <option value="FJ">فيجي</option>
                    <option value="CY">قبرص</option>
                    <option value="KG">قرغيزستان</option>
                    <option value="QA">قطر</option>
                    <option value="KZ">كازاخستان</option>
                    <option value="NC">كاليدونيا الجديدة</option>
                    <option value="HR">كرواتيا</option>
                    <option value="KH">كمبوديا</option>
                    <option value="CA">كندا</option>
                    <option value="CU">كوبا</option>
                    <option value="CW">كوراساو</option>
                    <option value="KR">كوريا الجنوبية</option>
                    <option value="KP">كوريا الشمالية</option>
                    <option value="CR">كوستاريكا</option>
                    <option value="CO">كولومبيا</option>
                    <option value="KI">كيريباتي</option>
                    <option value="KE">كينيا</option>
                    <option value="LV">لاتفيا</option>
                    <option value="LA">لاوس</option>
                    <option value="LB">لبنان</option>
                    <option value="LU">لوكسمبورغ</option>
                    <option value="LY">ليبيا</option>
                    <option value="LR">ليبيريا</option>
                    <option value="LT">ليتوانيا</option>
                    <option value="LI">ليختنشتاين</option>
                    <option value="LS">ليسوتو</option>
                    <option value="MQ">مارتينيك</option>
                    <option value="MO">ماكاو</option>
                    <option value="MT">مالطا</option>
                    <option value="ML">مالي</option>
                    <option value="MY">ماليزيا</option>
                    <option value="YT">مايوت</option>
                    <option value="MG">مدغشقر</option>
                    <option value="EG">مصر</option>
                    <option value="MK">مقدونيا</option>
                    <option value="MW">ملاوي</option>
                    <option value="MN">منغوليا</option>
                    <option value="MR">موريتانيا</option>
                    <option value="MU">موريشيوس</option>
                    <option value="MZ">موزمبيق</option>
                    <option value="MD">مولدوفا</option>
                    <option value="MC">موناكو</option>
                    <option value="MS">مونتسيرات</option>
                    <option value="MM">ميانمار</option>
                    <option value="FM">ميكرونيزيا</option>
                    <option value="NA">ناميبيا</option>
                    <option value="NR">ناورو</option>
                    <option value="NP">نيبال</option>
                    <option value="NG">نيجيريا</option>
                    <option value="NI">نيكاراجوا</option>
                    <option value="NZ">نيوزيلندا</option>
                    <option value="NU">نييوي</option>
                    <option value="HT">هايتي</option>
                    <option value="HN">هندوراس</option>
                    <option value="HU">هنغاريا</option>
                    <option value="NL">هولندا</option>
                    <option value="HK">هونغ كونغ</option>
                    <option value="WF">واليس وفوتونا</option>
                  </InputSelect>
                  <Label>عنوان الشارع/الحي</Label>

                  <InputText
                    placeholder="عنوان الشارع/الحي"
                    id="billing_address_1"
                    type="billing_address_1"
                    name="billing_address_1"
                    value={billing_address_1}
                    onChange={onChangebilling_address_1}
                  />
                  <Label>المدينة</Label>
                  <InputText
                    placeholder="المدينة"
                    id="billing_city"
                    type="billing_city"
                    name="billing_city"
                    onChange={onChangebilling_city}
                    value={billing_city}
                  />

                  <Label>الرمز البريدي</Label>
                  <InputText
                    placeholder="الرمز البريدي"
                    id="billing_postcode"
                    type="billing_postcode"
                    name="billing_postcode"
                    onChange={onChangebilling_postcode}
                    value={billing_postcode}
                  />

                  <Label>الهاتف</Label>
                  <InputText
                    placeholder="الهاتف"
                    id="billing_phone"
                    type="billing_phone"
                    name="billing_phone"
                    onChange={onChangebilling_phone}
                    value={billing_phone}
                  />

                  <Label>البريد الإلكتروني</Label>
                  <InputText
                    placeholder="البريد الإلكتروني"
                    id="billing_email"
                    type="billing_email"
                    name="billing_email"
                    onChange={onChangebilling_email}
                    value={billing_email}
                  />
                  {payment_method == "bacs" ? (
                    <Submit type="submit" value="Login">
                      <span style={{ marginLeft: "20px" }}>تأكيد الطلب</span>
                      {loading && (
                        <span className="spinner-border spinner-border-md"></span>
                      )}
                    </Submit>
                  ) : (
                    <center>
                      {" "}
                      <Paypal
                        total={parseFloat(items.price)}
                        id={items.id}
                        paypalData={paypalData}
                      />
                    </center>
                  )}
                </Base>
              </BillDetails>
            </FormsWrapper>
          </Wrapper>
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <SvgLoading json="5" />
      )}
    </div>
  );
}

export default CheckoutShopPage;
const Wrapper = styled.div`
  width: 1234px;
  margin: auto auto;
  padding-top: 150px;
  p {
    color: #fff;
  }
  label {
    color: #fff;
  }

  @media (max-width: 1270px) {
    width: 100%;
    margin: auto;
  }
`;
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  @media (max-width: 1270px) {
    width: 100%;
    margin: auto;
    grid-template-columns: 1fr;
  }
`;
const Head = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 50px;
  text-align: center;
  @media (max-width: 1270px) {
    text-align: center;
  }
`;
const FormsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 2%;
  margin-bottom: 50px;
  @media (max-width: 1270px) {
    grid-template-columns: 1fr;
  }
`;
const FormHeader = styled.h2`
  text-align: right;
  font-size: 28px;
`;

const BillDetails = styled.div`
  background: #ffffff40;
  min-height: 800px;
  padding: 20px;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  border-radius: 9px;
  @media (max-width: 1270px) {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 1040px) {
    width: 70%;
    margin: auto;
  }
`;
const Order = styled.div`
  background: #ffffff40;
  padding: 20px;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  border-radius: 9px;
  @media (max-width: 1270px) {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 1040px) {
    width: 70%;
    margin: auto;
  }
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  z-index: 10;
  padding-top: 50px;
  margin-right: 20px;

  @media (max-width: 1040px) {
    width: 90%;
    margin: auto;
  }
`;

export const InputText = styled.input`
  /* background: #333; */
  border-radius: 4px;
  border: 0;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 30px;
  }
  @media (max-width: 1040px) {
    width: 100%;
  }
`;
export const InputSelect = styled.select`
  /* background: #333; */
  border-radius: 4px;
  border: 0;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  font-weight: 600;
  @media (max-width: 1040px) {
    width: 100%;
  }
`;

export const Submit = styled.button`
  background: #00cffd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  padding: 16px;
  border: 0;
  color: #080812;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;

const Label = styled.label`
  text-align: right;
  margin-bottom: 10px;
`;
