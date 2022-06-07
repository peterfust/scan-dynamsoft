import Dynamsoft from "mobile-web-capture";
import {WebTwain} from "mobile-web-capture/dist/types/WebTwain";
import {useEffect} from "react";
import Button from "../button/Button";
import "./Scanner.css"
import axios from "axios";

export interface IMetadata {
    fileName: string,
    customerId: string,
    consultantId: string,
    processId: string
}

export const Scanner = () => {

    /* When using your own license, please uncomment the following lines and fill in your own information. */
    /* To get a free trial, please visit https://www.dynamsoft.com/customer/license/trialLicense?product=dwt. */
    Dynamsoft.DWT.ProductKey = "t0153KQMAAEnbkM/JlkQune9M7TfvczNx+qg1pvyv1xLRtwEKmsJHc9XF9fYatR9UqWgCr9fIYW5Rt8CIKAo92jZvXX6lSvQNZd8wDIOiIu+V6hQ6w4f5qJFm8FDnMvrWk/niuBjU6QxPGPGN9mdszMxnD9nO3BueMOIbM3Nn7D7nWP/xJ6CtZaaR4QkjvmmZ72YVFJK4/gHRnZ6I";
    Dynamsoft.DWT.ResourcesPath = "../mobile-web-capture";
    Dynamsoft.DWT.Containers = [{ContainerId: 'dwtcontrolContainer', Height: 200}];
    Dynamsoft.DWT.UseLocalService = false;
    let DWObject: WebTwain;

    useEffect(() => {
        Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', ready);
        // @ts-ignore
        if (Dynamsoft.navInfoSync.bFileSystem && Dynamsoft.DWT.UseLocalService == false) {
            Dynamsoft.DWT.AutoLoad = false;
            alert('Make sure you deploy the sample to an webserver that Runs HTTPS. Serves  the *.wasm file with Content-Type: application/wasm.');
            return;
        }
        Dynamsoft.DWT.Load();
    }, [])

    const ready = () => {
        DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
        DWObject.Viewer.setViewMode(2, 2);
    }

    const scanDocument = () => {
        var showVideoConfigs = {
            scannerViewer: {
                autoDetect: {
                    enableAutoDetect: true
                }
            },
            filterViewer: {
                exitDocumentScanAfterSave: true
            }
        };


        if (DWObject) {
            if (!DWObject.UseLocalService) {
                DWObject.Addon.Camera.scanDocument(showVideoConfigs).then(
                    function () {
                    },
                    function (error) {
                        alert(error.message);
                    });
            }
        }
    }

    const upload = () => {
        if (DWObject) {
            const indices = [];
            if (DWObject.HowManyImagesInBuffer == 0) {
                alert('There is no image in buffer.');
                return;
            }
            for (let i = 0; i < DWObject.HowManyImagesInBuffer; i++){
                indices.push(i);
            }
            const successCallback = (
                result: Blob,
                indices: number[],
                type: number) => {
                console.log('responseHandler', result, indices, type);
                uploadBlob(result, {processId: 'TEST', fileName: 'test.pdf', customerId: 'ABC-123', consultantId: 'BCD-23423'})
            }
            const failureCallBack = (
                errorCode: number,
                errorString: string) => {
                console.log('failureCallBack', errorCode, errorString)
            }
            const PDF = 4;
            DWObject.ConvertToBlob( indices, PDF, successCallback, failureCallBack);
        }
    }

    const uploadBlob =  (file: Blob, metadata: IMetadata) => {
        let data = new FormData();
        data.append('metadata', JSON.stringify(metadata));
        data.append('file', file, metadata.fileName);
        axios.post("/path/to/api", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    const loadImages = () => {
        if (DWObject) {
            if (DWObject.Addon && DWObject.Addon.PDF) {
                DWObject.Addon.PDF.SetResolution(300);
                DWObject.Addon.PDF.SetConvertMode(Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL);
            }
            DWObject.LoadImageEx('', -1,
                function () {
                },
                function (errorCode, errorString) {
                    alert('Load Image:' + errorString);
                }
            );
        }
    }

    const saveAsPDF = () => {
        if (DWObject) {
            if (DWObject.HowManyImagesInBuffer == 0) {
                alert('There is no image in buffer.');
                return;
            }
            DWObject.SaveAllAsPDF("webTWAINImage.pdf");
        }
    }

    const saveAsTiff = () => {
        if (DWObject) {
            if (DWObject.HowManyImagesInBuffer == 0) {
                alert('There is no image in buffer.');
                return;
            }
            DWObject.SaveAllAsMultiPageTIFF("webTWAINImage.tiff");
        }
    }

    return (
        <div>
            <div id="dwtcontrolContainer"></div>
            <div className="controlbar">
                {/* @ts-ignore */}
                <Button onClick={scanDocument}>Scan</Button>
                {/* @ts-ignore */}
                <Button onClick={upload}>Upload</Button>
            </div>
        </div>
    );
}
