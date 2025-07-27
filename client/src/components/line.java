import java.util.*;
public class line {
  public static void main(String a[]){
    String st="happenings";
    int count=1;
    List<Integer> c=new ArrayList<>();
    for(int i=0;i<st.length();i++){
      for(int j=i+1;j<st.length();j++){
        if(st.charAt(i)==st.charAt(i+1)){
             count++;
             

        }count=0;
        c.add(count);
        
      }
    }
  }
}