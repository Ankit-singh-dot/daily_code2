const user = {
  first_name: "Ankit_singh",
  age: 24,
  get_age_year: function () {
    return new Date().getFullYear() - user.age;
  },
};
console.log(user.get_age_year())
// this is not the proper way to hide data this is not full encapsulation this means hiding the logic of the code not showing the complexity of the code 

