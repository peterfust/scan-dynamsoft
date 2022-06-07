import React from 'react';
import './App.css';
import {Scanner} from "./components/scanner/Scanner";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {QrCodeGenerator} from "./components/qrcodegenerator/QrCodeGenerator";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Scanner />} />
                    <Route path="qrcode" element={<QrCodeGenerator />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
