### **project title:** UNKOWN







### **project description:**

a chat application for smooth and secure communication between peoples without any need of personal contact info or login/signup option, while maintaining the complete privacy by removing all the data just after the communication get over







### **Requirements:** 

1. a landing page explain the complete project 
2. landing page mainly consists of 3 things:
    1. beginner friendly intro about the project
    2. create room option
    3. join room option
3. **Room:** A temporary virtual room for message shearing, people can join the room to start communicating with each other and once the chatting is done room gets terminated
4. people can join the room via link or system credentials
5. room must consists of:
    1. A chat interface
    2. A link to invite other for joining the room
    3. A button to terminate the room to end the communication







### **Specification:**

1. must not need any personal info or login/signUp to start communication 
2. must follow E2E encryption standard for message transfer 
3. room creation credentials must be taken form the user to create an illusion like we can create same room twice
4. once the room is terminated all the data related to the communication must get deleted to maintain privacy
5. room termination system must be automated in case user forget to terminate it manually
6. room get terminated once the user close the tab



### Workflow
![workflow image](./Frontend/Untitled%20Diagram.drawio.png)



### **Tech Stack:**

* **Next.JS : frontend and backend**
* **Socket.IO : websocket connection**
* **redis : message Broker** 











