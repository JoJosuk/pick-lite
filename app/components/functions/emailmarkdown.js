const mailer = (otp) => {
  const mail = `
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0; width: 100%; background-color: #f8f9fa"
    >
      <tr>
        <td align="center" style="padding: 20px 0">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="border-collapse: collapse"
          >
            <tr>
              <td
                align="center"
                style="
                  background-color: #ffffff;
                  padding: 40px 20px;
                  border-radius: 10px;
                "
              >
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 20px">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 77 59"
                        width="70"
                        height="50"
                      >
                        <path
                          d="M70.2308 13.9545L67.8269 50.6833C67.6974 52.6629 66.7304 54.5232 65.1237 55.8834C63.5171 57.2436 61.3925 58.0008 59.1846 58H17.8154C15.6075 58.0008 13.4829 57.2436 11.8763 55.8834C10.2696 54.5232 9.3026 52.6629 9.17308 50.6833L6.76923 13.9545M30.8077 26.9091H46.1923ZM5.32692 13.9545H71.6731C74.0615 13.9545 76 12.2135 76 10.0682V4.88636C76 2.74109 74.0615 1 71.6731 1H5.32692C2.93846 1 1 2.74109 1 4.88636V10.0682C1 12.2135 2.93846 13.9545 5.32692 13.9545Z"
                          fill="%23F59E0B"
                          fill-opacity="0.86"
                        />
                        <path
                          d="M70.2308 13.9545L67.8269 50.6833C67.6974 52.6629 66.7304 54.5232 65.1237 55.8834C63.5171 57.2436 61.3925 58.0008 59.1846 58H17.8154C15.6075 58.0008 13.4829 57.2436 11.8763 55.8834C10.2696 54.5232 9.3026 52.6629 9.17308 50.6833L6.76923 13.9545M30.8077 26.9091H46.1923M5.32692 13.9545H71.6731C74.0615 13.9545 76 12.2135 76 10.0682V4.88636C76 2.74109 74.0615 1 71.6731 1H5.32692C2.93846 1 1 2.74109 1 4.88636V10.0682C1 12.2135 2.93846 13.9545 5.32692 13.9545Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <br />
                      <h2
                        style="
                          font-size: 24px;
                          color: #333333;
                          font-family: Arial, sans-serif;
                          margin: 0;
                        "
                      >
                        Pick-lite
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      style="
                        font-size: 18px;
                        color: #333333;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <p>Hello,</p>
                      <p>Your OTP for email verification is:</p>
                      <h1>${otp}</h1>
                      <p>Thank you for using Pick-lite!</p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      style="
                        font-size: 16px;
                        color: #666666;
                        font-family: Arial, sans-serif;
                        padding-top: 20px;
                      "
                    >
                      Pick-lite
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
`;

  return mail;
};
export default mailer;
