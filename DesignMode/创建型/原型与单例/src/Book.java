public class Book extends sShape{
    public String id;
    public String name;
    public String author;
    public String price;
    public Book(){}
    public Book(Book source){
        super(source);
        this.id = source.id;
        this.name = source.name;
        this.author = source.author;
        this.price = source.price;
    }
    @Override
    public sShape cloneBook() {
        return new Book(this);
    }
    public void getMsg(){
        System.out.println(
                "图书第" + this.id + "号: \n" +
                        "\t 书名: " + this.name + "\n" +
                        "\t 作者: " + this.author + "\n" +
                        "\t 价格: " + this.price + "\n"
        );
    }
}
