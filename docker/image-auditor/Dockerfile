FROM node:19.4.0

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY src /opt/app/

EXPOSE 2205

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]
