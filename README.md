## Sobre o projeto

Arfudy Dashboard é um site para realizar o controle dos pedidos realizados através do aplicativo do Arfudy.

Atualmente, o link para acesso ao site é este [https://arfudy-dashboard-frontend.vercel.app/pratos/form](https://arfudy-dashboard-frontend.vercel.app/pratos/form)

 Ele contém uma tela inicial, que exibe os pedidos em três status: pedidos novos, em preparo e prontos:

![imagem da tela inicial](https://github.com/user-attachments/assets/d58b44d8-696d-4dea-b1fe-49f65b32a3cd)

Também, possui uma tela para a listagem e o cadastro das mesas e seu qrCode do estabelecimento:

![imagem da tela de listagem de mesas](https://github.com/user-attachments/assets/f2676835-80ba-4c9c-b80d-95fbf5e748c1)

![imagem da tela de cadastro de mesa](https://github.com/user-attachments/assets/c8c2301f-3d0d-4c38-a86d-ab40fc7e1b18)

As últimas funcionalidades existentes são as telas para listar e cadastrar pratos que irão ficar disponíveis para os clientes no aplicativo do Arfudy:

![imagem da tela de listagem de pratos](https://github.com/user-attachments/assets/1f3c94f1-34a9-48c7-a3e1-52c996fe0616)

![imagem da tela de cadastro de prato](https://github.com/user-attachments/assets/7139eb94-ea27-4858-90a3-b60b43a994d8)

## Tecnologias utilizadas
- Framework: `Next.js`
- Biblioteca de componentes: `MUI`
- Bibliotecas para auxiliar no controle de requests: `Axios`, `React Query`, `Socket.io`
- Biblioteca para conexão com store de imagens: `Edgestore`
- Bibliotecas para auxiliar nos formulários: `React-hook-form`, `Zod`
- Biblioteca para auxiliar com cards: `React-dnd`


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
