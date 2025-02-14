# fitforge-1-16
### Pradnya Ghadge prghadge@csuchico.edu
### Siddhi Pandit smpandit@csuchico.edu
### Shaun Lewis sdlewis@csuchico.edu
### Sheldon Henriques svhenriques@csuchico.edu
### Amos Chavan anchavan@csuchico.edu

## Team Documents

- [Product Backlog](https://docs.google.com/spreadsheets/d/1aV8wOQ1cMoIzJpDANTbLwMPhGlpCFx3utmCPg1xPqn0/edit?usp=sharing)

- [Google Drive link](https://drive.google.com/drive/folders/1rXhtTBnHbtCfCw7hAS1VoHzwNcFNrbLB?usp=sharing)

- [Complete Project Proposal](https://docs.google.com/document/d/1IjBLELYTpea1wDm4hu_xZq9iV70JjgkFEY9f71dJv-I/edit?usp=sharing)

- [External Project Design-Choose a UI Prototyping Tool](https://docs.google.com/document/d/1-tqqcGswChWUN7jN4Sf9DU9MkQUvmI8ZFnk1BbKNblA/edit?usp=sharing)

- [Executive Summary for selection of UI Tool](https://docs.google.com/document/d/1jfRnbgfPCjDpVIwoj8yooWpicg-QvMpBx4PrBtgPKBg/edit?usp=sharing)

- [Internal Design](https://docs.google.com/document/d/1oJ8g2uUMzBxMgMwx9VGQkC12lJvNl5hpaZbQu7qSVJE/edit?usp=sharing)

- [Unit Testing and Code Coverage Tool](https://docs.google.com/document/d/113U6oM9YaBbzO5c1PVBiJ9UVVTmbGOan_VyP0AbqPeA/edit?usp=sharing)

- [Executive Summary of Unit Testing and Code Coverage Tool](https://docs.google.com/document/d/1htD-W2xLhKdq1PixiD-gHDnAJ-LUnG2rbA3g7b6GdX4/edit?usp=sharing)

- [Fitforge - Database setup](https://docs.google.com/document/d/1RX_yGHt6HRFlrrjEQ4bPMTxsbPoNn3E8pXgZh-zPi9g/edit?usp=sharing)


 ## Start Backend Server

``` 
cd server
 ```

``` 
npm install
 ```

``` 
npm run dev
 ```

This runs on `localhost:5000`

  ## Start React app

``` 
cd client
 ```
``` 
npm install
 ```
``` 
npm start
 ```

This runs on `localhost:3000`

## Setup .env file

Create a `.env` file inside `server` folder and add the below fields to it. This is used to connect to the database.

```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_DATABASE=...
DB_PORT=...
```

