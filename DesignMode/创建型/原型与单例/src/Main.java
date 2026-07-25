import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 初始化并测试
        Library lib = initTest();
        // 进入客户端模式
        clientEventLoop(lib);
    }
    public static Library initTest(){
        // 获取Lib实例
        Library lib = Library.getInstance();
        Library lib2 = Library.getInstance();
        System.out.println(lib.equals(lib2));
        try {
            // 创建原型书1和克隆书1，将其加入lib中，显示打印输出，最后删除index为1的书
            System.out.println("=======================================TEST START========================================");
            Book book1 = new Book();
            book1.id = "1";
            book1.name = "DesignMode";
            book1.price = "32";
            book1.author = "Tomas";

            Book cloneBook1 = (Book) book1.cloneBook();

            lib.addBook(book1);
            lib.addBook(cloneBook1);
            lib.output();
            lib.deleteBook("1");

            // 创建另一本书和其副本，添加到lib中并打印
            Book book2 = new Book();
            book2.id = "2";
            book2.name = "Java";
            book2.price = "64";
            book2.author = "James";
            Book cloneBook2 = (Book) book2.cloneBook();
            lib.addBook(cloneBook2);
            lib.output();
            System.out.println("=======================================TEST OVER========================================");
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return lib;
    }
    private static void clientEventLoop(Library lib){
        // 客户端
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n\n\n*******************欢迎来到Lib——使用单例和原型实现*******************");
        while(true) {
            System.out.println("▬▬▬▬▬▬ add 添加, del删除, output输出, exit退出▬▬▬▬▬▬\n");
            if (scanner.hasNext()){
                String ipt = scanner.next();
                switch (ipt) {
                    case "add" -> {
                        Book book = new Book();
                        System.out.println("书名: ");
                        book.name = scanner.next();
                        System.out.println("书ID: ");
                        book.id = scanner.next();
                        System.out.println("作者: ");
                        book.author = scanner.next();
                        System.out.println("价格: ");
                        book.price = scanner.next();
                        lib.addBook(book);
                    }
                    case "del" -> {
                        System.out.println("请输入Book id");
                        lib.deleteBook(scanner.next());
                    }
                    case "output" -> lib.output();
                    case "exit" -> {
                        System.out.println("Bye");
                        return;
                    }
                }
            }

        }
    }
}