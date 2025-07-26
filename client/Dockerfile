# Use specific Node.js version for Alpine
FROM node:22.17.0-alpine

# Set working directory
WORKDIR /app

# Copy only dependency files first to leverage Docker cache
COPY package*.json ./

# Install build tools for Alpine (for native modules)
# 'build-base' provides tools like g++ and make on Alpine.
RUN apk add --no-cache build-base

# Install Node.js dependencies
RUN npm ci --legacy-peer-deps

# Explicitly install/reinstall rollup and its native binding for musl.
# This is crucial for Alpine as it uses musl libc.
RUN npm install rollup @rollup/rollup-linux-x64-musl

# --- DIAGNOSTIC STEP: Check if the module exists ---
# This command will list the contents of the directory where the missing module should be.
# Its output is CRUCIAL for debugging.
RUN ls -l /app/node_modules/@rollup/rollup-linux-x64-musl || echo "Module directory not found or empty."

# Copy the rest of the application files
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
