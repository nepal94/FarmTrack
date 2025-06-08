# 🌐 Angular Dockerfile

# Step 1: Build Angular app
FROM node:20.19-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Step 2: Serve with Nginx
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/farmtrack-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
