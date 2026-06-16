class AppConfig {
    public readonly chatUrl = import.meta.env?.VITE_CHAT_URL;
}

export const appConfig = new AppConfig(); 
