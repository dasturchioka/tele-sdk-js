const esbuild = require('esbuild')
const fs = require('fs')
const { execSync } = require('child_process')

// Clean the 'dist' folder
fs.rmSync('./dist', { recursive: true, force: true })

// Step 1: Generate .d.ts files using tsc
console.log('Generating TypeScript declaration files...')
execSync('tsc --emitDeclarationOnly')

// Step 2: Build JavaScript files with esbuild
esbuild
	.build({
		entryPoints: ['src/types.ts', 'src/bot.ts', 'src/utils.ts'], // Add all files here
		outdir: 'dist',
		bundle: true,
		minify: true,
		sourcemap: true,
		platform: 'node',
		target: 'esnext',
		external: ['axios'], // Externalize dependencies
	})
	.then(() => {
		console.log('Build successful!')
	})
	.catch(err => {
		console.error('Build failed:', err)
		process.exit(1)
	})
