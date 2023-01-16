FROM node:19.4.0

COPY src .
COPY entrypoint.sh .

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
