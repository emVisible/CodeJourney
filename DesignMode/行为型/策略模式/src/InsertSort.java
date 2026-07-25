import java.util.Arrays;

public class InsertSort implements Sort {

  @Override
  public int[] sort(int[] arr) {
    System.out.println("Insert Sort");
    int[] res = Arrays.copyOf(arr, arr.length);
    for (int i = 0; i < res.length; i++) {
      for (int j = i; j > 0; j--) {
        if (res[j - 1] > res[j]) {
          int tmp = res[j];
          res[j] = res[j - 1];
          res[j - 1] = tmp;
        }
      }
    }
    return res;
  }

}
