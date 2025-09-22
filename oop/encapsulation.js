// const user = {
//   first_name: "Ankit_singh",
//   age: 24,
//   get_age_year: function () {
//     return new Date().getFullYear() - user.age;
//   },
// };
// console.log(user.get_age_year());
// this is not the proper way to hide data this is not full encapsulation this means hiding the logic of the code not showing the complexity of the code
function createUser(first_name, last_name, age) {
  const user = {
    first_name,
    last_name,
    age,
    get_age_year() {
      return new Date().getFullYear() - user.age;
    },
  };
  // console.log(user.get_age_year());
  return user;
}
const user1 = createUser("ankit", "singh", "23");
console.log(user1.get_age_year());
