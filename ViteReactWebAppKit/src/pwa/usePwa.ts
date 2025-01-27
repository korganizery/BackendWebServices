import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

interface Navigator {
    standalone?: boolean;
}

export const usePwa = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState<boolean>(false);
    const [installationMessage, setInstallationMessage] = useState<string>('');
    const [isInstalled, setIsInstalled] = useState<boolean>(false); // 新增状态来跟踪PWA是否已安装

    useEffect(() => {
        // 检测PWA安装状态
        const checkStandaloneMode = () => {
            setIsInStandaloneMode(window.matchMedia('(display-mode: standalone)').matches ||
                (navigator as Navigator).standalone ||
                window.location.search.includes('standalone'));
        };
        checkStandaloneMode();

        // 监听beforeinstallprompt事件
        const beforeInstallPromptHandler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        };
    }, []);

    useEffect(() => {
        if (isInStandaloneMode) {
            setIsInstalled(true);
        }
    }, [isInStandaloneMode]);

    const promptToInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt().then(() => {
                return deferredPrompt.userChoice;
            }).then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setInstallationMessage('PWA 安装成功！');
                    setIsInstalled(true); // 设置PWA已安装
                    console.log('用户安装了PWA');
                } else {
                    setInstallationMessage('自动安装失败，请手动安装。');
                    console.log('用户拒绝安装PWA');
                }
                setDeferredPrompt(null);
            }).catch((error) => {
                console.error('安装提示显示失败:', error);
            });
        }
    };

    // 请求通知权限并注册服务工作者
    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Notification permission not granted');
        }
    };

    const showNotification = async (title: string, options: NotificationOptions) => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification(title, options);
        }
    };

    // 处理服务器推送消息
    const handlePushMessage = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                const { title, options } = event.data;
                showNotification(title, options);
            });
        }
    };

    // 模拟推送通知
    useEffect(() => {
        const simulateNotifications = async () => {
            try {
                await requestNotificationPermission();
                // 权限被授予后显示初始通知
                await showNotification('假数据推送', {
                    body: '这是一个假数据推送通知示例。',
                    icon: './favicon.ico',
                });

                // 设置定时器每隔5秒推送一次假数据
                const timer = setInterval(() => {
                    showNotification('定时假数据推送', {
                        body: `新消息：${new Date().toLocaleTimeString()}!!!`,
                        icon: './favicon.ico',
                    });
                }, 5000);

                // 清除定时器
                return () => clearInterval(timer);
            } catch (error) {
                console.error('无法显示通知:', error);
            }
        };

        simulateNotifications();
    }, []);

    handlePushMessage(); // 启动服务器推送消息处理

    return {
        isInStandaloneMode,
        installationMessage,
        isInstalled,
        promptToInstall
    };
};
