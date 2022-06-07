import React, {createElement, useState} from 'react';
import createAXAFooterSmallReact from '@axa-ch/footer-small/lib/index.react';

const AXAFooterSmallReact = createAXAFooterSmallReact(createElement);

export const Footer = () => {
    const [activeLanguage, setActiveLanguageIndex] = useState(0);

    const [disclaimerChange, setDisclaimerIndex] = useState(0);

    const handleAXAFooterLanguageClicked = (language: number) => {
        setActiveLanguageIndex(language);
    };

    const handleAXAFooterDisclaimerClicked = (disclaimer: number) => {
        setDisclaimerIndex(disclaimer);
    };

    // @ts-ignore
    return (
        <div>
            {/* @ts-ignore */}
            <AXAFooterSmallReact
                onLanguageClick={handleAXAFooterLanguageClicked}
                onDisclaimerClick={handleAXAFooterDisclaimerClicked}
                dynamic
            >
                <a
                    slot="language-item"
                    className="m-footer-small__link--active"
                    href="https://axa.ch/de/privatkunden.html"
                >
                    DE
                </a>
                <a slot="language-item" href="https://axa.ch/fr/particuliers.html">
                    FR
                </a>
                <a slot="language-item" href="https://axa.ch/it/clienti-privati.html">
                    IT
                </a>
                <a slot="language-item" href="https://axa.ch/en/private-customers.html">
                    EN
                </a>
                <a
                    slot="disclaimer-item"
                    href="https://axa.ch/en/information/terms-of-use.html"
                >
                    Terms of use
                </a>
                <a
                    slot="disclaimer-item"
                    href="https://axa.ch/en/information/data-protection.html"
                >
                    Data protection
                </a>
                <span slot="copyright">&copy; 2022 AXA Insurance Ltd.</span>
            </AXAFooterSmallReact>
        </div>
    );
};
