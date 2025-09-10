#!/bin/bash

# Setup script for UltraData v3 environment variables

echo "Setting up environment variables for UltraData v3..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Development Mode
VITE_USE_MOCK_AUTH=false

# Other Configuration
VITE_APP_TITLE=UltraData v3
EOF
    echo "✅ .env file created successfully!"
else
    echo "⚠️  .env file already exists. Please check if VITE_API_BASE_URL is set to http://localhost:8085/api"
fi

echo ""
echo "Environment setup complete!"
echo "Your frontend will now connect to the backend on port 8085."
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo "  or"
echo "  bun dev"
echo ""
echo "The frontend will run on http://localhost:3000"
echo "The backend should be running on http://localhost:8080"
