Backend is based on java and springboot. Frontend is done in React. In memory database apache derby is used so there's not need to configure it. 
1. You need to have java,maven and nodejs installed in your system and set system environment variables.
2. if you don't have
	-install java instruction - https://java.com/en/download/help/download_options.html
		Install java - 8 JDK or above
		Setup JAVA_HOME, PATH.	
		Verify using > java -version on command prompt
	-install maven instruction - https://maven.apache.org/download.cgi
		Install MVN
		Setup M2, M2_HOME, MAVEN_HOME, PATH.
		Verify using mvn -version on command prompt
	-install nodejs - https://nodejs.org/en/download
		Install Node 14 - [It will install npm - 6.14]
		Verify using node -v and npm -version on command prompt

There are two ways you can run the backend code:-
- In Terminal:
  1. Open cmd move to location Contact/Backend (cd Contact/Backend/contact). 
  2. Use command 'mvn install'. 
  3. Then move in to target folder(cd target). 
  4. Use command java -jar contact-0.0.1-SNAPSHOT.jar.
OR
- In IDE(Eclipse prefered):
  1. Open the java project (Contact/Backend/contact) in an Ide as a maven project.
  2. Right click on the project and do a maven update. 
  3. Then run src/main/java/com/contact/ContactApplication.java as a java application.
Backend will be up and running on port 8080.


To run the frontend:-
- In Visual Studio:
  1. Open Contact\Frontend\contact-ui in Visual Studio and in terminal run the command 'npm install' to download all the modules.
  2. Run the command 'npm start'.
  3. The frontend will be up and running on localhost:3000. Open this in browser and explore the website.
OR
- In Terminal:
  1. Open command line prompt from Contact\Frontend\contact-ui.
  2. Run the command 'npm install' to download all the modules.
  3. Run the command 'npm start'.
  4. The frontend will be up and running on localhost:3000. Open this in browser and explore the website.
