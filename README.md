# Rafael Peiter — site pessoal

Landing page pessoal para **rafaelpeiter.dev**, com apresentação profissional, atuação, tecnologias, trajetória e links para LinkedIn e GitHub.

## Recursos

- Português e inglês, com escolha de idioma salva no navegador.
- Temas claro e escuro; na primeira visita, o tema segue a configuração do aparelho.
- Preferência manual de tema mantida entre visitas.
- Layout adaptado para computadores e celulares.
- Avatar ilustrado e ícones de tecnologias armazenados junto ao site.
- Sem formulário, backend ou analytics.

## Executar e hospedar

Os arquivos publicados ficam em `dist/`. O site é HTML, CSS e JavaScript, sem dependências de instalação ou etapa de compilação.

Para uma prévia local com Python instalado, execute na raiz do repositório:

```text
python -m http.server 4173 --directory dist
```

Abra `http://localhost:4173/`. Para hospedar, publique o conteúdo de `dist/` na raiz da hospedagem estática escolhida.

## Preferências

O navegador guarda o idioma em `rp-language` e o tema em `rp-theme`, usando `localStorage`. Sem escolha manual, o tema acompanha `prefers-color-scheme`. Nenhuma preferência é enviada a um servidor.

## Conteúdo e publicação definitiva

O conteúdo foi revisado durante a criação do protótipo. Antes da publicação definitiva, confira a biografia e as datas acadêmicas, remova a tag `noindex, nofollow` de `dist/index.html`, adicione o endereço canônico `https://rafaelpeiter.dev/` e revise a nota de protótipo no rodapé. A conexão do domínio é feita separadamente na hospedagem.

## Créditos

Tipografia: Space Grotesk, Manrope e IBM Plex Mono, carregadas do Google Fonts com alternativas locais.

Ícones de tecnologias: [Devicon](https://github.com/devicons/devicon), commit `32fe1d3b3f36ad11f90ab94f7db59738139c2bf6`. Licença preservada em `dist/assets/tech/devicon-LICENSE.txt`. Alguns símbolos simples foram feitos especificamente para o site.

Avatar criado a partir de foto fornecida pelo titular e escolhido por ele. A foto original não faz parte dos arquivos publicados.
