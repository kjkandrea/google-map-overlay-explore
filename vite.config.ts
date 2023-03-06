import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins:[
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            env
          }
        }
      })
    ]
  }
})
