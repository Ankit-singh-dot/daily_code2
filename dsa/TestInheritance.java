class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
}
class Student extends Person {
    int roll;
    Student(String name, int roll) {
        super(name); 
    this.roll = roll; }
    void display() {
       System.out.println("Name: " + super.name + ", Roll: " + roll);
    }
}
public class TestInheritance {
    public static void main(String[] args) {
     Student s = new Student("Ankit", 101);
  s.display();
    }
}