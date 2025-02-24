## Sobre o projeto

Arfudy Dashboard é um site para realizar o controle dos pedidos realizados através do aplicativo do Arfudy.

Atualmente, o link para acesso ao site é este [https://arfudy-dashboard-frontend.vercel.app/](https://arfudy-dashboard-frontend.vercel.app/)

## Tecnologias utilizadas

-   Framework: `Next.js`
-   Biblioteca de componentes: `Shadcn`
-   Bibliotecas para auxiliar no controle de requests: `Axios`, `React Query`, `Socket.io`
-   Biblioteca para conexão com store de imagens: `Edgestore`
-   Bibliotecas para auxiliar nos formulários: `React-hook-form`, `Zod`
-   Biblioteca para auxiliar com cards: `React-dnd`

## Iniciando

Para inicializar o projeto, e necessário rodar o comando para instalar as dependências:

```shell
npm install
```

E... pronto! Basta apenas inicializar o projeto com o comando:

```shell
npm run dev
```

Caso seja necessário uma maneira prática de atualizar as versões de todas as dependências antes de inicializar o projeto, basta executar o comando:

```shell
npx npm-check-updates -u
```

E em seguida, rodar novamente o `npm install` para instalar as dependências.

## Padrões de commits e versionamento

### Commits

A partir da versão 1.0.0 do Arfudy Dashboard, será implementado o Conventional Commits, afim de manter o projeto padronizado e fácil de identificar o que foi alterado, de que maneira, e qual foi o impacto dessa alteração. No futuro, é planejado implementar um changelog automático utilizando o `semantic-release`.

Caso não saiba o que é Conventional Commits, é um padrão para realizar os commits que auxilia na criação de um changelog uniforme. O formato que seguiremos no projeto está descrito [neste projeto do GitHub](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13), mas para facilitar, alguns exemplos são:

```
refactor(início): altera os arquivos da página inicial para a pasta (pedidos)

muda os arquivos da tela para uma pasta específica de grupo a fim de melhorar a padronização e arquitetura do código
```

```
feat: adiciona ícone ao botão de adicionar produto
```

```
fix(mesa): remove quebra de linha que cortava o título na tela de mesa
```

### Versionamento

O versionamento é no padrão `MAJOR.MINOR.PATCH`, e para realizar, basta executar:

```shell
npm version major

#ou

npm version minor

#ou

npm version patch
```

## Arquitetura

A arquitetura atual do sistema é:

![Arquitetura do projeto](https://github.com/user-attachments/assets/16d74ffc-99a2-4112-969a-988c51d4302a)

Para cada tela, buscamos criar componentes específicos para ela, e caso um surja a possibilidade de tornar um componente mais genérico, ele é movido para a pasta de components. Vale o mesmo para hooks e contextos.
