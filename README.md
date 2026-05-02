# 🎬 FlixMax – Projeto de Estudos (Inspirado na Netflix)

> ⚠️ **Aviso importante:** Este é um projeto **educacional** e **demonstrativo**, desenvolvido para fins de aprendizado e portfólio. Não está disponível para uso comercial ou redistribuição. O código é fornecido "como está" para **visualização e estudo**.

## 📌 Sobre o Projeto

FlixMax é uma aplicação fullstack inspirada na experiência de plataformas de streaming como Netflix, Apple TV+ e Amazon Prime. Foi construída para demonstrar habilidades em desenvolvimento web moderno, abrangendo tanto o frontend quanto o backend, com foco em:

- Interface sofisticada com animações fluidas (Framer Motion)
- Arquitetura limpa e organização de código
- Banco de dados relacional (SQLite)
- Sistema de perfis, catálogo, busca e lista pessoal
- Integração com trailers via YouTube

**Tecnologias utilizadas:** React, TypeScript, Vite, Node.js, Express, SQLite, Framer Motion, Axios, React Router DOM.

## 🚫 Permissões de Uso

- ✅ Permitido: clonar, estudar o código, utilizar como referência para seus próprios projetos.
- ❌ Não permitido: usar a aplicação como serviço público, hospedar comercialmente, redistribuir sem atribuição, ou utilizar os assets (imagens, marcas) para fins comerciais.

**Os nomes, logos e marcas de filmes/séries são propriedade de seus respectivos detentores.**

## 🖥️ Como Executar Localmente (para estudo)

Após clonar o repositório, siga os passos abaixo:

```bash
# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install

# Iniciar o backend (porta 4001)
npm run dev --prefix backend

# Em outro terminal, iniciar o frontend (porta 4000)
npm run dev --prefix frontend
Acesse http://localhost:4000 no navegador.

🌟 Funcionalidades em Destaque
Tela de login/cadastro com design split screen, partículas e glassmorphism.

Sistema de perfis com carrossel vertical animado (loop infinito, exclusão e criação).

Homepage com herói rotativo (5 filmes principais) e carrosséis por categoria.

Busca com resultados alinhados à esquerda e sugestões personalizadas.

Lista pessoal persistente por perfil (adicionar/remover títulos).

Modal de detalhes com descrição, ano, classificação, e player de trailer (YouTube).

Menu sanduíche com ícones profissionais e opção de trocar de perfil.

📁 Estrutura do Projeto
text
FlixMax/
├── backend/          # API Express + SQLite
│   ├── src/
│   │   ├── database/    # Conexão e seed
│   │   ├── routes/      # Endpoints
│   │   └── index.ts
│   └── flixmax.db       # Banco de dados (criado na primeira execução)
└── frontend/         # React + Vite + TypeScript
    ├── src/
    │   ├── components/   # Card, Modal, Carousel, Menu, etc.
    │   ├── pages/        # Home, Search, List, Login, Profiles
    │   ├── hooks/        # useProfiles, API services
    │   └── context/      # ProfileContext
    └── vite.config.ts
🧪 Testes e Qualidade
Este projeto é um work in progress (WIP). As principais funcionalidades foram testadas manualmente, mas não há cobertura automatizada. Futuras melhorias podem incluir:

Autenticação real (JWT, bcrypt)

Deploy em plataforma cloud (Render, Vercel, Railway)

Testes unitários e e2e

Melhorias de acessibilidade e SEO

📄 Licença
Este projeto está sob a licença MIT, com as ressalvas mencionadas acima. Consulte o arquivo LICENSE para mais detalhes (caso exista). Em caso de dúvida, use o código apenas para estudo.

Desenvolvido com 💻 e ☕ por Daniel Souza – como parte de um portfólio pessoal.
🎬 FlixMax: uma jornada de aprendizado em engenharia de software.
