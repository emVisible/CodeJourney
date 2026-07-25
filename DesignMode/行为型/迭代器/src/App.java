public class App {
    public static void main(String[] args) throws Exception {
      
      Television skyworthTV = new SkyworthTelevision();
      Client.display(skyworthTV);

      Television tclTV = new TCLTelevision();
      Client.display(tclTV);
    }
}
