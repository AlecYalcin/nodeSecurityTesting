# Use uma imagem base Node.js
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta usada pelo frontend
EXPOSE 3000

# Build
RUN npm run build

# Comando de inicialização
CMD ["npm", "run", "preview"]
