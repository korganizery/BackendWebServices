// src/PwaComponent.tsx

import React, { useEffect } from 'react';
import { usePwa } from '../../pwa/usePwa';

interface PwaComponentProps {
    onInstall: () => void;
}

const PwaCom: React.FC<PwaComponentProps> = ({ onInstall }) => {
    const { isInStandaloneMode, installationMessage, isInstalled, promptToInstall } = usePwa();


    useEffect(() => {
        if (isInstalled) {
            onInstall();
        }
    }, [isInstalled, onInstall]);



    if (isInstalled) {
        return null; // 安装成功后不再显示组件
    }

    return (
        <div>
            <h5>PWA Example</h5>
            <p>{isInStandaloneMode ? 'PWA Running in standalone mode' : 'PWA Not running in standalone mode'}</p>
            <p>{installationMessage}</p>
            {!isInStandaloneMode && !isInstalled && <button onClick={promptToInstall}>Install PWA</button>}
        </div>
    );
};

export default PwaCom;
