// function getUserAge() {
//   return new Date().getFullYear() - this.age;
// }
// function createUser(first_name, last_name, age) {
//   const user = {
//     first_name,
//     last_name,
//     age,
//     getUserAge: createUser.commonMethods.getUserAge,
//   };
//   //   console.log(user.getUserAge);
//   return user;
// }
// createUser.commonMethods = {
//   getUserAge() {
//     return new Date().getFullYear() - this.age;
//   },
// };
// const user1 = createUser("Ankit", "singh", 23);
// console.log(user1.getUserAge());

//  jbb new use krte hai tbb new keyword by-default object return krta hai no matter what this is

function CreateUser(first_name, last_name, age) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.age = age;
}
CreateUser.prototype.getAgeYear = function () {
  return new Date().getFullYear() - this.age;
};
const user1 = new CreateUser("Ankit", "singh", 24);
