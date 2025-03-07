/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/optc-box-manager/',
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    assetsInlineLimit: 0,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['src/optcdb', 'src/optc-ships', 'node_modules'],
  },
  preview: {
    https: {
      pfx: './cert.pfx',
      passphrase: 'optc-box-manager-pwd',
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths({ projects: ['./tsconfig.json'] }),
    svgrPlugin(),
    VitePWA({
      devOptions: {
        enabled: false,
        type: 'module',
      },
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      // strategies: 'injectManifest',
      // injectManifest: {
      //   maximumFileSizeToCacheInBytes: 10000000,
      //   globPatterns: ['**/*.{js,css,html,png,svg}'],
      // },
      // srcDir: 'src',
      // filename: 'service-worker.ts',

      strategies: 'generateSW',
      workbox: {
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 50000000,
        globPatterns: ['**/*.{js,css,json,html,png,svg}'],
      },

      manifest: {
        short_name: 'OPTC-BM',
        name: 'OPTC Box Manager',
        display: 'standalone',
        theme_color: '#efaf55',
        background_color: '#47362a',
        start_url: './',
        scope: '.',
        icons: [
          {
            src: 'windows10/Square71x71Logo.scale-400.png',
            sizes: '284x284',
          },
          {
            src: 'windows10/Square71x71Logo.scale-200.png',
            sizes: '142x142',
          },
          {
            src: 'windows10/Square71x71Logo.scale-100.png',
            sizes: '71x71',
          },
          {
            src: 'windows10/Square71x71Logo.scale-150.png',
            sizes: '107x107',
          },
          {
            src: 'windows10/Square71x71Logo.scale-125.png',
            sizes: '89x89',
          },
          {
            src: 'windows10/Square150x150Logo.scale-400.png',
            sizes: '600x600',
          },
          {
            src: 'windows10/Square150x150Logo.scale-200.png',
            sizes: '300x300',
          },
          {
            src: 'windows10/Square150x150Logo.scale-100.png',
            sizes: '150x150',
          },
          {
            src: 'windows10/Square150x150Logo.scale-150.png',
            sizes: '225x225',
          },
          {
            src: 'windows10/Square150x150Logo.scale-125.png',
            sizes: '188x188',
          },
          {
            src: 'windows10/Wide310x150Logo.scale-400.png',
            sizes: '1240x600',
          },
          {
            src: 'windows10/Wide310x150Logo.scale-200.png',
            sizes: '620x300',
          },
          {
            src: 'windows10/Wide310x150Logo.scale-100.png',
            sizes: '310x150',
          },
          {
            src: 'windows10/Wide310x150Logo.scale-150.png',
            sizes: '465x225',
          },
          {
            src: 'windows10/Wide310x150Logo.scale-125.png',
            sizes: '388x188',
          },
          {
            src: 'windows10/Square310x310Logo.scale-400.png',
            sizes: '1240x1240',
          },
          {
            src: 'windows10/Square310x310Logo.scale-200.png',
            sizes: '620x620',
          },
          {
            src: 'windows10/Square310x310Logo.scale-100.png',
            sizes: '310x310',
          },
          {
            src: 'windows10/Square310x310Logo.scale-150.png',
            sizes: '465x465',
          },
          {
            src: 'windows10/Square310x310Logo.scale-125.png',
            sizes: '388x388',
          },
          {
            src: 'windows10/Square44x44Logo.scale-400.png',
            sizes: '176x176',
          },
          {
            src: 'windows10/Square44x44Logo.scale-200.png',
            sizes: '88x88',
          },
          {
            src: 'windows10/Square44x44Logo.scale-100.png',
            sizes: '44x44',
          },
          {
            src: 'windows10/Square44x44Logo.scale-150.png',
            sizes: '66x66',
          },
          {
            src: 'windows10/Square44x44Logo.scale-125.png',
            sizes: '55x55',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-256_altform-unplated.png',
            sizes: '256x256',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-48_altform-unplated.png',
            sizes: '48x48',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-24_altform-unplated.png',
            sizes: '24x24',
          },
          {
            src: 'windows10/Square44x44Logo.targetsize-16_altform-unplated.png',
            sizes: '16x16',
          },
          {
            src: 'windows10/StoreLogo.scale-400.png',
            sizes: '200x200',
          },
          {
            src: 'windows10/StoreLogo.scale-200.png',
            sizes: '100x100',
          },
          {
            src: 'windows10/StoreLogo.scale-150.png',
            sizes: '75x75',
          },
          {
            src: 'windows10/StoreLogo.scale-125.png',
            sizes: '63x63',
          },
          {
            src: 'windows10/StoreLogo.scale-100.png',
            sizes: '50x50',
          },
          {
            src: 'windows10/StoreLogo.png',
            sizes: '50x50',
          },
          {
            src: 'windows10/SplashScreen.scale-400.png',
            sizes: '2480x1200',
          },
          {
            src: 'windows10/SplashScreen.scale-200.png',
            sizes: '1240x600',
          },
          {
            src: 'windows10/SplashScreen.scale-150.png',
            sizes: '930x450',
          },
          {
            src: 'windows10/SplashScreen.scale-125.png',
            sizes: '775x375',
          },
          {
            src: 'windows10/SplashScreen.scale-100.png',
            sizes: '620x300',
          },
          {
            src: 'android/android-launchericon-512-512.png',
            sizes: '512x512',
          },
          {
            src: 'android/android-launchericon-192-192.png',
            sizes: '192x192',
          },
          {
            src: 'android/android-launchericon-144-144.png',
            sizes: '144x144',
          },
          {
            src: 'android/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: 'android/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: 'android/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: 'ios/ios-appicon-1024-1024.png',
            sizes: '1024x1024',
          },
          {
            src: 'ios/ios-appicon-180-180.png',
            sizes: '180x180',
          },
          {
            src: 'ios/ios-appicon-152-152.png',
            sizes: '152x152',
          },
          {
            src: 'ios/ios-appicon-120-120.png',
            sizes: '120x120',
          },
          {
            src: 'ios/ios-appicon-76-76.png',
            sizes: '76x76',
          },
          {
            src: 'ios/ios-launchimage-750-1334.png',
            sizes: '750x1334',
          },
          {
            src: 'ios/ios-launchimage-1334-750.png',
            sizes: '1334x750',
          },
          {
            src: 'ios/ios-launchimage-1242-2208.png',
            sizes: '1242x2208',
          },
          {
            src: 'ios/ios-launchimage-2208-1242.png',
            sizes: '2208x1242',
          },
          {
            src: 'ios/ios-launchimage-640-960.png',
            sizes: '640x960',
          },
          {
            src: 'ios/ios-launchimage-640-1136.png',
            sizes: '640x1136',
          },
          {
            src: 'ios/ios-launchimage-1536-2048.png',
            sizes: '1536x2048',
          },
          {
            src: 'ios/ios-launchimage-2048-1536.png',
            sizes: '2048x1536',
          },
          {
            src: 'ios/ios-launchimage-768-1024.png',
            sizes: '768x1024',
          },
          {
            src: 'ios/ios-launchimage-1024-768.png',
            sizes: '1024x768',
          },
        ],
      },
    }),
  ],
})
