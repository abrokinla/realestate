# First stage: install dependencies
FROM public.ecr.aws/sam/build-python3.7:latest AS build

WORKDIR /app

COPY backend/flaskr/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Second stage: run application
FROM python:3.7-alpine

WORKDIR /app

COPY --from=build /app /app

COPY backend/flaskr /app

ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:$PORT", "flaskr.__init__:APP"]
