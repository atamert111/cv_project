# Use a base Python image
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gir1.2-vips-8.0 \
    && rm -rf /var/lib/apt/lists/*  
    
# RUN apk add --no-cache gobject-introspection \
# pango \
# cairo glib fontconfig \
# fonts-dejavu-core \
# fonts-noto 

  
# Set the working directory in the container
WORKDIR /app

# Copy the project requirements file
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY ./src/main.py    /app/
COPY ./src/pages/     /app/pages
COPY ./src/static/    /app/static
COPY ./src/templates/ /app/templates

# Expose a port (if needed, e.g., for a web app)
EXPOSE 5000

ENV FLASK_APP=/app/main.py 

# Specify the command to run the application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
