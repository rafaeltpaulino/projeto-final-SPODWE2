# 🍽️ Tudo de Bom - Compartilhamento de Receitas

**Tudo de Bom** é uma plataforma web para compartilhamento de receitas culinárias, desenvolvida como projeto final da disciplina **Desenvolvimento Web 2** do curso de Bacharelado em Sistemas de Informação do **IFSP - Instituto Federal de São Paulo**.

A aplicação permite que usuários cadastrem, avaliem, editem e organizem receitas por categorias, oferecendo uma experiência interativa para amantes da culinária.

---

## ✨ Funcionalidades

- **Gerenciamento de Receitas**:
  - Adicionar, editar e remover receitas.
  - Exibir lista de receitas com filtros por categoria.
  - Visualizar receita completa com ingredientes, modo de preparo e tempo estimado.
- **Gerenciamento de Usuários**:
  - Cadastro com validação de email e senha (regex).
  - Login e logout com persistência de sessão (`sessionStorage`).
  - Diferenciação de papéis (ex: "Usuário").
- **Avaliações**:
  - Usuários podem avaliar receitas e ver a nota média calculada.
- **Categorias**:
  - Organização de receitas por categorias (ex: salgados, sobremesas, etc.).
- **Interface Amigável**:
  - Design responsivo.
  - Mensagens de erro e sucesso para ações do usuário.
  - Formulários com validação em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**:
  - [React](https://reactjs.org/) (v19.2.5) - com componentes funcionais e de classe.
  - [React Router DOM](https://reactrouter.com/) (v7.14.2) - para roteamento entre páginas.
  - [Axios](https://axios-http.com/) - para consumo de dados mockados via JSON.
  - [date-fns](https://date-fns.org/) - formatação de datas.
- **Estilização**:
  - CSS customizado.
- **Ícones**:
  - [Font Awesome](https://fontawesome.com/) (via `@fortawesome/react-fontawesome`).
- **Testes**:
  - React Testing Library e Jest.

---

## 🛠️ Como Executar o Projeto

Para rodar a aplicação localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/rafaeltpaulino/projeto-final-SPODWE2.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd projeto-final-SPODWE2/tudodebom
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   # ou
   yarn start
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

> **Observação**: Os dados de receitas, usuários e categorias são carregados a partir de arquivos `.json` mockados localizados na pasta `public/api/`. Para simular um backend real, você pode substituir essas requisições por chamadas a uma API própria.

---

## 🤝 Contribuidores

Este projeto foi desenvolvido por:

- **Rafael Teixeira Paulino** - [@rafaeltpaulino](https://github.com/rafaeltpaulino)
- **Kethelyn Alves** - [@KethelynAlves](https://github.com/KethelynAlves)
- **Vinícius Tiago de Santana** - [@EnterName23](https://github.com/EnterName23)

---

## 📬 Contato

Em caso de dúvidas, sugestões ou contribuições, entre em contato através das issues do GitHub ou diretamente com os contribuidores.

---

**Aproveite para compartilhar suas melhores receitas e descobrir novos sabores! 🍲✨**
