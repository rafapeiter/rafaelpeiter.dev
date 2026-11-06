# Rafael Peiter — site pessoal

Landing page pessoal para **rafaelpeiter.dev**, com apresentação profissional, atuação, projetos de aplicativos, tecnologias, trajetória e links para LinkedIn e GitHub.

## Recursos

- Português e inglês, com escolha de idioma salva no navegador.
- Temas claro e escuro; na primeira visita, o tema segue a configuração do aparelho.
- Preferência manual de tema mantida entre visitas.
- Layout adaptado para computadores e celulares.
- Seletor entre a versão 1 (visual anterior, azul) e a versão 2 (atual, grafite e lima), com preferência salva.
- Identidade visual em grafite e verde-lima, apresentação em blocos, projetos compactos e trajetória em linhas.
- Avatar ilustrado e ícones de tecnologias armazenados junto ao site.
- Projetos Zada Finanças e Tá Barato com telas reais, descrições e links para as lojas Android e iOS.
- Projetos de ensino: simuladores de Fibonacci, Produtor-Consumidor e Codificação Digital-Digital, com ilustrações dos conceitos e links para demonstração e código-fonte.
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

## Projetos de aplicativos

A seção apresenta somente Zada Finanças e Tá Barato, confirmados pelo titular. As descrições resumem recursos descritos nas lojas oficiais, sem atribuir autoria exclusiva, números de usuários ou tecnologias de implementação não confirmadas. As imagens são materiais oficiais dos aplicativos da CantuStange e permanecem no idioma original. As descrições, rótulos e textos alternativos têm versões em português e inglês.

- Zada Finanças: https://play.google.com/store/apps/details?id=br.com.cantustange.zadafinancas e https://apps.apple.com/br/app/zada-finan%C3%A7as/id1629493500
- Tá Barato: https://play.google.com/store/apps/details?id=br.com.cantustange.tabarato e https://apps.apple.com/br/app/ta-barato/id1631590649

Os endereços de origem dos ícones e das telas estão em `dist/assets/projects/sources.json`. Os direitos das marcas e dos materiais dos aplicativos pertencem aos respectivos titulares.

## Versões do layout

A versão 2 está na raiz de `dist/`; a versão 1 fica em `dist/v1/` e preserva o visual do commit `241f88c`, incluindo os projetos de ensino. Os arquivos de imagem são compartilhados. Ambas usam o mesmo idioma e tema salvos no navegador. A escolha de versão fica em `rp-version`; sem escolha anterior, abre a versão 2. Os links `/?version=2` e `/v1/?version=1` permitem escolher explicitamente uma versão. A troca conserva a seção atual quando existe nos dois layouts.
