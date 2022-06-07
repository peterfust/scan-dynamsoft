import Input from "../input/Input";
import React from "react";
import {QRCode} from "react-qrcode-logo";

export const QrCodeGenerator = () => {

    const [link, setLink] = React.useState<string>('https://scan-dynamsoft-ghubtmpoj-peterfust.vercel.app?customerId=123&consultantId=345');

    return(
        <div className="qrcode">
            <Input name="link" value={link} onChange={(e) => setLink(e.target.value)} />
            <QRCode value={link}
                    eyeRadius={5}/> {/*logoImage="https://zenon.network/img/favicon-32x32.png" logoHeight={32} logoWidth={32}*/}
        </div>
    )
}
