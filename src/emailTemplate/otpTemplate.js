
export const otpTemplate = (otpObj) => {
    return (`
    <html>
        <body>
            
            <p>Hello  <span style="color:rgb(13, 64, 117);">${otpObj.username}!</span></p>
            <center
                 style="width : 200px; 
                        margin-bottom : 40px;
                        border : 1px solid #007BFF;
                        border-radius : 10px;">
                <p style="margin : 8px;"> Your One Time Password for ${otpObj.purpose} is </p>
                <center style="color: #007BFF; font-weight: bold;">
                    ${otpObj.otp}
                </center>
                <p>Valid till next 5 minutes.</p>
                <br></br>
            </center>
            <p> Please don't share any credential to anyone.</p>
            <br></br>
            <br></br>
            <p>Warm Regards,</p>
            <h4>Team Niti</h4>
        </body>
    </html>`)
    
}