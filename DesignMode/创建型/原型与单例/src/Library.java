import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

// 内部静态类单例
public class Library {
    public List<Book> books = new ArrayList<Book>();
    public String libraryName;
    private static class Holder{
        private static final Library instance = new Library("ZISU Library");
    }
    private Library(String libName){
        this.libraryName = libName;
    }
    public static Library getInstance(){
        return Holder.instance;
    }
    public void addBook(Book book){
        books.add(book);
        System.out.println("============添加成功==============");
    }
    public void deleteBook(String index){
        this.books = books.stream().filter(book-> !Objects.equals(book.id, index)).collect(Collectors.toList());
        System.out.println("============删除成功=============");
    }
    public void output(){
        for (Book book:books) {
            book.getMsg();
        }
    }
}
