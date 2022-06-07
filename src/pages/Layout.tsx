import Container from "../components/container/Container";
import {Header} from "../components/heading/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/footer/Footer";
import React from "react";

export const Layout = () => {
    return (
        <Container>
            <Header title="Scan your documents"/>
            <div className="content">
                <Outlet/>
            </div>
            <Footer/>
        </Container>
    );
}
