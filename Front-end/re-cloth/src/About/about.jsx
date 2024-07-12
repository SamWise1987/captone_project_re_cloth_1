import React from 'react';
import './About.css';
import logo from'../Logo/LRC.png'

const AboutPage = () => {
    return (
        <div className="about-page special-elite-regular">
            <h1>Perché Re-Cloth</h1>
            <p>
                Re-Cloth è dedicato alla riparazione di tutti i tipi di capi di abbigliamento per prolungarne la vita e
                ridurre il numero di indumenti che finiscono nelle discariche. La nostra missione è promuovere la
                sostenibilità offrendo servizi di riparazione di alta qualità per i tuoi vestiti preferiti.
            </p>
            <img src={logo} alt="Re-Cloth Logo" className="about-logo"/>
            <p>
                Scegliendo Re-Cloth, non solo risparmi denaro ma contribuisci anche a un pianeta più sano. Ogni capo che
                ripariamo è un capo in meno che contribuisce al crescente problema dei rifiuti tessili. Lavoriamo
                insieme per fare la differenza!
            </p>
        </div>
    );
}

export default AboutPage;