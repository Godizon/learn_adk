# Stage 1: Build the React Frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Setup Python Backend
FROM python:3.10-slim
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Backend Code
COPY backend ./backend

# Copy Built Frontend from Stage 1
COPY --from=build /app/dist ./dist

# Expose the port
EXPOSE 8000

# Run the server
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]