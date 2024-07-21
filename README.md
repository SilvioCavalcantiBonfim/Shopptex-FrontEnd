# Front-End Shopptex

![angular](https://img.shields.io/badge/-Angular-white?style=for-the-badge&logo=angular&color=0F0F11&logoColor=white)
![reactivex](https://img.shields.io/badge/-ReactiveX-white?style=for-the-badge&logo=reactivex&color=B7178C&logoColor=white)
![css3](https://img.shields.io/badge/-css3-white?style=for-the-badge&logo=css3&color=1572B6&logoColor=white)

Este projeto é um front-end desenvolvido em Angular 17 para consumir a API de produtos e informações da loja, criada no curso de desenvolvimento backend Ruby da FAP/Softex.

## Funcionalidades

- **Listagem de Produtos**: Exibe uma lista de produtos com suas respectivas imagens, nomes, preços e status de promoção.
- **Detalhes da Loja**: Mostra informações sobre a loja, como nome, cor, proprietário e departamento.

## Tecnologias Utilizadas

- **Angular 17**: Framework principal para desenvolvimento do front-end.
- **HTTP Client**: Para realizar requisições à API.
- **CSS**: Para estilização das páginas.
- **RxJS**: Para manipulação de programação reativa e gerenciamento de estado.

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SilvioCavalcantiBonfim/Shopptex-FrontEnd.git
   ```
2. **Instale as dependências**:
   ```bash
   cd Shopptex-FrontEnd
   npm install
   ```

## Uso

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   ```
2. **Acesse a aplicação**:
   Abra o navegador e vá para `http://localhost:4200`.

## Configuração da API

Certifique-se de que a API Ruby está rodando e configure a URL base da API no serviço Angular responsável pelas requisições HTTP.

### Mock da API

Para rodar o mock da API proposto em aula, execute:
   ```bash
   npm run api
   ```

## Contribuição

1. **Fork o projeto**.
2. **Crie uma nova branch**:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. **Commit suas mudanças**:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. **Push para a branch**:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. **Abra um Pull Request**.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
