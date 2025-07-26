# judge/Dockerfile
FROM python:3.10

# Install compilers
RUN apt update && apt install -y g++ openjdk-17-jdk

# Set workdir
WORKDIR /app

# Copy files
COPY . .

# Default command (optional)
CMD ["tail", "-f", "/dev/null"]

