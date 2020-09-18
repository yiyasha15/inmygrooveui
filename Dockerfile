FROM node:10.16.3
RUN mkdir /frontend
WORKDIR /frontend

COPY . /frontend/
RUN npm install
RUN npm run dev

EXPOSE 3000

#ENV HOST  0.0.0.0
#ENV PORT  3000

#CMD ["npm", "start"]
CMD ["npm" "run" "dev"]
