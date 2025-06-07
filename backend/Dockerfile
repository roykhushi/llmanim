# Use Python 3.10 slim as base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    # FFmpeg for video processing
    ffmpeg \
    # LaTeX dependencies for text rendering
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra \
    # Additional LaTeX packages that Manim might need
    texlive-science \
    texlive-pictures \
    # Build tools
    build-essential \
    gcc \
    g++ \
    # Cairo and Pango for graphics
    libcairo2-dev \
    libpango1.0-dev \
    pkg-config \
    # Additional graphics libraries
    libgirepository1.0-dev \
    # Git for potential package installations
    git \
    # Clean up to reduce image size
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directory for temporary Manim output
RUN mkdir -p /app/temp

# Render uses the PORT environment variable
EXPOSE $PORT

# Command to run the application
# Use gunicorn for production with proper timeout settings
CMD gunicorn main:app -w 1 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT --timeout 300