## Description
Goal: This project is a start to make an application with which we can map or highlight safe and or unsafe areas in an area. 

Present: An API with which live data changes a threeJS model to represent safe or unsafe places and the speed with which the user moves at that time. 
Features: Upon updating the data, the threejs model changes speed and color according to the latest data.

## Getting Started
The back-end is a dockerised node.js application made with express.

The front-end is made with ThreeJS.

Have a look at our 'contribution guidelines' if you want to contribute to the project.

# How to set up a local development environment:

1. Clone the repository:

  ```bash
  git clone https://github.com/RebeccaRosies/DevelopmentV.git
  ```
2. Change the .env.template to .env and fill in with your respective data
3. Change the database URL in dbConnection.js to your own database

4. Run docker-compose, this takes care of installing dependencies, building packages and ensuring your workspace is dev-ready.

  ```bash
 docker-compose build
 docker-compose up
  ```
  
5. To push your own version of the image to docker hub run: 

  ```bash
  docker-compose -f docker-compose.prod.yml up --build 
    ```
    
6. To run the testing with jest and super test: 

  ```bash
 cd images/api
 npm init -y
 npm run test
    ```

7. Go to the ThreeJS folder, open a new terminal and install and run node:

  ```bash
npm init -y
npm run

  ```

That's it, you are good to go! 

## Error Handling
If you run into errors you may contact me at rebecca.rosies@student.ehb.be.
Alternatively, feel free to **file a new issue** with a respective title and description on the the [RebeccaRosies/DevelopmentV](https://github.com/RebeccaRosies/DevelopmentV/issues) repository

## Status
The project is still in development.


