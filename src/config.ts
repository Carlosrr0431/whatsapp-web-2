import { ServerOptions } from './types/ServerOptions';

export default {
  secretKey: 'THISISMYSECURETOKEN',
  host: 'https://mi-wppconnect.onrender.com',
  port: '10000',
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: false,
  tokenStoreType: 'file',
  maxListeners: 100,
  customUserDataDir: '/app/userDataDir/',
webhook: {
  url: null,                   // No hay URL de webhook configurada aún
  autoDownload: true,          // Descarga automática de archivos multimedia
  readMessage: false,           // Marca los mensajes como leídos al recibirlos
  listenAcks: true,            // Escucha confirmaciones de lectura (ticks)
  onPresenceChanged: false,    // ❌ No escucha cambios de presencia (por ejemplo: "escribiendo...")
  onParticipantsChanged: false, // ❌ No escucha cambios en participantes de grupos
  onReactionMessage: false,    // ❌ No escucha reacciones (emojis)
  onPollResponse: false,        // ✅ Escucha respuestas a encuestas
  onRevokedMessage: false,      // ✅ Escucha cuando un mensaje se borra para todos
  onLabelUpdated: false,        // ✅ Escucha cambios de etiquetas
  onSelfMessage: false,        // ❌ No procesa mensajes enviados por el propio bot
  ignore: ['status@broadcast'] // Ignora mensajes del estado de WhatsApp
},
  websocket: {
    autoDownload: false,
    uploadS3: false,
  },
  chatwoot: {
    sendQrCode: false,
    sendStatus: false,
  },
  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },
  log: {
    level: 'warn', // Before open a issue, change level to silly and retry a action
    logger: ['console'],
  },
  createOptions: {
    browserArgs: [
      '--disable-web-security',
      '--no-sandbox',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
    ],
    /**
     * Example of configuring the linkPreview generator
     * If you set this to 'null', it will use global servers; however, you have the option to define your own server
     * Clone the repository https://github.com/wppconnect-team/wa-js-api-server and host it on your server with ssl
     *
     * Configure the attribute as follows:
     * linkPreviewApiServers: [ 'https://www.yourserver.com/wa-js-api-server' ]
     */
    linkPreviewApiServers: null,
  },
  mapper: {
    enable: false,
    prefix: 'tagone-',
  },
  db: {
    mongodbDatabase: 'tokens',
    mongodbCollection: '',
    mongodbUser: '',
    mongodbPassword: '',
    mongodbHost: '',
    mongoIsRemote: true,
    mongoURLRemote: '',
    mongodbPort: 27017,
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: '',
    redisDb: 0,
    redisPrefix: 'docker',
  },
  aws_s3: {
    region: 'sa-east-1' as any,
    access_key_id: null,
    secret_key: null,
    defaultBucketName: null,
    endpoint: null,
    forcePathStyle: null,
  },
} as unknown as ServerOptions;
