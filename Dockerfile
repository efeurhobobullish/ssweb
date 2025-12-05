FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set timezone
ENV TZ=Africa/Lagos
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY . .

# Set permission
RUN chmod -R 777 /app

# Install dependencies dan browser
RUN npm install
RUN npx playwright install --with-deps

# Expose port
EXPOSE 7860

# Jalankan server
CMD ["npm", "start"]
