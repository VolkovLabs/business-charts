# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

# Set the work directory for the application
WORKDIR app

# COPY the needed files to the app folder in Docker image
COPY .. .

# Install the dependencies in Node environment
RUN npm install --only=dev

# Install browsers
RUN npx playwright install --with-deps chromium

# Run tests
CMD ["npm", "run", "test:e2e"]
