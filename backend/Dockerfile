FROM python:3.8

# Set the working directory
WORKDIR /app

# Copy your project files to the container
COPY . /app

# install Python packages from requirements.txt
RUN pip install -r requirements.txt

# Set environment variables
ENV FLASK_APP=flaskr
ENV FLASK_ENV=development

# Specify the command to run your application
CMD flask run --host 0.0.0.0

# Expose the port your application listens on
EXPOSE 5000
