# 1️⃣ Use official Node.js LTS (Lightweight Alpine version)
FROM node:18-alpine

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and package-lock.json to optimize caching
COPY package*.json ./

# 4️⃣ Install all dependencies (both development and production)
RUN npm install

# 5️⃣ Copy rest of the application source code
COPY . .

# 6️⃣ Build the NestJS application
RUN npm run build

# 7️⃣ Expose the port that your NestJS app will run on
EXPOSE 3000

# 8️⃣ Command to start the application (npm run start)
CMD ["npm", "run", "start"]