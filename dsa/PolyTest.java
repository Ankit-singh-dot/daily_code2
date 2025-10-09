class SumDemo {
    int sum(int a, int b) { return a+b; }
    double sum(double a, double b) { return a+b; }
    int sum(int a, int b, int c) { return a+b+c; }
}
public class PolyTest { public static void main(String[] args) {
SumDemo obj = new SumDemo();
System.out.println(obj.sum(10, 20));
System.out.println(obj.sum(5.5, 6.6));
System.out.println(obj.sum(1,2,3));
}
}