const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserVerification = require("../model/UserVerificationSchema");
const PasswordReset = require("../model/passwordReset");
require("dotenv").config();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "automobidcar@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

//testing success
transpoter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send message");
  }
});

const sendMail = async (email, subjects, userName = "", message) => {
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
    <h1>Hi ${userName},</h1>
    <p>${message}</p>
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


`;

  const mailOptions = {
    from: "automobidcar@gmail.com",
    to: email,
    subject: subjects,
    html,
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendVerificationEmail = async ({ _id, email }, res) => {
  //url to be used in email
  const currentUrl = "https://automobidbackend.onrender.com/api/v1/auth/"; //Todo: Update current Url

  const uniqueString = uuidv4() + _id;

  const Exp_message = `This link <b>expires in 6 hours</b>.<p>
  Click 
  <a class="button-link" href="${currentUrl + "user/verify/" + _id + "/" + uniqueString}">
    Proceed
  </a> 
  to continue.
</p>`;
  const message = "Verify your email address to complete the sign up process";
  // const html = `
  // <head>
  //   <style>
  //     body {
  //       font-family: Arial, sans-serif;
  //       background-color: #f5f5f5;
  //       margin: 0;
  //       padding: 0;
  //     }
  //     .container {
  //       max-width: 600px;
  //       margin: 0 auto;
  //       padding: 20px;
  //       background-color: #fff;
  //       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //     }
  //     h1 {
  //       color: #333;
  //     }
  //     p {
  //       color: #555;
  //     }
  //     .image {
  //       display: block;
  //       height: auto;
  //       border: 0;
  //       max-width: 100%;
  //       width: 175.5px;
  //     }
  //     .social-table {
  //       display: inline-block;
  //       width: auto;
  //     }
  //     .divider_inner {
  //       font-size: 1px;
  //       line-height: 1px;
  //       border-top: 1px dotted #c4c4c4;
  //     }
  //   </style>
  //   <style>
  //   .button-link {
  //     display: inline-block;
  //     padding: 12px 24px;
  //     font-size: 16px;
  //     text-align: center;
  //     text-decoration: none;
  //     color: #fff;
  //     background-color: #007bff; /* Set your desired background color */
  //     border: 2px solid #007bff; /* Set your desired border color */
  //     border-radius: 5px;
  //     transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  //   }
  
  //   .button-link:hover {
  //     background-color: #0056b3; /* Darker shade on hover */
  //     border-color: #0056b3;
  //   }
  // </style>
  //   </head>
  // <body>
  //   <div class="container">
  //     <p>${message}</p>
  //     <p>${Exp_message}</p>
  //     <table
  //       class="image_block block-4"
  //       width="100%"
  //       border="0"
  //       cellpadding="60"
  //       cellspacing="0"
  //       role="presentation"
  //     >
  //       <tr>
  //         <td class="pad">
  //           <div class="alignment" align="center" style="line-height: 10px">
  //             <a
  //               href="automotobids.com/"
  //               target="_blank"
  //               style="outline: none"
  //               tabindex="-1"
  //             >
  //               <!-- <img
  //                   src='logo'
  //                 class="image"
  //                 alt="Image"
  //                 title="Image"
  //               /> -->
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //     </table>
  //   </div>
  //   <table class="row row-4	" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  //       <tbody>
  //           <tr>
  //               <td>
  //                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 635px; margin: 0 auto;" width="635">
  //                       <tbody>
  //                           <tr>
  //                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
  //                                   <table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  //                                       <tr>
  //                                           <td class="pad">
  //                                               <div class="alignment" align="center">
  //                                                   <table class="social-table" width="188px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
  //                                                       <tr>
  //                                                           <td style="padding:0 15px 0 0px;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;"></a></td>
  //                                                           <td style="padding:0 15px 0 0px;"><a href="https://www.instagram.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
  //                                                           <td style="padding:0 15px 0 0px;"><a href="https://www.pinterest.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/pinterest@2x.png" width="32" height="32" alt="Pinterest" title="Pinterest" style="display: block; height: auto; border: 0;"></a></td>
  //                                                           <td style="padding:0 15px 0 0px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
  //                                                       </tr>
  //                                                   </table>
  //                                               </div>
  //                                           </td>
  //                                       </tr>
  //                                   </table>
  //                                   <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  //                                       <tr>
  //                                           <td class="pad">
  //                                               <div style="color:#555555;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
  //                                                   <p style="margin: 0; word-break: break-word;">Automotobids.com/ - Selling Cars</p>
  //                                                   <p style="margin: 0; word-break: break-word;">Us State</p>
  //                                               </div>
  //                                           </td>
  //                                       </tr>
  //                                   </table>
  //                                   <table class="divider_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  //                                       <tr>
  //                                           <td class="pad">
  //                                               <div class="alignment" align="center">
  //                                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="60%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  //                                                       <tr>
  //                                                           <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px dotted #C4C4C4;"><span>&#8202;</span></td>
  //                                                       </tr>
  //                                                   </table>
  //                                               </div>
  //                                           </td>
  //                                       </tr>
  //                                   </table>
  //                               </td>
  //                           </tr>
  //                       </tbody>
  //                   </table>
  //               </td>
  //           </tr>
  //       </tbody>
  //   </table>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </body>
  
  
  // `;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center; /* Center align the content inside the container */
      }
  
      p {
        color: #333;
        margin-bottom: 20px; /* Add some space below paragraphs */
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        color: #fff;
        background-color: #007bff;
        border: 2px solid #007bff;
        border-radius: 5px;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
  
      .button:hover {
        background-color: #0056b3;
        border-color: #0056b3;
      }
  
      /* Additional styles for better spacing */
      .social-table {
        margin-top: 20px; /* Add space above the social icons */
      }
  
      .divider_inner {
        margin-top: 20px; /* Add space above the divider */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>Hello,</p>
      <p>Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
  
      <a class="button" href="${currentUrl + "user/verify/" + _id + "/" + uniqueString}">Verify Email</a>
  
      <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tbody>
          <tr>
            <td>
              <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 635px; margin: 0 auto;" width="635">
                <tbody>
                  <!-- Replace the following with your actual content -->
                  <tr>
                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                      <table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tr>
                          <td class="pad">
                            <div class="alignment" align="center">
                              <table class="social-table" width="188px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                <tr>
                                  <td style="padding:0 15px 0 0px;">
                                    <a href="https://www.twitter.com" target="_blank">
                                      <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;">
                                    </a>
                                  </td>
                                  <td style="padding:0 15px 0 0px;">
                                    <a href="https://www.instagram.com" target="_blank">
                                      <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;">
                                    </a>
                                  </td>
                                  <td style="padding:0 15px 0 0px;">
                                    <a href="https://www.pinterest.com" target="_blank">
                                      <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/pinterest@2x.png" width="32" height="32" alt="Pinterest" title="Pinterest" style="display: block; height: auto; border: 0;">
                                    </a>
                                  </td>
                                  <td style="padding:0 15px 0 0px;">
                                    <a href="https://www.linkedin.com/" target="_blank">
                                      <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;">
                                    </a>
                                  </td>
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
                                  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px dotted #C4C4C4;">
                                    <span>&#8202;</span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- End of additional content -->
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  </html>
  
  `
  const mailOptions = {
    from: "automobidcar@gmail.com",
    to: email,
    subject: "Verify your email",
    html,
  };

  try {
    //hash uniqueString
    const salt = await bcrypt.genSalt();
    const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
    //set values in userverification shcema
    const newVerification = await UserVerification.create({
      uniqueString: hashedUniqueString,
      userId: _id,
      createdAt : Date.now(),
      expiresAt: Date.now() + 21600000
    });
    transpoter.sendMail(mailOptions, (error, info)=>{
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: "FAILED",
          message: "Verification email failed",
        });
      }else{
        console.log('Email sent' + info.response);
       return res.status(200).json({
          status: "PENDING",
          message: "Verification email sent",
        });
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "FAILED",
      message: "An error occured",
    });
  }
};

const sendResetEmail = async ({_id,email, userName}, redirectUrl, res)=>{
  const resetString = uuidv4() + _id

  //clear existing records
  try {
    await PasswordReset.deleteMany({userId:_id})
    const message = "We received a request to reset your password. To complete the process, click the link below:";
    const Exp_message = `This link <b>expires in 1 hours</b>. <p><a href=${
      redirectUrl + "/" + _id + "/" + resetString
    }>Reset Password</a></p>`;  
    const Ignoremessage = "If you didn't request this change, please ignore this email. Your password will remain unchanged."
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
        <h1>Hello ${userName},</h1>
        <p>${message}</p>
        <p>${Exp_message}</p>
        <p>${Ignoremessage}</p>
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
    
    
    `;
  
    const mailOptions = {
      from: "automobidcar@gmail.com", 
      to: email,
      subject: "Password Reset",
      html,
    };
    //hash reset string
    const salt = await bcrypt.genSalt()
    const hashedResetString = await bcrypt.hash(resetString, salt)

    const newPasswordReset = await PasswordReset.create({
      userId: _id,
      resetString: hashedResetString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000
    })
    transpoter.sendMail(mailOptions, (error, info)=>{
      if (error) {
        console.log('An error occured while sending mail');
        return res.status(400).json({
          status: "FAILED",
          message: "Password reset email sent",
        });
      }
      else{
        console.log('Email sent ' + info.response);
        return res.status(200).json({
          status: "PENDING",
          message: "Password reset email sent",
        });
      }
    })
  } catch (error) {
    console.log(error); //error
    res.status(500).json({
      status: "FAILED",
      message: "An error occured",
    });
  }
}
module.exports = { sendMail, sendVerificationEmail,sendResetEmail };
