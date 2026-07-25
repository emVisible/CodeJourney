public class ArrayHandler {
  private Sort sortObj;

  public void setSort(Sort sortMethod) {
    this.sortObj = sortMethod;
  }

  public int[] sort(int[] arr) {
    return sortObj.sort(arr);
  }
}