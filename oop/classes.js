// this is just syntatcial suagar on top of the Constructor function
// class is a function >>> it typeof function when u check
class CreateUser {
  constructor(firstname, lastname, age) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }
  getBirthYear() {
    return new Date().getFullYear() - this.age;
  }
  getFullName() {
    return this.firstname + "  " + this.lastname;
  }
}
const user1 = new CreateUser("Ankit", "singh", 55);
