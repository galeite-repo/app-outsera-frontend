# App Outsera Frontend

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Angular](https://img.shields.io/badge/angular-17.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Frontend em **Angular 17.3** com **TailwindCSS** e **Flowbite**, consumindo a API de filmes da **Outsera**. Utiliza **RxJS** e **Signals** para gerenciamento de estado, com suporte a testes unitários via **Karma + Jasmine**.

---

## Tecnologias

* Angular 17.3
* TailwindCSS 3.4
* Flowbite 2.5
* RxJS 7.8
* TypeScript 5.4
* Karma + Jasmine (Testes unitários)

---

## Scripts

| Comando         | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `npm start`     | Inicia servidor de desenvolvimento (localhost:4200) |
| `npm run build` | Compila a aplicação para produção                   |
| `npm run watch` | Compila em modo watch para desenvolvimento          |
| `npm test`      | Executa testes unitários com Karma + Jasmine        |

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/galeite-repo/app-outsera-frontend
cd app-outsera-frontend
```

2. Instale dependências:

```bash
npm install
```

3. Configure a API no arquivo `environment.ts`:

```ts
export const environment = {
  production: false,
  OUTSERA_API_URL: 'https://challenge.outsera.tech/api/movies'
};
```

4. Inicie o servidor:

```bash
npm start
```

Abra no navegador: `http://localhost:4200`

---

## Testes Unitários

Executa todos os testes com **Karma + Jasmine**:

```bash
npm test
```

Os testes incluem:

* Verificação de serviços (`DashboardService`, `MovieService`)
* Estados de loading e error
* Requisições HTTP simuladas com `HttpClientTestingModule`

---

## Estrutura do Projeto

```
src/app/components
├─ pages/
│ ├─ dashboard/ # Dashboard + serviços relacionados
│ ├─ movies/ # Filmes + serviços relacionados
├─ layout/ # Componentes compartilhados (menu, etc.)
└─ ...
```

### Componentes Principais

* **DashboardComponent**: Exibe estatísticas, anos com múltiplos vencedores e estúdios com mais prêmios
* **MoviesComponent**: Lista de filmes com filtros, paginação e destaque de vencedores
* **MenuComponent**: Sidebar de navegação

---

## Funcionalidades

* Consumo de API externa de filmes
* Filtros por ano e vencedor
* Paginação avançada
* Dashboard de estatísticas
* Suporte a modo **dark/light**
* Testes unitários com cobertura completa

---

## Referências

* [Angular Official Docs](https://angular.io/docs)
* [TailwindCSS](https://tailwindcss.com/docs)
* [Flowbite](https://flowbite.com/docs/)
* [Outsera Challenge API](https://challenge.outsera.tech/api/movies)

---

## Observações

* Angular 17.3 com **standalone components**
* Serviços usam **RxJS + Signals**
* Testes utilizam **HttpClientTestingModule** para simular requisições HTTP

---

## Licença

MIT License © Gabriel Leite
