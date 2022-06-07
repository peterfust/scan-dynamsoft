import Dynamsoft from "mobile-web-capture";
import {WebTwain} from "mobile-web-capture/dist/types/WebTwain";
import {useEffect} from "react";

export const Scanner = () => {
    /* When using your own license, please uncomment the following lines and fill in your own information. */
    /* To get a free trial, please visit https://www.dynamsoft.com/customer/license/trialLicense?product=dwt. */
    Dynamsoft.DWT.ProductKey = "t0153KQMAAEnbkM/JlkQune9M7TfvczNx+qg1pvyv1xLRtwEKmsJHc9XF9fYatR9UqWgCr9fIYW5Rt8CIKAo92jZvXX6lSvQNZd8wDIOiIu+V6hQ6w4f5qJFm8FDnMvrWk/niuBjU6QxPGPGN9mdszMxnD9nO3BueMOIbM3Nn7D7nWP/xJ6CtZaaR4QkjvmmZ72YVFJK4/gHRnZ6I";
    Dynamsoft.DWT.ResourcesPath = "../mobile-web-capture";
    Dynamsoft.DWT.Containers = [{ContainerId: 'dwtcontrolContainer', Width: 370, Height: 450}];
    Dynamsoft.DWT.UseLocalService = false;
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);

    useEffect(() => {
        // @ts-ignore
        if (Dynamsoft.navInfoSync.bFileSystem && Dynamsoft.DWT.UseLocalService == false) {
            Dynamsoft.DWT.AutoLoad = false;
            alert('Make sure you deploy the sample to an webserver that Runs HTTPS. Serves  the *.wasm file with Content-Type: application/wasm.');
            return;
        }
        Dynamsoft.DWT.Load();
    }, [])

    let DWObject: WebTwain;

    return (
        <div>
            <div id="dwtcontrolContainer"></div>
            <input type="button" value="scan document" onClick={ScanDocument}/>
            <input type="button" value="Load" onClick={LoadImages}/>
            <input type="button" value="SaveAsPDF" onClick={SaveAsPDF}/>
            <input type="button" value="SaveAsTiff" onClick={SaveAsTiff}/>
        </div>
    );

    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
        DWObject.Viewer.setViewMode(2, 2);
    }

    function ScanDocument() {
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

    function LoadImages() {
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

    function SaveAsPDF() {
        if (DWObject) {
            if (DWObject.HowManyImagesInBuffer == 0) {
                alert('There is no image in buffer.');
                return;
            }
            DWObject.SaveAllAsPDF("webTWAINImage.pdf");
        }
    }

    function SaveAsTiff() {
        if (DWObject) {
            if (DWObject.HowManyImagesInBuffer == 0) {
                alert('There is no image in buffer.');
                return;
            }
            DWObject.SaveAllAsMultiPageTIFF("webTWAINImage.tiff");
        }
    }
}
