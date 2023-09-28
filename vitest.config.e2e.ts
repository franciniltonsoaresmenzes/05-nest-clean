import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    exclude: [...configDefaults.exclude, '**/data/pg/**'],
    globals: true,
    root: './',
  },
  plugins: [
    viteTsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
