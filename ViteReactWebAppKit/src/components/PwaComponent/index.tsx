// src/App.tsx

import React, { useState } from 'react';
import PwaComponent from './PwaCom';


const App: React.FC = () => {
    const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false);

    const handleInstall = () => {
        setIsPwaInstalled(true);
    };

    return (
        <div>
            <h5>My Apps</h5>
            {!isPwaInstalled && <PwaComponent onInstall={handleInstall} />}
            {isPwaInstalled && <p>PWA install filish</p>}
        </div>
    );
};

export default App;
