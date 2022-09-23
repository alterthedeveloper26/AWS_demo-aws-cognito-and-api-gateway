FROM node:16.15.1-alpine
WORKDIR /usr/src/app

COPY dist ./dist
COPY node_modules ./node_modules
COPY src/migrations/* ./src/migrations/
COPY package.json .
COPY env.js .
COPY paths.js .
COPY ormconfig.js .
COPY entrypoint.sh .


EXPOSE 3001
RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "./dist/main.js"]
