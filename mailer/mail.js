const nodemailer = require('nodemailer')
require('dotenv').config()



const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'automobidcar@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
})

const sendMail = async (email, subjects, userName='' ,message )=>{
    const html = `
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
    }
    .image {
      display: block;
      height: auto;
      border: 0;
      max-width: 100%;
      width: 175.5px;
    }
    .social-table {
      display: inline-block;
      width: auto;
    }
    .divider_inner {
      font-size: 1px;
      line-height: 1px;
      border-top: 1px dotted #c4c4c4;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi ${ userName },</p>
    <p>${ message }</p>
    <table
      class="image_block block-4"
      width="100%"
      border="0"
      cellpadding="60"
      cellspacing="0"
      role="presentation"
    >
      <tr>
        <td class="pad">
          <div class="alignment" align="center" style="line-height: 10px">
            <a
              href="automotobids.com/"
              target="_blank"
              style="outline: none"
              tabindex="-1"
            >
              <!-- <img
                  src='logo'
                class="image"
                alt="Image"
                title="Image"
              /> -->
            </a>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <table class="row row-4	" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
      <tbody>
          <tr>
              <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 635px; margin: 0 auto;" width="635">
                      <tbody>
                          <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                          <td class="pad">
                                              <div class="alignment" align="center">
                                                  <table class="social-table" width="188px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                      <tr>
                                                          <td style="padding:0 15px 0 0px;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;"></a></td>
                                                          <td style="padding:0 15px 0 0px;"><a href="https://www.instagram.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                                          <td style="padding:0 15px 0 0px;"><a href="https://www.pinterest.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/pinterest@2x.png" width="32" height="32" alt="Pinterest" title="Pinterest" style="display: block; height: auto; border: 0;"></a></td>
                                                          <td style="padding:0 15px 0 0px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                                      </tr>
                                                  </table>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                          <td class="pad">
                                              <div style="color:#555555;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                  <p style="margin: 0; word-break: break-word;">Automotobids.com/ - Selling Cars</p>
                                                  <p style="margin: 0; word-break: break-word;">Us State</p>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="divider_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                          <td class="pad">
                                              <div class="alignment" align="center">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="60%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                      <tr>
                                                          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px dotted #C4C4C4;"><span>&#8202;</span></td>
                                                      </tr>
                                                  </table>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>


`

    const mailOptions = {
        from: 'automobidcar@gmail.com',
        to: email, 
        subject: subjects,
        html,
      };

    transpoter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
        }
        else{
            console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = {sendMail}