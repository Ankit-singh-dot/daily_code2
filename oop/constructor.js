function createUser(firstName, lastName, Age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.Age = Age;
}
const user = new createUser("Ankit", "singh", 28);
const user2 = new createUser("sahil", "singh", 24);
