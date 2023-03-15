import type { ServerOptions } from 'vite'

export const viteServer: ServerOptions = {
	proxy: {
		'/foo': {
			target: 'http://127.0.0.1:7001',
			changeOrigin: true,
			rewrite: (path: string) => path.replace(/^\/foo/, '')
		}
	},
	host: '0.0.0.0'
}
