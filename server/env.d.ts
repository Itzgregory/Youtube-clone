declare global{
namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      MONGO_URI: string
      CALLBACK_GOOGLE: string
      CLIENT_ID_GOOGLE: string
      CLIENT_SECRET_GOOGLE: string
      MONGO_URL: string
    }
  }
}
export {}