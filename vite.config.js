import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        versicherungen: resolve(__dirname, 'versicherungen/index.html'),
        pkv: resolve(__dirname, 'versicherungen/pkv/index.html'),
        bu: resolve(__dirname, 'versicherungen/bu/index.html'),
        altersvorsorge: resolve(__dirname, 'versicherungen/altersvorsorge/index.html'),
        haftpflicht: resolve(__dirname, 'versicherungen/haftpflicht/index.html'),
        hausrat: resolve(__dirname, 'versicherungen/hausrat/index.html'),
        kfz: resolve(__dirname, 'versicherungen/kfz/index.html'),
        vorsorge: resolve(__dirname, 'vorsorge/index.html'),
        rechner: resolve(__dirname, 'rechner/index.html'),
        anfrage: resolve(__dirname, 'anfrage/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        'blog-welche-versicherung': resolve(__dirname, 'blog/welche-versicherung/index.html'),
        'blog-pkv-vs-gkv': resolve(__dirname, 'blog/pkv-vs-gkv/index.html'),
        'blog-fehler-versicherungen': resolve(__dirname, 'blog/fehler-versicherungen/index.html'),
        'blog-vorsorge-sinnvoll': resolve(__dirname, 'blog/vorsorge-sinnvoll/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        'ueber-uns': resolve(__dirname, 'ueber-uns/index.html'),
        kontakt: resolve(__dirname, 'kontakt/index.html'),
        impressum: resolve(__dirname, 'rechtliches/impressum.html'),
        datenschutz: resolve(__dirname, 'rechtliches/datenschutz.html'),
        agb: resolve(__dirname, 'rechtliches/agb.html'),
      },
    },
  },
});
